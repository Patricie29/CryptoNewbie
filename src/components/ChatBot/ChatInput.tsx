'use client'

import { MessageContext } from '@/context/messages'
import { cn } from '@/libraries/utilities'
import { Message } from '@/libraries/validator/message'
import { useMutation } from '@tanstack/react-query'
import { CornerDownLeft, Loader2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import { FC, HTMLAttributes, useContext, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'


interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {
}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {

    const [input, setInput] = useState<string>('')

    const { messages, setIsMessageUpdating, addMessage, removeMessage, updateMessage } = useContext(MessageContext)

    // creating ref for textarea, so after submitting we can automatically put the focus back on the input and user can keep writing without having to click on the input
    const textareaRef = useRef<null | HTMLTextAreaElement>(null)

    // what is being handled for us is - loading states, error states etc
    const { mutate: sendMessage, isLoading } = useMutation({
        mutationFn: async (message: Message) => {

            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [message] })
            })

            // this line runs if there is error and it will redirect us down where we handle the error
            if (!response.ok) {
                throw new Error
            }

            return response.body
        },
        // wwe want to put the messages into a state
        onMutate(message) {
            addMessage(message)
        },


        // now I have to get a readable stream from the server
        onSuccess: async (stream) => {
            if (!stream) {
                throw new Error('No stream found')
            }

            //now I need to construct the bot message
            const id = nanoid()

            const responseBotMessage: Message = {
                id: id,
                isUserMessage: false,
                text: ''
            }

            //now I need to add the message to our response state
            addMessage(responseBotMessage)
            setIsMessageUpdating(true)  // to display the loading state


            // now lets decode the stream 
            const reader = stream.getReader()
            const decoder = new TextDecoder()

            let done = false

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)  // now I decoded the text into regular string and we can display it to the user

                //now I want to update the message with the id we just created
                updateMessage(id, (prev) => prev + chunkValue)  // this puts all the chunks of messages we got back (usually by each word) and it puts them in one answer
            }

            // clean up
            setIsMessageUpdating(false)
            setInput('')

            //now you can refocus to the text area so the user can write a message again without having to click
            setTimeout(() => {
                textareaRef.current?.focus()
            }, 10)
        },

        // if error
        onError(_, message) {
            toast.error('Something went wrong, please try again.')
            removeMessage(message.id)
            textareaRef.current?.focus()
        },
    })


    return <div {...props} className={cn('border-t border-zinc-300', className)}>
        <div className='relative mt-4 overflow-hidden rounded-lg border-none outline-none flex-1'>
            <TextareaAutosize
                ref={textareaRef}
                rows={2}
                maxRows={4}
                disabled={isLoading}
                autoFocus
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault()
                        const message: Message = {
                            id: nanoid(),
                            isUserMessage: true,
                            text: input
                        }
                        sendMessage(message)
                    }
                }}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder='Write a message...'
                className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
            />

            <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
                <kbd className='inline-flex items-center rounded bg-white border border-gray-200 px-1 font-sans text-xs text-gray-400'>
                    {isLoading ? <Loader2 className='w-3 h-3 animate-spin' /> : <CornerDownLeft className='w-3 h-3' />}
                </kbd>
            </div>

            <div aria-hidden='true' className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600' />

        </div>
    </div>
}

export default ChatInput