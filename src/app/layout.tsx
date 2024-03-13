import './globals.css'
import Providers from '@/components/Providers'
import Chat from '@/components/ChatBot/Chat'
import NavBar from '@/components/Layout/NavBar'
import Footer from '@/components/Layout/Footer'

import '@rainbow-me/rainbowkit/styles.css';
import { Analytics } from '@vercel/analytics/react';


export const metadata = {
  title: 'CryptoNewbie',
  description: 'Your go-to crypto website for beginners.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">

      <body className='bg-dark-background'>
        <Providers>

          <NavBar />
          <Chat />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>

    </html >
  )
}
