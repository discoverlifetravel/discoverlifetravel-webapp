import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Founder from '@/components/Founder'
import DeeperIndia from '@/components/DeeperIndia'
import Flagship from '@/components/Flagship'
import Journeys from '@/components/Journeys'
import Testimonials from '@/components/Testimonials'
import Band from '@/components/Band'
import Enquiry from '@/components/Enquiry'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import ScrollEffects from '@/components/ScrollEffects'

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <Header />
      <main id="top">
        <Hero />
        <Founder />
        <DeeperIndia />
        <Flagship />
        <Journeys />
        <Testimonials />
        <Band />
        <Enquiry />
        <Faq />
      </main>
      <Footer />
      <StickyBar />
    </>
  )
}
