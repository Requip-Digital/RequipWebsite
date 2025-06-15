import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const ethnocentric = localFont({
  src: '../public/fonts/ethnocentric.otf',
  variable: '--font-ethnocentric',
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
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
