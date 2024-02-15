import React, { ReactNode, createContext, useRef, useState } from "react"
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";

type StreamResponse = {
  addMessage():void,
  message:string,
  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>):void,
  isLoading:boolean
};

interface Props{
  fileId: string,
  children: ReactNode
}

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => { },
  message: "",
  handleInputChange: () => { },
  isLoading: false
})

export const ChatContextProvider = ({fileId, children}:Props) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const utils = trpc.useUtils();

  const backupMessage = useRef("");

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({message}:{message:string}) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message
        })
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }
      
      return response.body;
    },
    onMutate: async({message}) => {
      //the purpose of onMutate is to update the user input to UI and return context to onError in case of error || revert the UI to its previous state in case of an error
      backupMessage.current = message;
      setMessage("");

      // step 1 -> to prevent race conditions
      await utils.getFileMessages.cancel();

      // step 2 -> get a snapshot
      const previousMessages = utils.getFileMessages.getInfiniteData();

      // step 3
      utils.getFileMessages.setInfiniteData(
        {
          fileId,
          limit: INFINITE_QUERY_LIMIT,
        },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }

          let newPages = [...old.pages]; //array of objects

          // console.log(typeof newPages)

          let latestPage = newPages[0]!; //first element of array of objects -> contains first 10 messages [query limit]

          latestPage.messages = [
            //make the newest message appear at the beginning of the array
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ]; //move up all the existing previous messages and insert latest user message there

          newPages[0] = latestPage;

          return { //purpose -> update the cache within React Query after performing an optimistic update
            ...old,
            pages: newPages, //now, newPages[0] contains the latest user input
          };
        }
      );
      // step 3 ends here

      setIsLoading(true);

      return {
        previousMessages:
          previousMessages?.pages.flatMap((page) => page.messages) ?? [],
      };
    },
    onSuccess: async(stream) => {
      setIsLoading(false);

      if (!stream) {
        return toast({
          title: "There was a problem sending this message",
          description: "Please refresh this page and try again",
          variant: "destructive",
        });
      }
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedResponse = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        accumulatedResponse += chunkValue; 

        // append the chunk to the actual message

        utils.getFileMessages.setInfiniteData(
          { fileId, limit: INFINITE_QUERY_LIMIT },
          (old) => {
            if (!old) {
              return {
                pages: [],
                pageParams: [],
              };
            }
            let isAiResponseCreated = old.pages.some((page) =>
              page.messages.some((message) => message.id === "ai-response")
            ); // check if there is at least one message with the id of "ai-response"

            let updatedPages = old.pages.map((page) => {
              if (page === old.pages[0]) {
                let updatedMessages;

                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: new Date().toISOString(),
                      id: "ai-response",
                      text: accumulatedResponse,
                      isUserMessage: false,
                    },
                    ...page.messages,
                  ];
                } else {
                  updatedMessages = page.messages.map((message) => {
                    if (message.id === "ai-response") {
                      return {
                        ...message,
                        text: accumulatedResponse,
                      };
                    }
                    return message; //user message
                  });
                }

                return {
                  ...page,
                  messages: updatedMessages,
                };
              }

              return page;
            });

            return {
              ...old,
              pages: updatedPages,
            };
          }
        )
      }
    },
    onError: (_, __, context) => {
      setMessage(backupMessage.current);
      utils.getFileMessages.setData(
        { fileId },
        {messages: context?.previousMessages ?? []}
      )
    },
    onSettled: async() => {
      setIsLoading(false);

      await utils.getFileMessages.invalidate({
        fileId
      });
    }
  }); 

  const addMessage = () => sendMessage({ message })

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  };

  return (
    <ChatContext.Provider value={{
      addMessage,
      message,
      handleInputChange,
      isLoading
    }}>
      {children}
    </ChatContext.Provider>
  )
}