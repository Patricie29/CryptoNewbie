import { z } from "zod";



export const MessageSchema = z.object({
    id: z.string(),
    isUserMessage: z.boolean(),
    text: z.string()
})


// array validator - because we will pass array of messages to the backend and it's gonna contain all the messages that were previously written

export const MessageArraySchema = z.array(MessageSchema)



// now we can easily generate a Typescript type from this array

export type Message = z.infer<typeof MessageSchema>
