import React from "react"
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import { SmoothScrolling } from '@/components/smooth-scrolling'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'H Vitamin Drip — Premium IV Therapy in Nigeria',
  description: 'Nurse-led IV vitamin drip therapy, vitamin injections, and holistic wellness treatments delivered to your home or office across Lagos, Abuja, and Port Harcourt.',
  generator: 'next',
  keywords: ['IV drip Nigeria', 'vitamin drip Lagos', 'IV therapy Abuja', 'wellness Nigeria', 'Myers cocktail', 'glutathione drip', 'vitamin C IV', 'home IV therapy'],
}

export const viewport: Viewport = {
  themeColor: '#BFF74C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <SmoothScrolling>
          <CartProvider>
            {children}
          </CartProvider>
        </SmoothScrolling>
        <Analytics />
      </body>
    </html>
  )
}
