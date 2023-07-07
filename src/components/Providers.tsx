'use client'

import { CoinmarketProvider } from '@/context/cryptoCtx'
import { MessagesProvider } from '@/context/messages'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import Moralis from "moralis";
import React, { FC, ReactNode } from 'react'
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    darkTheme
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, bsc, bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        polygon,
        optimism,
        bsc,
        bscTestnet,
        arbitrum,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ],
    [publicProvider()]
);

const projectId = 'CryptoNewbie';

const { wallets } = getDefaultWallets({
    appName: 'CryptoNewbie',
    projectId,
    chains,
});

const demoAppInfo = {
    appName: 'CryptoNewbie',
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});


Moralis.start({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient()
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);


    return <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} appInfo={demoAppInfo} theme={darkTheme({
                accentColor: 'transparent',
                accentColorForeground: 'white',
                fontStack: 'system'
            })}>
                <CoinmarketProvider>
                    <MessagesProvider>

                        {mounted && children}

                    </MessagesProvider>
                </CoinmarketProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    </QueryClientProvider>
}

export default Providers