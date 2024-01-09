import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from "../components/nav"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flint Labs Assignment',
  description: 'Get your wallet balances at one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
        <NavBar />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
