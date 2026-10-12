import Image from 'next/image'
import Reveal from './Reveal'
import Lotus from './Lotus'

const features = [
  { l: ['Curated', 'Experiences'], p: 'M24 40c-9-3-14-11-12-20 6 1 11 7 12 20zM24 40c9-3 14-11 12-20-6 1-11 7-12 20zM24 40c-4-8-4-17 0-26 4 9 4 18 0 26zM10 42h28' },
  { l: ['Heritage', 'Stays'], p: 'M7 36h34M8 34L5 15l11 9 8-13 8 13 11-9-3 19z' },
  { l: ['Unhurried', 'Journeys'], p: 'M24 7a17 17 0 1 0 0 34 17 17 0 0 0 0-34zM31 17l-5 11-9 4 5-11z' },
  { l: ['Authentic', 'Connections'], p: 'M10 38C8 22 20 10 40 9c0 19-9 29-30 29zM10 38c7-11 14-18 24-24' },
  { l: ['16 Days', 'Immersive'], p: 'M11 10h26a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3zM8 19h32M16 6v8M32 6v8M16 26h.1M24 26h.1M32 26h.1M16 33h.1M24 33h.1M32 33h.1' },
]

export default function Flagship() {
  return (
    <section id="flagship" style={{ padding: '90px 0 0', background: 'linear-gradient(180deg,#f5e4d4 0,#fadfc3 100%)' }}>
      <div className="wrap fl">
        <Reveal variant="left" className="fl-img imgrev">
          <Image src="/images/south.jpg" alt="A traditional houseboat on the Kerala backwaters at sunset" width={1086} height={415} sizes="(max-width:1020px) 100vw, 640px" />
        </Reveal>
        <Reveal variant="right">
          <div className="eyebrow l">Journey in focus</div>
          <h2><span>Spirit <i>of</i></span><em>South India</em></h2>
          <div className="sep"><Lotus /></div>
          <p className="states">Karnataka<b>|</b>Tamil Nadu<b>|</b>Kerala</p>
          <p className="tag2">A Journey that Stays with You.</p>
          <a className="btn" href="#enquire">Enquire about this journey &rarr;</a>
        </Reveal>
      </div>
      <div className="feat">
        <div className="wrap">
          <Reveal className="g stg">
            {features.map((f) => (
              <div key={f.l.join(' ')}>
                <svg viewBox="0 0 48 48" aria-hidden="true"><path d={f.p} /></svg>
                <span>{f.l[0]}<br />{f.l[1]}</span>
              </div>
            ))}
          </Reveal>
          <div className="cl">
            <div className="sep"><Lotus color="#bf9a52" /></div>
            <p>Not just a destination, but a feeling.</p>
            <h3>BE PART OF THE JOURNEY.</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
