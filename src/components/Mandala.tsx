import type { CSSProperties } from 'react'

/** Original mandala line art, generated from geometry (no third-party artwork). */
const G = '#bf9a52'
const rot = (n: number, d: string, off = 0) =>
  Array.from({ length: n }, (_, i) => <path key={i} transform={`rotate(${(i * 360) / n + off} 100 100)`} d={d} />)
const dots = (n: number, r: number, s: number, off = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((i * 360) / n + off) * (Math.PI / 180)
    return <circle key={i} cx={(100 + r * Math.sin(a)).toFixed(2)} cy={(100 - r * Math.cos(a)).toFixed(2)} r={s} fill={G} stroke="none" />
  })

export default function Mandala({ style }: { style?: CSSProperties }) {
  return (
    <div className="mandala" style={style} aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none" stroke={G} strokeWidth={0.55} strokeLinejoin="round">
        <circle cx="100" cy="100" r="98.5" />
        <circle cx="100" cy="100" r="96" strokeDasharray="1 2.2" />
        {rot(48, 'M100 5c2.6 4 2.6 8 0 12-2.6-4-2.6-8 0-12z')}
        {dots(48, 84, 0.7, 3.75)}
        <circle cx="100" cy="100" r="82" />
        {rot(24, 'M100 20c9 11 9 24 0 36-9-12-9-25 0-36z')}
        {rot(24, 'M100 28c5 7 5 14 0 21-5-7-5-14 0-21z')}
        {dots(24, 63, 1.1, 7.5)}
        <circle cx="100" cy="100" r="43" />
        <circle cx="100" cy="100" r="40" strokeDasharray="1 2.2" />
        {rot(16, 'M100 60c6 7 6 13 0 20-6-7-6-13 0-20z')}
        {dots(16, 47, 0.8, 11.25)}
        {rot(8, 'M100 78c8 6 9 12 0 22-9-10-8-16 0-22z')}
        {rot(8, 'M100 86c3 4 4 8 0 14-4-6-3-10 0-14z', 22.5)}
        <circle cx="100" cy="100" r="6" />
        <circle cx="100" cy="100" r="2.4" fill={G} />
      </svg>
    </div>
  )
}
