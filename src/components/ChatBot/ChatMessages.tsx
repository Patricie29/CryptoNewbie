'use client'

import { MessageContext } from '@/context/messages'
import { cn } from '@/libraries/utilities'
import { FC, HTMLAttributes, useContext } from 'react'
import MarkdownLite from './MarkdownLite'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {
}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const { messages } = useContext(MessageContext)

    // now you need to reverse them, so the newest one is at the bottom - you need to use flex-col-reverse class as well and thanks to that we will be at the bottom of the chat by default as well
    const reversedMessages = [...messages].reverse()

    return <div {...props} className={cn('flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch', className)}>

        {/* this is just for when there is just one message, it shows at the top */}
        <div className='flex-1 flex-grow' />

        {reversedMessages.map((oneMsg) => (
            <div key={oneMsg.id} className='chat-message'>
                <div className={cn('flex items-end', {
                    'justify-end': oneMsg.isUserMessage
                })}>
                    <div className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                        'order-1 items-end': oneMsg.isUserMessage,
                        'order-2 items-start': !oneMsg.isUserMessage
                    })}>
                        <p className={cn('px-4 py-2 rounded-lg', {
                            'bg-blue-600 text-white': oneMsg.isUserMessage,
                            'bg-gray-200 text-gray-900': !oneMsg.isUserMessage
                        })}>
                            <MarkdownLite text={oneMsg.text} />
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </div >
}

export default ChatMessages