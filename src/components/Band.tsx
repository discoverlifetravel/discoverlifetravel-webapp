import Reveal from './Reveal'
import Mandala from './Mandala'

export default function Band() {
  return (
    <section className="band">
      <Mandala style={{ left: -170, top: -80 }} />
      <Mandala style={{ right: -170, bottom: -110 }} />
      <Reveal className="wrap">
        <h2>Your India. Your Way.</h2>
        <p>Private journeys and intimate small-group travel, thoughtfully designed around you.</p>
        <a className="btn" href="#enquire">Talk with Catherine &rarr;</a>
      </Reveal>
    </section>
  )
}
