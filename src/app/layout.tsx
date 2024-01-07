import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3ModalProvider } from "../context/Web3Modal"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Doldrums Protocol',
  description: 'Doldrums is a protocol for issuing a Delta-Neutral Stablecoin.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
        <Analytics />
      </body>
    </html>
  )
}
