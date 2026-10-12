import Reveal from './Reveal'
import JourneyGrid from './JourneyGrid'

const strip = [
  { t: 'Small Groups', d: 'Intimate groups of up to 8 travellers.', p: 'M24 11a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM11 17a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM37 17a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM14 38c0-7 4-11 10-11s10 4 10 11M4 37c0-5 3-8 7-8M44 37c0-5-3-8-7-8' },
  { t: 'Handpicked Stays', d: 'Heritage and five-star properties with character.', p: 'M5 36V13M5 28h38v8M43 36V25c0-4-3-6-7-6H20v9M12 18.500a3.500 3.500 0 1 0 0 7 3.500 3.500 0 0 0 0-7z' },
  { t: 'Local Expertise', d: 'Trusted guides and insider access.', p: 'M24 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 40c0-9 5-14 12-14s12 5 12 14M17 11c1-6 13-6 14 0' },
  { t: 'Personalised Planning', d: 'Journeys designed around your interests.', p: 'M24 41C8 29 6 19 12 14c5-4 10-1 12 3 2-4 7-7 12-3 6 5 4 15-12 27z' },
]

export default function Journeys() {
  return (
    <section id="tours">
      <div className="wrap">
        <Reveal className="ctr">
          <div className="eyebrow c">Featured journeys</div>
          <h2 style={{ marginTop: 12 }}>Extraordinary Journeys Across India</h2>
          <p className="sub">Carefully curated experiences with a deeper connection to India.</p>
        </Reveal>
        <JourneyGrid />
        <Reveal className="strip stg">
          {strip.map((s) => (
            <div key={s.t}>
              <svg viewBox="0 0 48 48" aria-hidden="true"><path d={s.p} /></svg>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
