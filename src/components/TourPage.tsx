import type { ReactNode } from 'react'
import Reveal from './Reveal'
import Lotus from './Lotus'
import Mandala from './Mandala'
import Art from './tour/Art'
import Booking from './tour/Booking'
import Marquee from './tour/Marquee'
import ScrollProgress from './tour/ScrollProgress'
import SpyNav from './tour/SpyNav'
import CopyCode from './tour/CopyCode'
import type { TourContent } from '@/data/tourTypes'
import type { Stop } from '@/data/southIndia'
import type { Scene } from './tour/Art'

/** Splits "Label: rest of the sentence" so the label can be styled. The wording itself is never changed. */
function Lead({ line }: { line: string }) {
  const i = line.indexOf(': ')
  if (i < 0 || i > 48) return <>{line}</>
  return <><b>{line.slice(0, i + 1)}</b> {line.slice(i + 2)}</>
}
const codeOf = (l: string) => l.match(/Code:\s*(\w+)/)?.[1]
const Tick = () => (<svg className="x-ck" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" /><path d="M7 12.5l3.2 3.2L17 8.8" /></svg>)
const after = (line: string) => line.slice(line.indexOf(': ') + 2)
const before = (line: string) => line.slice(0, line.indexOf(': '))

const Hd = ({ children }: { children: ReactNode }) => (
  <div className="b-hd"><h2>{children}</h2><div className="b-bar" /></div>
)
function Acc({ line, n, open }: { line: string; n: number; open?: boolean }) {
  const i = line.indexOf(': ')
  return (
    <details className="ac" open={open}>
      <summary><i>{String(n).padStart(2, '0')}</i><span>{line.slice(0, i + 1)}</span><em aria-hidden="true" /></summary>
      <div className="ac-b"><p>{line.slice(i + 2)}</p></div>
    </details>
  )
}

export type TourPageProps = {
  c: TourContent
  stops: Stop[]
  /** the banner image (photo or illustration), placed first inside the hero */
  hero: ReactNode
  /** the <h1> content; must read exactly as the tour title */
  h1: ReactNode
  /** route map card */
  map: ReactNode
  /** optional seasonal temperature block (only tours that have one) */
  climate?: ReactNode
  arts: { leader: { scene: Scene; label: string }; secrets: { scene: Scene; label: string }[] }
}

export default function TourPage({ c, stops, hero, h1, map, climate, arts }: TourPageProps) {
  const nav: [string, string][] = [
    ['overview', c.heading],
    ['itinerary', c.heading.split(': ')[1].split(' - ')[0]],
    ...(c.tempH ? ([['climate', c.tempH]] as [string, string][]) : []),
    ['included', c.incH],
    ['leaders', c.leadH],
    ['secrets', c.secH],
    ['dates', c.bookH],
    ['others', c.himH],
  ]
  return (
    <>
      <ScrollProgress />

      {/* HERO: image banner with buttons (approved) */}
      <section className="hero th" style={{ padding: 0 }}>
        {hero}
        <div className="wrap">
          <div className="eyebrow l">{c.brand}</div>
          <h1>{h1}</h1>
          <div className="th-sub"><p className="tg">{c.tagline}</p></div>
          <div className="th-cta">
            <a className="btn" href="#enquire">Book Now &rarr;</a>
            <a className="btn line" href="#itinerary">{c.heading.split(': ')[1].split(' - ')[0]}</a>
          </div>
        </div>
      </section>

      {/* ROUTE RIBBON */}
      <Marquee c={c} />

      {/* KEY FACTS */}
      <div className="facts">
        <div className="wrap">
          <Reveal className="fx stg">
            <div><span>{c.brand}</span><b>{c.length}</b></div>
            <div><span>{before(c.extension)}</span><b>{after(c.extension)}</b></div>
            <div><span>{before(c.departure)}</span><b>{after(c.departure)}</b></div>
            <div><span>{before(c.book[0])}</span><b>{after(c.book[0])}</b></div>
          </Reveal>
        </div>
      </div>

      {/* TWO-COLUMN BODY */}
      <div className="lm">
        <div className="wrap lmg">
          <div className="lm-main">

            {/* OVERVIEW */}
            <section id="overview" className="b">
              <Reveal>
                <Hd>{c.heading}</Hd>
                <p className="lead">{c.intro}</p>
              </Reveal>
              {map}
              <Reveal variant="zoom" className="b-route b-det">
                <p className="rc-x">{c.extension}</p>
                <div className="rc-d">
                  <b>{c.departure}</b>
                  <a href="#dates" className="lnk">{c.dates} &rarr;</a>
                </div>
                {c.instal && <p className="rc-n">{c.instal}</p>}
              </Reveal>
            </section>

            {/* ITINERARY = working-process steps */}
            <section id="itinerary" className="b">
              <h2 className="sr">{c.heading.split(': ')[1].split(' - ')[0]}</h2>
              <ol className="steps">
                {stops.map((s, i) => (
                  <li key={s.name} className={`step${s.ext ? ' ext' : ''}`}>
                    <span className="step-n" aria-hidden="true">{s.ext ? '+' : i + 1}</span>
                    <Reveal className="step-c imgrev">
                      <div className="step-im"><Art scene={s.scene} label={s.alt} /></div>
                      <div className="step-tx">
                        <div className="st-m"><span>{s.length}</span></div>
                        <h3>{s.name}{s.sub && <> <em>{s.sub}</em></>}</h3>
                        <p>{s.text.endsWith(' ' + c.title) ? <>{s.text.slice(0, -c.title.length)}<small className="kw">{c.title}</small></> : s.text}</p>
                        <a className="btn line" href="#enquire">Book Now</a>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </section>

            {/* TEMPERATURE (only tours that have one) */}
            {c.tempH && climate && (
              <section id="climate" className="b">
                <Reveal><Hd>{c.tempH}</Hd></Reveal>
                {climate}
              </section>
            )}

            {/* INCLUDED = checklist */}
            <section id="included" className="b">
              <Reveal><Hd>{c.incH}</Hd></Reveal>
              <Reveal variant="left" className="x-yes">
                <ul>{c.inc.map((x) => <li key={x}><Tick /><span>{x}</span></li>)}</ul>
              </Reveal>
              <Reveal variant="right" className="x-no">
                <h3>{c.notH}</h3>
                <p className="x-np">{c.notP}</p>
                <dl>
                  {c.not_.map((x) => {
                    const l = x.indexOf(': ')
                    return <div key={x}><dt>{x.slice(0, l + 1)}</dt><dd>{x.slice(l + 2)}</dd></div>
                  })}
                </dl>
              </Reveal>
              <Reveal variant="zoom" className="x-opt">
                <div><span>{c.optH}</span><p>{c.opt}</p></div>
                <a className="btn" href="#enquire">Book Now &rarr;</a>
              </Reveal>
            </section>

            {/* LEADERS + QUOTE */}
            <section id="leaders" className="b">
              <Reveal className="b-lead imgrev">
                <div className="b-leadimg"><Art scene={arts.leader.scene} label={arts.leader.label} /></div>
                <div className="b-leadtx">
                  <h2>{c.leadH}</h2>
                  <div className="b-bar" />
                  <p>{c.leadP}</p>
                </div>
              </Reveal>
              <Reveal className="b-quote">
                <h3>{c.realH}</h3>
                <span className="x-qm" aria-hidden="true">&ldquo;</span>
                <blockquote><p>{c.quote1}</p></blockquote>
              </Reveal>
            </section>

            {/* SECRETS = accordion */}
            <section id="secrets" className="b">
              <Reveal><Hd>{c.secH}</Hd></Reveal>
              <div className="b-sec">
                <Reveal className="ac-list stg">
                  {c.sec.map((x, i) => <Acc key={x} line={x} n={i + 1} open={i === 0} />)}
                </Reveal>
                <div className="b-secart">
                  <Reveal variant="zoom" className="x-art imgrev"><Art scene={arts.secrets[0].scene} label={arts.secrets[0].label} /></Reveal>
                  <Reveal variant="zoom" className="x-art imgrev"><Art scene={arts.secrets[1].scene} label={arts.secrets[1].label} /></Reveal>
                  <Reveal variant="zoom" className="x-art imgrev"><Art scene={arts.secrets[2].scene} label={arts.secrets[2].label} /></Reveal>
                </div>
              </div>
            </section>

            {/* BOOKING */}
            <section id="dates" className="b b-bk">
              <Booking c={c} />
            </section>

            {/* GREAT ADVENTURE + SEEK + LIFELINE */}
            <section id="great" className="b">
              <Reveal>
                <Hd>{c.greatH}</Hd>
                <p className="lead">{c.greatP}</p>
              </Reveal>
              <Reveal variant="right" className="x-seek">
                <h3>{c.seekH}</h3>
                <p>{c.seekP}</p>
              </Reveal>
              <Reveal className="b-lifeh"><h3>{c.lifeH}</h3></Reveal>
              <Reveal className="x-lifeg stg">
                {c.life.map((x) => <div key={x}><Tick /><p>{x}</p></div>)}
              </Reveal>
            </section>

            {/* OTHER ITINERARIES = accordion */}
            <section id="others" className="b">
              <Reveal><Hd>{c.himH}</Hd></Reveal>
              <Reveal className="ac-list stg">
                {c.him.map((x, i) => <Acc key={x} line={x} n={i + 1} />)}
              </Reveal>
            </section>

            {/* PRIVATE */}
            <section id="private" className="b">
              <Reveal className="b-priv">
                <h2>{c.privH}</h2>
                <div className="b-bar" />
                <p>{c.privP}</p>
              </Reveal>
            </section>
          </div>

          {/* STICKY SIDEBAR */}
          <aside className="lm-side" aria-label="Tour summary">
            <div className="w w-nav">
              <h4>{c.brand}</h4>
              <SpyNav items={nav} />
            </div>
            <div className="w w-facts">
              <dl>
                <div><dt>{c.brand}</dt><dd>{c.length}</dd></div>
                <div><dt>{before(c.extension)}</dt><dd>{after(c.extension)}</dd></div>
                <div><dt>{before(c.departure)}</dt><dd>{after(c.departure)}</dd></div>
              </dl>
            </div>
            <div className="w w-book">
              <span>{before(c.book[0])}</span>
              <b>{after(c.book[0])}</b>
              <a className="btn" href="#enquire">Book Now &rarr;</a>
            </div>
            <div className="w w-links">
              {c.links.map((l, i) => (
                <a key={l} href={['/#founder', '/#tours', '/#why'][i]}><span>{l}</span><i>&rarr;</i></a>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* CTA BAND */}
      <section className="lm-cta">
        <Mandala style={{ left: -150, top: -150 }} />
        <div className="wrap">
          <Reveal className="lm-cta-t">
            <h2>{c.stepH}</h2>
            <p>{c.stepP}</p>
          </Reveal>
          <Reveal variant="right" className="lm-cta-a">
            <a className="btn" href="#enquire">Book Now &rarr;</a>
            <a className="btn line" href="tel:+61409905612">+61 409 905 612</a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
