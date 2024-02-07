import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";
import prisma from '@/db'
import { OpenAIEmbeddings } from "@langchain/openai";
import { pinecone } from '@/lib/pinecone'
import { PineconeStore } from "@langchain/pinecone";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from 'ai'


export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userId = user?.id;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { fileId, message } = SendMessageValidator.parse(body);

  const file = await prisma.file.findFirst({
    where: {
      id: fileId,
      userId
    }
  })

  if (!file) return new Response("Not found", { status: 404 });

  await prisma.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId
    }
  })

  // vectorise message
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  })

  const pineconeIndex = pinecone.Index("quill");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    namespace: file.id,
    pineconeIndex
  })

  const results = await vectorStore.similaritySearch(message, 4)

  const previousMessages = await prisma.message.findMany({
    where: {
      fileId
    },
    orderBy: {
      createdAt: "asc"
    },
    take: 6
  })

  const formattedMessages = previousMessages.map(previousMessage => ({
    role: previousMessage.isUserMessage ? "user" as const : "assistant" as const,
    content: previousMessage.text
  }))

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
      },
      {
        role: 'user',
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
        
        \n----------------\n
        
        PREVIOUS CONVERSATION:
        ${formattedMessages.map((message) => {
                if (message.role === 'user') return `User: ${message.content}\n`
                return `Assistant: ${message.content}\n`
              })}
        
        \n----------------\n
        
        CONTEXT:
        ${results.map((r) => r.pageContent).join('\n\n')}
        
        USER INPUT: ${message}`,
      },
    ],
  })

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await prisma.message.create({
        data: {
          text: completion,
          isUserMessage: false,
          fileId,
          userId
        },
      })
    }
  })

  return new StreamingTextResponse(stream);
}