import Reveal from './Reveal'

const faqs = [
  ['What does a private journey include?', 'Accommodation, private transfers, expert local guides, curated experiences and personal support throughout. Your proposal lists exactly what is included.'],
  ['How many travellers are on a journey?', 'Small groups of up to 8 travellers, or entirely private for your own party.'],
  ['Can the itinerary be tailored?', 'Always. Dates, pace, stays and experiences are shaped around your interests.'],
  ['When is the best time to travel?', 'October to March is the most comfortable for most regions. We will advise on the best timing for your chosen journey.'],
  ['How do I reserve?', 'Begin with a conversation with Catherine. A modest deposit secures your dates, with the balance due before departure.'],
]

export default function Faq() {
  return (
    <section id="faq" style={{ background: 'var(--soft)' }}>
      <div className="wrap" style={{ maxWidth: 840 }}>
        <Reveal className="ctr" style={{ marginBottom: 30 }}><h2>Good to Know</h2></Reveal>
        {faqs.map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  )
}
