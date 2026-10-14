import type { Metadata } from 'next'
import Header from '@/components/Header'
import DesertOdysseyTour from '@/components/DesertOdysseyTour'
import Enquiry from '@/components/Enquiry'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import TourLegal from '@/components/tour/TourLegal'
import ScrollEffects from '@/components/ScrollEffects'
import { desertMetadata, desertJsonLd } from '@/data/tourSeo'
import '../spirit-of-south-india/tour.css'

export const metadata: Metadata = desertMetadata

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(desertJsonLd) }} />
      <ScrollEffects />
      <Header />
      <main id="top" className="tour-page topc">
        <DesertOdysseyTour />
        <Enquiry defaultInterest="Desert Odyssey Rajasthan" />
        <TourLegal />
      </main>
      <Footer />
      <StickyBar />
    </>
  )
}
