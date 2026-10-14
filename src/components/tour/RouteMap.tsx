import type { ReactNode } from 'react'

/**
 * Illustrative route maps (pure SVG: no tiles, no API key, no third-party requests).
 * Coordinates are real (lon, lat); outlines are simplified for illustration.
 */
type City = { n: string; lon: number; lat: number; side: 'l' | 'r' }
export type MapCfg = {
  w: number; h: number
  x0: number; y0: number; k: number
  cities: City[]
  outline: [number, number][]
  /** sea / water look (south India) or plain land (Rajasthan) */
  sea?: { label: [string, string]; at: [number, number] }
  bg: string
  /** optional extra stop drawn with a dashed spur from the last city */
  optional?: { n: string; lon: number; lat: number }
  /** faint extra lines or labels, in lon/lat */
  ridge?: { pts: [number, number][]; label: string; at: [number, number] }
  region?: { label: string; at: [number, number] }
  compass: [number, number]
}

const poly = (m: MapCfg, pts: [number, number][]) => pts.map(([a, b]) => px(m, a, b).map((v) => v.toFixed(1)).join(',')).join(' ')
const px = (m: MapCfg, lon: number, lat: number): [number, number] => [(lon - m.x0) * m.k, (m.y0 - lat) * m.k]

/** Smooth path through the stops (Catmull-Rom converted to cubic Béziers). */
function smooth(p: [number, number][]) {
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c
    const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6]
    const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${c[0].toFixed(1)},${c[1].toFixed(1)}`
  }
  return d
}

export default function RouteMap({ map: m, label, uid }: { map: MapCfg; label: string; uid: string }) {
  const pts = m.cities.map((c) => px(m, c.lon, c.lat))
  const opt = m.optional ? px(m, m.optional.lon, m.optional.lat) : null
  const g = (n: string) => `${uid}-${n}`
  return (
    <svg className="rm-svg" viewBox={`0 0 ${m.w} ${m.h}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={g('land')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbf0cf" /><stop offset="1" stopColor="#f1dc9d" /></linearGradient>
        <pattern id={g('dots')} width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#c9a24a" opacity=".28" /></pattern>
        <clipPath id={g('clip')}><rect width={m.w} height={m.h} /></clipPath>
      </defs>
      <rect width={m.w} height={m.h} fill={m.bg} />
      <g clipPath={`url(#${g('clip')})`}>
        {m.sea && (
          <g className="rm-waves" fill="none" stroke="#9fbab2" strokeWidth="1" opacity=".5">
            {[0, 1, 2, 3].map((i) => <path key={i} d={`M${10 + i * 12},${470 + i * 30} q30,-10 60,0 t60,0`} />)}
          </g>
        )}
        <polygon className="rm-land" points={poly(m, m.outline)} fill={`url(#${g('land')})`} stroke="#b88a2a" strokeWidth="2" strokeLinejoin="round" />
        <polygon points={poly(m, m.outline)} fill={`url(#${g('dots')})`} />
        {m.sea && <text className="rm-sea" x={m.sea.at[0]} y={m.sea.at[1]}>{m.sea.label[0]}<tspan x={m.sea.at[0]} dy="19">{m.sea.label[1]}</tspan></text>}
        {m.region && (() => { const [x, y] = px(m, m.region.at[0], m.region.at[1]); return <text className="rm-sea rm-region" x={x} y={y}>{m.region.label}</text> })()}
        {m.ridge && (
          <g>
            <polyline className="rm-ridge" points={poly(m, m.ridge.pts)} fill="none" />
            {(() => { const [x, y] = px(m, m.ridge.at[0], m.ridge.at[1]); return <text className="rm-sea rm-rl" x={x} y={y}>{m.ridge.label}</text> })()}
          </g>
        )}
        <path d={smooth(pts)} fill="none" stroke="#fffdf8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
        <path className="rm-line" pathLength={1} d={smooth(pts)} fill="none" stroke="#a67717" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        {opt && (
          <g className="rm-opt">
            <path d={`M${pts[pts.length - 1][0].toFixed(1)},${pts[pts.length - 1][1].toFixed(1)} L${opt[0].toFixed(1)},${opt[1].toFixed(1)}`} fill="none" stroke="#a67717" strokeWidth="2.4" strokeDasharray="2 7" strokeLinecap="round" />
            <g transform={`translate(${opt[0].toFixed(1)} ${opt[1].toFixed(1)})`}>
              <title>{`${m.optional!.n} (optional extra)`}</title>
              <circle r="11" fill="#fffdf8" stroke="#a67717" strokeWidth="2.5" strokeDasharray="3 3" />
              <text y="4.5" textAnchor="middle" className="rm-plus">+</text>
              <text className="rm-name" x="19" y="5">{m.optional!.n}</text>
            </g>
          </g>
        )}
        {m.cities.map((c, i) => {
          const [x, y] = pts[i]
          const left = c.side === 'l'
          return (
            <g key={c.n} className="rm-pin" style={{ ['--i' as string]: i }} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <title>{`${i + 1}. ${c.n}`}</title>
              <circle className="rm-ring" r="13" />
              <g className="rm-dot"><circle r="12" /><text y="4.5" textAnchor="middle">{i + 1}</text></g>
              <text className="rm-name" x={left ? -20 : 20} y="5" textAnchor={left ? 'end' : 'start'}>{c.n}</text>
            </g>
          )
        })}
      </g>
      <g className="rm-n" transform={`translate(${m.compass[0]} ${m.compass[1]})`}><circle r="20" fill="#fffdf8" stroke="#b88a2a" /><path d="M0,-13 L6,6 L0,2 L-6,6Z" fill="#a67717" /><text y="17" textAnchor="middle">N</text></g>
    </svg>
  )
}

