import type { Metadata } from 'next'
import { stops } from './southIndia'
import { stops as desertStops } from './desert'
import type { Stop } from './southIndia'

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.discoverlifetravel.com'
export const TOUR_PATH = '/spirit-of-south-india'
const url = SITE + TOUR_PATH
const clean = (s: string) => s.replace(/:$/, '').trim()

const TITLE = 'Spirit of South India Tour – 16 Days | Discover Life Travel'
const DESC =
  'A 16-day small-group journey through Karnataka, Tamil Nadu and Kerala: Mysore Palace, a Nilgiri jeep safari, Ooty, Kodaikanal, Madurai, Munnar and an overnight Kerala backwaters boat stay. Maximum 8 guests.'

type SeoArgs = { path: string; name: string; title: string; desc: string; image: string; w: number; h: number; alt: string; aud: string; usd: string; stops: Stop[] }

function build(a: SeoArgs) {
  const u = SITE + a.path
  const metadata: Metadata = {
    title: a.title,
    description: a.desc,
    alternates: { canonical: a.path },
    openGraph: { type: 'website', url: u, siteName: 'Discover Life Travel', locale: 'en_AU', title: a.title, description: a.desc, images: [{ url: a.image, width: a.w, height: a.h, alt: a.alt }] },
    twitter: { card: 'summary_large_image', title: a.title, description: a.desc, images: [a.image] },
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': u + '#page', url: u, name: a.title, description: a.desc, inLanguage: 'en-AU', isPartOf: { '@type': 'WebSite', url: SITE, name: 'Discover Life Travel' }, primaryImageOfPage: { '@type': 'ImageObject', url: SITE + a.image } },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: 'Tours', item: SITE + '/#tours' },
          { '@type': 'ListItem', position: 3, name: a.name, item: u },
        ],
      },
      {
        '@type': 'TouristTrip',
        '@id': u + '#trip',
        name: a.name,
        description: a.desc,
        url: u,
        image: SITE + a.image,
        touristType: 'Travellers aged 50+',
        provider: { '@type': 'TravelAgency', name: 'Discover Life Travel', telephone: '+61409905612', url: SITE },
        offers: [
          { '@type': 'Offer', price: a.aud, priceCurrency: 'AUD', url: u, availability: 'https://schema.org/LimitedAvailability' },
          { '@type': 'Offer', price: a.usd, priceCurrency: 'USD', url: u, availability: 'https://schema.org/LimitedAvailability' },
        ],
        itinerary: {
          '@type': 'ItemList',
          numberOfItems: a.stops.length,
          itemListElement: a.stops.map((s, i) => ({
            '@type': 'ListItem', position: i + 1,
            item: { '@type': 'TouristDestination', name: clean(s.name), description: s.text },
          })),
        },
      },
    ],
  }
  return { metadata, jsonLd }
}

const south = build({
  path: TOUR_PATH, name: 'Spirit of South India Tour', title: TITLE, desc: DESC, image: '/images/hero.jpg', w: 1824, h: 747,
  alt: 'A traveller relaxing on a Kerala backwaters houseboat', aud: '13895', usd: '9356', stops,
})
export const tourMetadata: Metadata = south.metadata
export const tourJsonLd = south.jsonLd

export const DESERT_PATH = '/desert-odyssey-rajasthan'
const desert = build({
  path: DESERT_PATH, name: 'Desert Odyssey Tour Rajasthan India',
  title: 'Desert Odyssey Tour Rajasthan India – 16 Days | Discover Life Travel',
  desc: 'A 16-day small-group journey through Rajasthan: Delhi, a Bikaner camel safari, Jodhpur, Udaipur, Pushkar and Jaipur, with an optional Agra and Taj Mahal extension. Maximum 8 guests.',
  image: '/images/rajasthan.jpg', w: 510, h: 244, alt: 'Camel safari in Rajasthan', aud: '13900', usd: '9038', stops: desertStops,
})
export const desertMetadata: Metadata = desert.metadata
export const desertJsonLd = desert.jsonLd
