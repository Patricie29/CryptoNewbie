
import { Message } from "@/libraries/validator/message";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";



export const MessageContext = createContext<{
    messages: Message[]
    isMessageUpdating: boolean
    addMessage: (message: Message) => void  //this is what we will use to push the messages from the open ai to the chat, along with user messages. It will take a message as an argument that will be of type Message and it will return nothing, hence void
    removeMessage: (id: string) => void //in case anything goes wrong we want to remove a message because we will update the ui optimistically, which means, we're gonna assume everything goes right and put the message once the user sends it right into state - but incase something goes wrong we can remove it
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void // while we are getting the data from open ai we're gonna update the message to show the data we are getting back
    setIsMessageUpdating: (isUpdating: boolean) => void
}>({
    // now we are declaring the default/fallback values - for example if we didnt provide any actual values into the context  what we are declaring below is what the context will fall back into
    messages: [],
    isMessageUpdating: false,
    addMessage: () => { },
    removeMessage: () => { },
    updateMessage: () => { },
    setIsMessageUpdating: () => { }
})


export const MessagesProvider = ({ children }: { children: ReactNode }) => {

    // so here you now have to set the values and the logic you want the function to do

    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)

    const [messages, setMessages] = useState<Message[]>([
        // this is what is gonna show up as the first message in the chat as default
        {
            id: nanoid(),
            text: 'Hello, how can I help you today?',
            isUserMessage: false  // cause it's a bot message
        }
    ])

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message])  //you just want to push the message into our state and add them to the previous ones, so we do not override them
    }

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((oneMsg) => oneMsg.id !== id))
    }

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        // updateFn is a callback function, and the reason we chose a callback to pass in the previous text, is because then we can actually push the answer that we get back from open AI into an existing string instead of having it seperated into seperate chunks (cause that is how you get the data back)
        setMessages((prev) => prev.map((oneMsg) => {
            if (oneMsg.id === id) {  //if the oneMsg is same as the one we get, then you wanna update this specific message text
                // the return value is what actually ends up in the final state - setMessages()
                return { ...oneMsg, text: updateFn(oneMsg.text) } //you want all the previous messages and just update a text on the one
            }
            //otherwise if  it's not the message we want to update you can return the message as it is
            return oneMsg
        }))

    }


    return <MessageContext.Provider value={{
        messages, addMessage, removeMessage, updateMessage, setIsMessageUpdating, isMessageUpdating
    }}>
        {children}
    </MessageContext.Provider>
}