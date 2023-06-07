import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import Chat from '@/components/ChatBot/Chat'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CryptoNewbie ',
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
      <Providers>
        <body className={`${inter.className} bg-light-background dark:bg-dark-background`}>
          {/* <!--Nav--> */}
          <NavBar />
          <Chat />
          {children}

          <Footer />
        </body>
      </Providers>
    </html >
  )
}
