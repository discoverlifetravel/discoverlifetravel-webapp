import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero" style={{ padding: 0 }}>
      <Image src="/images/hero.jpg" alt="A traveller relaxing on a Kerala backwaters houseboat" width={1824} height={747} priority sizes="100vw" />
      <div className="wrap">
        <div className="eyebrow l">An Australian tour company</div>
        <h1>
          <span>India. <i>Beyond</i></span>
          <span><em>the Itinerary.</em></span>
        </h1>
        <p className="tg">A Journey that Stays with You.</p>
        <a className="btn" href="#tours">Begin your journey &rarr;</a>
        <div className="proof">Founder-led &middot; Small groups &middot; Private journeys</div>
      </div>
    </section>
  )
}
