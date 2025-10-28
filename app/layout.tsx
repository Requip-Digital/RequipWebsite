import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Raleway } from 'next/font/google';
import Script from 'next/script'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
});

const ethnocentric = localFont({
  src: '../public/fonts/ethnocentric.otf',
  variable: '--font-ethnocentric',
})

export const metadata: Metadata = {
  title: 'Welcome to Requip',
  description: 'Your One-Stop Solution for Quality Used Industrial Machines',
  icons: {
    icon: '/favicon.ico',      
    shortcut: '/favicon.ico',  
    apple: '/favicon.ico',     
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ethnocentric.variable} ${raleway.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N3559MLS');`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tx3op93hpn");
            `
          }}
        />
        {/* End Microsoft Clarity */}
      </head>
      <body className="font-raleway">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-N3559MLS"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
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