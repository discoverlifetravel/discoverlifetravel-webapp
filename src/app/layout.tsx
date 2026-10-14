import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Bodoni_Moda, Cormorant_Garamond, Cormorant_SC, Cinzel, Montserrat } from 'next/font/google'
import './globals.css'

const bod = Bodoni_Moda({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--font-bod', display: 'swap' })
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' })
const sc = Cormorant_SC({ subsets: ['latin'], weight: ['500'], variable: '--font-sc', display: 'swap' })
const disp = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-disp', display: 'swap' })
const sans = Montserrat({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-sans', display: 'swap' })

const title = 'Discover Life Travel | India, beyond the itinerary'
const description =
  'Founder-led, privately curated journeys through India by an Australian tour company. Small groups of up to 8, handpicked stays, local expertise and personalised planning.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.discoverlifetravel.com'),
  title,
  description,
  openGraph: { title, description, type: 'website', images: ['/images/hero.jpg'] },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#fbf1d6' }

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Discover Life Travel',
  description: 'Founder-led journeys through India',
  founder: { '@type': 'Person', name: 'Catherine Frith' },
  areaServed: 'AU',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU" className={`${bod.variable} ${serif.variable} ${sc.variable} ${disp.variable} ${sans.variable}`} data-theme="gold" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
