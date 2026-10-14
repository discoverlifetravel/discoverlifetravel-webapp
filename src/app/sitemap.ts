import type { MetadataRoute } from 'next'
import { SITE, TOUR_PATH, DESERT_PATH } from '@/data/tourSeo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE + '/', changeFrequency: 'weekly', priority: 1 },
    { url: SITE + TOUR_PATH, changeFrequency: 'weekly', priority: 0.9 },
    { url: SITE + DESERT_PATH, changeFrequency: 'weekly', priority: 0.9 },
  ]
}
