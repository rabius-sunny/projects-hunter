import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'

import Provider from '~/configs/Provider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Projects Hunter',
  description: 'Projects and Tasks management web application.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
