import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';

const ethnocentric = localFont({
  src: '../public/fonts/ethnocentric.otf',
  variable: '--font-ethnocentric',
})

export const metadata: Metadata = {
  title: 'Welcome to Requip',
  description: 'Your One-Stop Solution for Quality Used Industrial Machines',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={ethnocentric.variable}>
        {children}
        <Toaster 
          position="top-center"
          expand={true}
          richColors
          closeButton
          className="fixed z-[9999] max-w-[90vw] sm:max-w-[420px]"
          toastOptions={{
            style: {
              background: 'white',
              color: 'black',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
          }}
        />
        <Analytics />

      </body>
    </html>
  )
}
