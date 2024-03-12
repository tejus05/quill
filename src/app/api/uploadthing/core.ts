import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import prisma from '@/db'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { pinecone } from '@/lib/pinecone'
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";


const f = createUploadthing();

const middleware = async () => {
  const { getUser } = getKindeServerSession();
  // This code runs on your server before upload
  const user = await getUser();


  if (!user || !user.id) throw new UploadThingError("Unauthorized");

  const subscriptionPlan = await getUserSubscriptionPlan();

  return { userId: user.id, subscriptionPlan };
}

const onUploadComplete = async ({ metadata, file }: {
  metadata: Awaited<ReturnType<typeof middleware>>, file: {
    key: string,
    name: string,
    url: string,
}}) => {

  const isFileExists = await prisma.file.findFirst({
    where: {
      key: file.key
    }
  })

  if (isFileExists) {
    return;
  }
  
  const createdFile = await prisma.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: file.url,
      uploadStatus: "PROCESSING"
    }
  })

  try {
    const response = await fetch(file.url);
    const blob = await response.blob();

    const loader = new PDFLoader(blob);

    const docs = await loader.load();

    const pagesAmount = docs.length;

    const { subscriptionPlan } = metadata;

    const { isSubscribed } = subscriptionPlan;

    const isProExceeded = pagesAmount > PLANS.find(plan => plan.name === "Pro")!.pagesPerPdf;
    const isFreeExceeded = pagesAmount > PLANS.find(plan => plan.name === "Free")!.pagesPerPdf;

    if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
      await prisma.file.update({
        data: {
          uploadStatus: "FAILED"
        },
        where: {
          id: createdFile.id
        }
      })
    }

    // vectorise and index entire document

    const pineconeIndex = pinecone.Index("quill");

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY
    })

    await PineconeStore.fromDocuments(
      docs,
      embeddings, {
      pineconeIndex,
      namespace: createdFile.id
    })

    await prisma.file.update({
      data: {
        uploadStatus: "SUCCESS"
      },
      where: {
        id: createdFile.id
      }
    })
  } catch (error) {
    await prisma.file.update({
      data: {
        uploadStatus: "FAILED"
      },
      where: {
        id: createdFile.id
      }
    })
  }
}

export const ourFileRouter = {
  
  freePlanUploader: f({ pdf: { maxFileSize: "4MB" } })
  .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: "16MB" } })
  .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;