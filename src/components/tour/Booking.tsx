import Reveal from '../Reveal'
import CopyCode from './CopyCode'
import type { TourContent } from '@/data/tourTypes'

const codeOf = (l: string) => l.match(/Code:\s*(\w+)/)?.[1]
const before = (l: string) => l.slice(0, l.indexOf(': '))
const after = (l: string) => l.slice(l.indexOf(': ') + 2)
/** Bold the "Label:" and leave the wording untouched. */
const Lead = ({ line }: { line: string }) => {
  const i = line.indexOf(': ')
  return i < 0 || i > 48 ? <>{line}</> : <><b>{line.slice(0, i + 1)}</b> {line.slice(i + 2)}</>
}

const Ico = ({ k }: { k: string }) => {
  const p: Record<string, string> = {
    tag: 'M3 12V4h8l9 9-8 8-9-9zM7.5 7.5h.01',
    gift: 'M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7C12 4 8 3 8 5.2S12 7 12 7zm0 0c0-3 4-4 4-1.8S12 7 12 7z',
    people: 'M8 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 10a2.5 2.5 0 100-5M16 14c3 0 6 2 6 6',
    lotus: 'M12 20c-4-1-7-4-7-8 3 0 5 1 7 4 2-3 4-4 7-4 0 4-3 7-7 8zM12 16c-2-2-2-6 0-10 2 4 2 8 0 10z',
    balloon: 'M12 3c4 0 6.5 3 6.5 6.2 0 3.6-3 6-5.2 7.3h-2.6C8.5 15.200 5.500 12.800 5.500 9.200 5.500 6 8 3 12 3zM10.600 19h2.800v2h-2.800z',
    lock: 'M6 11h12v9H6zM8.500 11V8a3.500 3.500 0 017 0v3M12 14.500v2.500',
    clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.500 2',
  }
  return <svg className="bk-i" viewBox="0 0 24 24" aria-hidden="true"><path d={p[k]} /></svg>
}
const ICONS = ['clock', 'tag', 'gift', 'people', 'lotus', 'balloon']

export default function Booking({ c }: { c: TourContent }) {
  const [price, ...deals] = c.book
  const [limited, ...offers] = deals
  return (
    <div className="bk">
      <Reveal className="bk-head">
        <h2>{c.bookH}</h2>
        <div className="bk-seats" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ ['--i' as string]: i }} className={i < 2 ? 'ld' : ''} />)}
        </div>
      </Reveal>

      <Reveal variant="zoom" className="bk-price">
        <div>
          <span>{before(price)}</span>
          <b>{after(price)}</b>
        </div>
        <a className="btn" href="#enquire">Book Now &rarr;</a>
      </Reveal>

      <Reveal className="bk-ribbon">
        <Ico k="clock" /><p><Lead line={limited} /></p>
      </Reveal>

      <Reveal className="bk-list stg">
        {offers.map((x, i) => {
          const code = codeOf(x)
          return (
            <div key={x} className={`bk-tk${code ? '' : ' nocode'}`}>
              <span className="bk-ic"><Ico k={ICONS[i + 1]} /></span>
              <p><Lead line={x} /></p>
              {code && <div className="bk-stub"><CopyCode code={code} /></div>}
            </div>
          )
        })}
      </Reveal>

      <p className="bk-note"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 11v6M12 7.500v.01" /></svg>{c.note}</p>

      <Reveal className="bk-why-h"><h3>{c.whyH}</h3></Reveal>
      <Reveal className="bk-why stg">
        {c.why.map((x, i) => (
          <div key={x}>
            <span className="bk-ic big"><Ico k={i ? 'people' : 'lock'} /></span>
            <p><Lead line={x} /></p>
          </div>
        ))}
      </Reveal>

      <Reveal className="bk-close">
        <p>{c.quote2}</p>
        <a className="btn" href="#enquire">Book Now &rarr;</a>
      </Reveal>
    </div>
  )
}
