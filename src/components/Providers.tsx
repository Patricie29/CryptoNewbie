'use client'

import { CoinmarketProvider } from '@/context/cryptoCtx'
import { MessagesProvider } from '@/context/messages'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { FC, ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient()

    return <QueryClientProvider client={queryClient}>

        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <CoinmarketProvider>
                <MessagesProvider>

                    {children}

                </MessagesProvider>
            </CoinmarketProvider>
        </ThemeProvider>

    </QueryClientProvider>
}

export default Providers