export const southMap: MapCfg = {
  w: 500, h: 600, x0: 75.0, y0: 13.9, k: 100, bg: '#eef3ef', compass: [458, 42],
  sea: { label: ['Arabian', 'Sea'], at: [12, 318] },
  cities: [
    { n: 'Bangalore', lon: 77.59, lat: 12.97, side: 'r' },
    { n: 'Mysore', lon: 76.64, lat: 12.3, side: 'l' },
    { n: 'Ooty', lon: 76.69, lat: 11.41, side: 'l' },
    { n: 'Coimbatore', lon: 76.96, lat: 11.02, side: 'r' },
    { n: 'Kodaikanal', lon: 77.49, lat: 10.24, side: 'r' },
    { n: 'Madurai', lon: 78.12, lat: 9.92, side: 'r' },
    { n: 'Munnar', lon: 77.06, lat: 10.09, side: 'l' },
    { n: 'Kochi', lon: 76.27, lat: 9.93, side: 'l' },
    { n: 'Alleppey', lon: 76.33, lat: 9.5, side: 'l' },
  ],
  outline: [
    [73.2, 16.6], [73.45, 16.0], [73.75, 15.5], [74.1, 14.8], [74.45, 14.0], [74.7, 13.35], [74.85, 12.9], [75.2, 12.2],
    [75.37, 11.87], [75.78, 11.25], [76.0, 10.8], [76.27, 9.97], [76.33, 9.5], [76.5, 9.1], [76.6, 8.9], [76.95, 8.5],
    [77.3, 8.15], [77.55, 8.08], [77.9, 8.2], [78.15, 8.8], [78.9, 9.25], [79.3, 9.28], [79.1, 9.9], [79.5, 10.3],
    [79.85, 10.3], [79.85, 10.77], [79.83, 11.93], [80.28, 13.08], [80.4, 14.0], [80.4, 16.6],
  ],
}

export const desertMap: MapCfg = {
  w: 500, h: 390, x0: 69.2, y0: 30.4, k: 50, bg: '#f4ecd6', compass: [458, 40],
  cities: [
    { n: 'Delhi', lon: 77.21, lat: 28.61, side: 'r' },
    { n: 'Bikaner', lon: 73.31, lat: 28.02, side: 'l' },
    { n: 'Nagaur', lon: 73.74, lat: 27.2, side: 'r' },
    { n: 'Jodhpur', lon: 73.02, lat: 26.24, side: 'l' },
    { n: 'Udaipur', lon: 73.71, lat: 24.58, side: 'r' },
    { n: 'Pushkar', lon: 74.55, lat: 26.49, side: 'r' },
    { n: 'Jaipur', lon: 75.79, lat: 26.91, side: 'r' },
  ],
  optional: { n: 'Agra', lon: 78.01, lat: 27.18 },
  region: { label: 'Thar Desert', at: [69.9, 27.1] },
  ridge: {
    pts: [[72.7, 24.4], [73.4, 25.0], [73.9, 25.7], [74.6, 26.4], [75.2, 27.2], [75.9, 27.9], [76.7, 28.35]],
    label: 'Aravalli Range', at: [74.75, 25.45],
  },
  outline: [
    [74.3, 30.1], [75.0, 29.9], [75.5, 29.5], [75.4, 28.9], [76.3, 28.7], [76.2, 28.2], [76.9, 27.9], [77.2, 27.7], [77.6, 27.1],
    [78.2, 26.9], [78.3, 26.4], [77.9, 26.0], [76.9, 26.1], [76.4, 25.7], [76.2, 25.2], [75.9, 24.8], [76.2, 24.2], [75.2, 24.1],
    [74.7, 24.2], [74.4, 23.9], [74.5, 23.3], [73.7, 23.3], [72.8, 23.9], [72.4, 24.5], [71.5, 24.5], [71.0, 25.0], [70.1, 24.7],
    [69.5, 24.3], [69.6, 25.2], [70.0, 26.0], [69.5, 26.7], [70.1, 27.4], [70.2, 28.0], [70.5, 28.0], [71.0, 28.9], [71.9, 29.1],
    [72.9, 29.0], [73.3, 29.9],
  ],
}

export type { ReactNode }
