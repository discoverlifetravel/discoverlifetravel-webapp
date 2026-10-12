import Reveal from './Reveal'
import Mandala from './Mandala'
import Lotus from './Lotus'

const pillars = [
  { t: 'Heritage', d: 'Magnificent palaces, ancient temples and living history.', p: 'M8 40h32M12 40V26M36 40V26M10 26h28M24 8c-7 4-10 9-10 18M24 8c7 4 10 9 10 18M24 8v-3M20 40v-8a4 4 0 0 1 8 0v8' },
  { t: 'Culture', d: 'Authentic traditions, art and local life.', p: 'M24 40c-9-3-14-11-12-20 6 1 11 7 12 20zM24 40c9-3 14-11 12-20-6 1-11 7-12 20zM24 40c-4-8-4-17 0-26 4 9 4 18 0 26zM10 42h28' },
  { t: 'Food', d: 'Rich flavours and regional cuisine.', p: 'M6 22h36c0 11-7 18-18 18S6 33 6 22zM17 40h14M30 20c1-6 6-10 11-12M24 20c0-5 2-8 5-10' },
  { t: 'Nature', d: 'Breathtaking landscapes and serene getaways.', p: 'M10 38C8 22 20 10 40 9c0 19-9 29-30 29zM10 38c7-11 14-18 24-24' },
  { t: 'Private Journeys', d: 'Tailor-made itineraries designed around you.', p: 'M24 7a17 17 0 1 0 0 34 17 17 0 0 0 0-34zM31 17l-5 11-9 4 5-11z' },
]

export default function DeeperIndia() {
  return (
    <section id="why" style={{ paddingTop: 30 }}>
      <Mandala style={{ left: -190, top: -40 }} />
      <Reveal className="wrap ctr">
        <div className="orn"><Lotus /></div>
        <h2>A Deeper India</h2>
        <p className="sub">Meaningful experiences that go beyond sightseeing.</p>
        <Reveal className="pill stg">
          {pillars.map((x) => (
            <div key={x.t}>
              <svg viewBox="0 0 48 48" aria-hidden="true"><path d={x.p} /></svg>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </Reveal>
      </Reveal>
    </section>
  )
}
