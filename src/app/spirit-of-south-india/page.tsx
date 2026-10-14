import type { Metadata } from 'next'
import Header from '@/components/Header'
import SouthIndiaTour from '@/components/SouthIndiaTour'
import Enquiry from '@/components/Enquiry'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import TourLegal from '@/components/tour/TourLegal'
import ScrollEffects from '@/components/ScrollEffects'
import { tourMetadata, tourJsonLd } from '@/data/tourSeo'
import './tour.css'

export const metadata: Metadata = tourMetadata

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }} />
      <ScrollEffects />
      <Header />
      <main id="top" className="tour-page topc">
        <SouthIndiaTour />
        <Enquiry defaultInterest="Spirit of South India" />
        <TourLegal />
      </main>
      <Footer />
      <StickyBar />
    </>
  )
}
