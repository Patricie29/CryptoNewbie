import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt"
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/libraries/openai-stream"
import { MessageArraySchema } from "@/libraries/validator/message"



export async function POST(req: Request) {

    // so first we need to know what message has the user typed
    const { messages } = await req.json()

    // now we need to validate whatever the user wrote via our schema
    const parsedMessages = MessageArraySchema.parse(messages)

    const readyToGoMessages: ChatGPTMessage[] = parsedMessages.map((oneMessage) => ({
        role: oneMessage.isUserMessage ? 'user' : 'system', //so either this is user message or it's coming from the system
        content: oneMessage.text

    }))

    readyToGoMessages.unshift({
        role: 'system',
        content: chatbotPrompt
    })

    // this is what we're gonna send to the open ai api
    //OpenAIStreamPayload is our typescript 'schema' that we wrote from this payload
    // here I set ChatGPT properties
    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo', //or you can use chat gpt 4 if you have access
        messages: readyToGoMessages,  //we are sending the already ready and unshifted messages
        temperature: 0.4,  // this is basically how creative you want the chat gpt be 
        top_p: 1,
        frequency_penalty: 0, // this is how often a certain word will occur
        presence_penalty: 0,
        max_tokens: 50, //this is how long the chatbot response can be (this would be roughly 150 words)
        stream: true,
        n: 1
    }

    //OpenAIStream is a function declared in openai-stream.ts
    const stream = await OpenAIStream(payload)

    return new Response(stream)

}
