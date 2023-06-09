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
      {/* since this is a server side component we have to create a client side component for the Provider-from react-query and with that we can wrap the body here and like that we will have access to that everywhere in the app */}
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
