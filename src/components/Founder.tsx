import Image from 'next/image'
import Reveal from './Reveal'
import Mandala from './Mandala'

export default function Founder() {
  return (
    <section id="founder">
      <Mandala style={{ right: -110, top: -30, width: 260 }} />
      <div className="wrap founder">
        <Reveal variant="left" className="imgrev">
          <figure className="pf" style={{ margin: 8 }}>
            <Image src="/images/founder.jpg" alt="Catherine Frith, founder of Discover Life Travel" width={900} height={1068} sizes="150px" />
          </figure>
        </Reveal>
        <Reveal variant="right">
          <div className="eyebrow l">Founder</div>
          <h2>Catherine Frith</h2>
          <p>For more than 30 years, Catherine has travelled beyond the obvious to discover the India that stays with you: its people, places, cultures and extraordinary hospitality.</p>
          <a className="lnk" href="#enquire">Talk with Catherine &rarr;</a>
        </Reveal>
      </div>
    </section>
  )
}
