import Reveal from './Reveal'
import Lotus from './Lotus'

// Sample testimonials: replace with real ones before launch.
const quotes = [
  { q: 'Every detail had been thought of before we even asked. It felt like travelling with a friend who knew everyone.', by: 'Margaret, Perth' },
  { q: 'A private evening at the fort, music and dinner just for us. I still think about it.', by: 'Lyn & Sue, Adelaide' },
  { q: 'Unhurried, beautiful and completely seamless. India as I always hoped it could be.', by: 'Denise, Brisbane' },
]

export default function Testimonials() {
  return (
    <section id="stories">
      <div className="wrap">
        <Reveal className="ctr">
          <div className="orn"><Lotus /></div>
          <h2>In Our Guests&apos; Words</h2>
          <p className="sub">Journeys that stay with you.</p>
        </Reveal>
        <Reveal className="tq stg">
          {quotes.map((x) => (
            <div key={x.by}>
              <span className="qm">&ldquo;</span>
              <p>{x.q}</p>
              <cite>{x.by}</cite>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
