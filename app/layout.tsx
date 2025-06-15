import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const ethnocentric = localFont({
  src: '../public/fonts/ethnocentric.otf',
  variable: '--font-ethnocentric',
})

export const metadata: Metadata = {
  title: 'Requip App',
  description: 'Created with next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={ethnocentric.variable}>{children}</body>
    </html>
  )
}
