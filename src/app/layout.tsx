import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  weight: ['100', '200', '300', '400'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: '📏 MyEdu',
  description: 'Pokročilý školní systém pro správu známek, absence a mnoho dalšího!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
