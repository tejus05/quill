import { createContext } from "react"

type StreamResponse = {
  addMessage():void,
  message:string,
  handleInputChange():void,
  isLoading:boolean
};

export const ChatContext = createContext({
  addMessage: () => { },
  message: "",
  handleInputChange: () => { },
  isLoading: false
})