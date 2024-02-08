import React, { ReactNode, createContext, useState } from "react"
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";

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
      
      return response.json();
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