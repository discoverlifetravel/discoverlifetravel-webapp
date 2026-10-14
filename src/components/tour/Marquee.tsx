import type { TourContent } from '@/data/tourTypes'

/** Slow scrolling ribbon of the route (visual only; the second copy is hidden from assistive tech and crawlers' text flow). */
export default function Marquee({ c }: { c: TourContent }) {
  const set = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : 'Tour route'}>
      {c.route.map((r) => <li key={r}>{r}</li>)}
      <li>{c.length}</li>
    </ul>
  )
  return (
    <div className="mq">
      <div className="mq-t">{set(false)}{set(true)}{set(true)}</div>
    </div>
  )
}
