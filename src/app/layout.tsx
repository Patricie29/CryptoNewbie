import './globals.css'
import Providers from '@/components/Providers'
import Chat from '@/components/ChatBot/Chat'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

import '@rainbow-me/rainbowkit/styles.css';


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
      <body className='bg-light-background dark:bg-dark-background dark'>
        <Providers>

          <NavBar />
          <Chat />
          {children}
          <Footer />

        </Providers>
      </body>

    </html >
  )
}
