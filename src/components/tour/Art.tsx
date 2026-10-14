import type { ReactNode } from 'react'

/**
 * Original illustrations for each stop, drawn from simple geometry in the site's golden palette
 * (no third-party artwork, so no licensing issues). Swap for professional photography whenever it is available.
 */
export type Scene = 'bangalore' | 'mysore' | 'nilgiri' | 'ooty' | 'coimbatore' | 'kodaikanal' | 'madurai' | 'munnar' | 'kochi' | 'agra' | 'cooking' | 'safari' | 'hotel' | 'delhi' | 'bikaner' | 'jodhpur' | 'udaipur' | 'pushkar' | 'jaipur'

const D = '#3a2a0c', B = '#5a3f12', G = '#a67717', GL = '#e8c96b', CR = '#fff3c4', GR = '#5d6b2a', GR2 = '#46531c', GR3 = '#8a9a3c'
const range = (n: number) => Array.from({ length: n }, (_, i) => i)

function Sky({ id, a, b }: { id: string; a: string; b: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
    </defs>
  )
}
const Sun = ({ x, y, r, o = 0.95 }: { x: number; y: number; r: number; o?: number }) => <circle cx={x} cy={y} r={r} fill={CR} opacity={o} />
const Palm = ({ x, y, h, s = 1 }: { x: number; y: number; h: number; s?: number }) => (
  <g>
    <path d={`M${x} ${y} Q${x + 14 * s} ${y - h / 2} ${x + 6 * s} ${y - h}`} stroke={D} strokeWidth={7 * s} fill="none" strokeLinecap="round" />
    {[-70, -35, 0, 35, 70, 110, -110].map((a) => (
      <path key={a} transform={`translate(${x + 6 * s} ${y - h}) rotate(${a})`} d={`M0 0 Q${28 * s} ${-30 * s} ${64 * s} ${-6 * s} Q${30 * s} ${-14 * s} 0 0Z`} fill={GR2} />
    ))}
  </g>
)

function Gopuram({ tiers, w, x, y, base = '#b5472a' }: { tiers: number; w: number; x: number; y: number; base?: string }) {
  const th = 38
  return (
    <g>
      <rect x={x - w / 2} y={y - 50} width={w} height={50} fill={B} />
      <rect x={x - 14} y={y - 46} width={28} height={46} rx={14} fill={D} />
      {range(tiers).map((i) => {
        const tw = w * (1 - i * (0.82 / tiers)), ty = y - 50 - (i + 1) * th
        return (
          <g key={i}>
            <rect x={x - tw / 2} y={ty} width={tw} height={th - 4} fill={i % 2 ? GL : G} />
            <rect x={x - tw / 2 - 5} y={ty + th - 8} width={tw + 10} height={6} fill={i % 2 ? base : B} />
            {range(Math.max(2, Math.floor(tw / 34))).map((k) => {
              const n = Math.max(2, Math.floor(tw / 34)), gap = tw / n
              return <rect key={k} x={x - tw / 2 + gap * k + gap / 2 - 6} y={ty + 8} width={12} height={th - 20} rx={6} fill={D} opacity={0.75} />
            })}
          </g>
        )
      })}
      <path d={`M${x - 20} ${y - 50 - tiers * th} Q${x} ${y - 50 - tiers * th - 34} ${x + 20} ${y - 50 - tiers * th}Z`} fill={B} />
      {[-10, 0, 10].map((o) => <circle key={o} cx={x + o} cy={y - 50 - tiers * th - 30} r={4} fill={GL} />)}
    </g>
  )
}

const hills = (fills: string[], ys: number[]) =>
  fills.map((f, i) => <path key={i} d={`M0 ${ys[i]} Q200 ${ys[i] - 70} 400 ${ys[i] - 10} T800 ${ys[i] - 20} V600 H0Z`} fill={f} />)

const tea = (y0: number) =>
  range(9).map((i) => <path key={i} d={`M0 ${y0 + i * 26} Q220 ${y0 + i * 26 - 46} 440 ${y0 + i * 26 - 8} T800 ${y0 + i * 26 - 16}`} stroke="#b9c767" strokeWidth={5} fill="none" opacity={0.55} />)

const scenes: Record<Scene, () => ReactNode> = {
  delhi: () => (
    <>
      <Sky id="s13" a="#fbe9b0" b="#efca6e" />
      <rect width="800" height="600" fill="url(#s13)" />
      <Sun x={640} y={130} r={56} />
      <rect y="470" width="800" height="130" fill="#d8bf6e" />
      <rect x="120" y="300" width="560" height="170" fill="#b5472a" />
      <rect x="120" y="290" width="560" height="14" fill="#8a3219" />
      {range(14).map((i) => <path key={i} d={`M${130 + i * 40} 290 l8 -14 l8 14z`} fill="#8a3219" />)}
      <path d="M335 470 V370 Q400 290 465 370 V470Z" fill={D} />
      <path d="M350 470 V378 Q400 318 450 378 V470Z" fill="#e9c27a" opacity=".5" />
      {[[160, 300], [640, 300]].map(([x, y]) => (
        <g key={x}><rect x={x - 22} y={y - 70} width="44" height="70" fill="#b5472a" /><path d={`M${x - 26} ${y - 70} Q${x} ${y - 124} ${x + 26} ${y - 70}Z`} fill={CR} /><rect x={x - 2} y={y - 132} width="4" height="22" fill={G} /></g>
      ))}
      {[[250, 300], [550, 300]].map(([x, y]) => (
        <g key={x}><rect x={x - 12} y={y - 44} width="24" height="44" fill="#8a3219" /><path d={`M${x - 16} ${y - 44} Q${x} ${y - 78} ${x + 16} ${y - 44}Z`} fill={CR} /></g>
      ))}
      {range(5).map((i) => <rect key={i} x={380 - i * 8} y={470 + i * 12} width={40 + i * 16} height="4" fill={CR} opacity=".6" />)}
    </>
  ),
  bikaner: () => (
    <>
      <Sky id="s14" a="#fbe2a0" b="#e9a94c" />
      <rect width="800" height="600" fill="url(#s14)" />
      <Sun x={560} y={300} r={120} o={0.8} />
      <path d="M0 430 Q140 360 300 420 T560 410 T800 400 V600 H0Z" fill="#e0b867" />
      <path d="M0 500 Q200 440 420 490 T800 470 V600 H0Z" fill="#c99a45" />
      <g fill="#a85a2a" opacity=".85"><rect x="90" y="360" width="150" height="56" /><rect x="90" y="350" width="150" height="10" fill="#8a3219" />{range(6).map((i) => <rect key={i} x={98 + i * 24} y="338" width="12" height="14" />)}<path d="M150 416 V386 Q165 366 180 386 V416Z" fill={D} /></g>
      <g transform="translate(400 330)" fill={D}>
        <ellipse cx="0" cy="40" rx="86" ry="36" />
        <path d="M-40 14 Q-20 -30 0 14Z M10 14 Q30 -32 52 14Z" />
        <path d="M70 30 Q104 -10 100 -60 q18 -6 30 4 q4 14 -22 16 Q116 20 90 60Z" />
        {[-58, -30, 34, 62].map((x) => <rect key={x} x={x - 5} y="62" width="10" height="92" rx="4" />)}
        <path d="M-36 6 Q0 -12 40 6 V26 Q0 34 -36 26Z" fill={G} />
        <path d="M-36 20 Q0 36 40 20" stroke={GL} strokeWidth="4" fill="none" />
      </g>
      {[150, 640, 720].map((x) => <g key={x}><rect x={x} y="470" width="6" height="40" fill={GR2} /><path d={`M${x + 3} 480 q-26 -10 -30 -40M${x + 3} 490 q26 -10 30 -42`} stroke={GR2} strokeWidth="5" fill="none" /></g>)}
    </>
  ),
  jodhpur: () => (
    <>
      <Sky id="s15" a="#e9eef7" b="#f0d99a" />
      <rect width="800" height="600" fill="url(#s15)" />
      <Sun x={680} y={110} r={44} />
      <path d="M0 330 Q200 280 420 300 T800 310 V600 H0Z" fill="#c9a24a" opacity=".55" />
      <path d="M0 260 Q150 170 300 190 Q420 90 540 180 T800 230 V600 H0Z" fill="#b08a3a" opacity=".5" />
      <rect x="250" y="130" width="300" height="90" fill="#9f6b34" /><rect x="240" y="120" width="320" height="14" fill="#7a4d22" />
      {range(8).map((i) => <rect key={i} x={254 + i * 38} y="104" width="16" height="18" fill="#7a4d22" />)}
      {range(5).map((i) => <path key={i} d={`M${290 + i * 52} 220 V176 Q${302 + i * 52} 154 ${314 + i * 52} 176 V220Z`} fill={D} opacity=".7" />)}
      {range(9).map((r) => range(10).map((c) => {
        const x = 20 + c * 78 + (r % 2) * 30, y = 250 + r * 38, w = 54 + ((r + c) % 3) * 12, h = 30 + ((r * c) % 3) * 6
        const cols = ['#5c7fba', '#7b9bd0', '#4a6aa3', '#9db6e0']
        return <g key={`${r}-${c}`}><rect x={x} y={y} width={w} height={h} fill={cols[(r + c * 2) % 4]} /><rect x={x + 8} y={y + 10} width="10" height="14" fill="#2b3c66" opacity=".55" /></g>
      }))}
    </>
  ),
  udaipur: () => (
    <>
      <Sky id="s16" a="#fbe2b4" b="#f2c27a" />
      <rect width="800" height="600" fill="url(#s16)" />
      <Sun x={150} y={150} r={52} />
      <path d="M0 330 Q150 250 300 300 T600 290 T800 300 V380 H0Z" fill="#a89a6a" opacity=".55" />
      <rect y="380" width="800" height="220" fill="#7fa7b0" />
      {range(6).map((i) => <path key={i} d={`M${20 + i * 130} ${420 + (i % 3) * 40} q40 -10 80 0 t80 0`} stroke={CR} strokeWidth="3" fill="none" opacity=".55" />)}
      <rect x="170" y="300" width="460" height="86" fill={CR} />
      <rect x="150" y="380" width="500" height="14" fill="#d8c88d" />
      {range(9).map((i) => <path key={i} d={`M${196 + i * 48} 386 V338 Q${210 + i * 48} 316 ${224 + i * 48} 338 V386Z`} fill={D} opacity=".7" />)}
      {[[230, 300], [400, 300], [570, 300]].map(([x, y], k) => (
        <g key={x}><rect x={x - 28} y={y - 60 - k % 2 * 20} width="56" height={60 + k % 2 * 20} fill={CR} /><path d={`M${x - 34} ${y - 60 - k % 2 * 20} Q${x} ${y - 118 - k % 2 * 20} ${x + 34} ${y - 60 - k % 2 * 20}Z`} fill={CR} stroke={GL} strokeWidth="2" /><rect x={x - 2} y={y - 130 - k % 2 * 20} width="4" height="20" fill={G} /></g>
      ))}
      <rect x="170" y="394" width="460" height="60" fill={CR} opacity=".25" />
    </>
  ),
  pushkar: () => (
    <>
      <Sky id="s17" a="#fbe2b4" b="#f0b86a" />
      <rect width="800" height="600" fill="url(#s17)" />
      <Sun x={400} y={200} r={70} o={0.85} />
      <path d="M0 330 Q140 250 300 310 T620 300 T800 320 V420 H0Z" fill="#a8855a" opacity=".6" />
      <rect y="420" width="800" height="180" fill="#8fb3a8" />
      {range(7).map((i) => <rect key={i} x={30 + i * 12} y={400 - i * 0} width={740 - i * 24} height="0" />)}
      {range(7).map((i) => <rect key={i} x={20 + i * 22} y={420 - i * 0 + i * 8} width={760 - i * 44} height="8" fill={i % 2 ? CR : '#f0d99a'} opacity=".9" />)}
      <rect x="330" y="250" width="140" height="120" fill={CR} />
      <path d="M322 250 Q400 150 478 250Z" fill="#d6572d" /><rect x="397" y="130" width="6" height="30" fill={G} />
      <path d="M370 370 V310 Q400 280 430 310 V370Z" fill={D} opacity=".8" />
      {range(18).map((i) => <circle key={i} cx={60 + i * 41 + (i % 2) * 14} cy={500 + (i % 3) * 22} r="7" fill={i % 3 ? '#e8a31c' : '#d6572d'} opacity=".9" />)}
      {[90, 700].map((x) => <g key={x}><rect x={x} y="330" width="14" height="60" fill={B} /><path d={`M${x - 20} 330 Q${x + 7} 270 ${x + 34} 330Z`} fill={CR} /></g>)}
    </>
  ),
  jaipur: () => (
    <>
      <Sky id="s18" a="#fde7d3" b="#f3b99a" />
      <rect width="800" height="600" fill="url(#s18)" />
      <Sun x={680} y={110} r={46} />
      <rect y="500" width="800" height="100" fill="#d9a98a" />
      <path d="M0 360 Q200 300 400 330 T800 320 V500 H0Z" fill="#c98a6a" opacity=".5" />
      {[[400, 500, 340, 5], [230, 500, 200, 3], [570, 500, 200, 3]].map(([x, y, w, t], k) => (
        <g key={x}>
          {range(t).map((i) => {
            const tw = w * (1 - i * 0.14), ty = y - 60 - i * 70
            return (
              <g key={i}>
                <rect x={x - tw / 2} y={ty} width={tw} height="70" fill={i % 2 ? '#ea9c84' : '#e58a70'} />
                <rect x={x - tw / 2 - 6} y={ty - 6} width={tw + 12} height="8" fill="#fbe7d6" />
                {range(Math.max(2, Math.floor(tw / 38))).map((j) => {
                  const n = Math.max(2, Math.floor(tw / 38)), gap = tw / n
                  return <path key={j} d={`M${x - tw / 2 + gap * j + gap / 2 - 9} ${ty + 58} V${ty + 26} Q${x - tw / 2 + gap * j + gap / 2} ${ty + 8} ${x - tw / 2 + gap * j + gap / 2 + 9} ${ty + 26} V${ty + 58}Z`} fill={D} opacity=".65" />
                })}
              </g>
            )
          })}
          <rect x={x - w / 2} y={y - 60} width={w} height="60" fill="#d9704f" />
          <path d={`M${x - 24} ${y - 60 - t * 70} Q${x} ${y - 96 - t * 70} ${x + 24} ${y - 60 - t * 70}Z`} fill="#fbe7d6" />
        </g>
      ))}
    </>
  ),
  bangalore: () => (
    <>
      <Sky id="s1" a="#fbe9b0" b="#f0cf74" />
      <rect width="800" height="600" fill="url(#s1)" />
      <Sun x={640} y={140} r={60} />
      <rect y="470" width="800" height="130" fill={GR} />
      <rect x="150" y="350" width="500" height="120" fill={G} />
      <rect x="300" y="270" width="200" height="200" fill={GL} />
      <polygon points="285,272 400,215 515,272" fill={B} />
      <path d="M340 215 Q400 110 460 215Z" fill={B} /><rect x="396" y="86" width="8" height="40" fill={D} />
      {range(8).map((i) => <rect key={i} x={312 + i * 24} y="285" width="12" height="170" fill={CR} />)}
      {range(5).map((i) => <rect key={i} x={170 + i * 26} y="375" width="14" height="40" rx="7" fill={D} opacity=".8" />)}
      {range(5).map((i) => <rect key={i} x={520 + i * 26} y="375" width="14" height="40" rx="7" fill={D} opacity=".8" />)}
      <polygon points="270,470 530,470 510,440 290,440" fill={B} />
      {[90, 120, 700, 735].map((x) => <circle key={x} cx={x} cy="440" r="40" fill={GR2} />)}
    </>
  ),
  mysore: () => (
    <>
      <Sky id="s2" a="#241906" b="#b4811c" />
      <rect width="800" height="600" fill="url(#s2)" />
      {range(26).map((i) => <circle key={i} cx={(i * 97) % 800} cy={(i * 53) % 190 + 14} r={1.6} fill={CR} opacity=".8" />)}
      <rect x="110" y="390" width="580" height="100" fill={GL} />
      {range(12).map((i) => <rect key={i} x={128 + i * 46} y="418" width="26" height="72" rx="13" fill={D} />)}
      {[[150, 40], [650, 40]].map(([x, w]) => (
        <g key={x}><rect x={x - w / 2} y="300" width={w} height="92" fill={GL} /><path d={`M${x - w / 2 - 6} 300 Q${x} 230 ${x + w / 2 + 6} 300Z`} fill={G} /></g>
      ))}
      <rect x="320" y="290" width="160" height="102" fill={GL} />
      <path d="M312 292 Q400 140 488 292Z" fill={G} /><rect x="397" y="110" width="6" height="40" fill={CR} />
      {[[250, 330], [550, 330]].map(([x, y]) => <path key={x} d={`M${x - 30} ${y + 60} V${y} Q${x} ${y - 50} ${x + 30} ${y} V${y + 60}Z`} fill={G} />)}
      {range(42).map((i) => <circle key={i} cx={112 + i * 13.8} cy="388" r="3" fill="#fff6c8" />)}
      {range(22).map((i) => <circle key={i} cx={330 + i * 7.3} cy="296" r="2.4" fill="#fff6c8" />)}
      <rect y="490" width="800" height="110" fill={D} />
      {range(10).map((i) => <rect key={i} x={120 + i * 56} y="510" width="30" height="3" fill={GL} opacity=".5" />)}
    </>
  ),
  nilgiri: () => (
    <>
      <Sky id="s3" a="#fbe9b0" b="#e9c366" />
      <rect width="800" height="600" fill="url(#s3)" />
      <Sun x={600} y={170} r={70} />
      {hills(['#a8a253', GR3], [360, 430])}
      {[40, 120, 690, 760].map((x, i) => <g key={x}><rect x={x - 6} y="330" width="12" height="150" fill={D} /><circle cx={x} cy="320" r={54 - i * 3} fill={GR2} /></g>)}
      <rect y="480" width="800" height="120" fill={GR2} />
      <g fill={D}>
        <ellipse cx="420" cy="380" rx="160" ry="92" />
        <circle cx="270" cy="345" r="70" />
        <path d="M215 360 Q175 440 210 485" stroke={D} strokeWidth="38" fill="none" strokeLinecap="round" />
        {[300, 360, 450, 515].map((x) => <rect key={x} x={x} y="430" width="42" height="95" rx="16" />)}
        <path d="M580 340 Q610 380 595 430" stroke={D} strokeWidth="8" fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx="318" cy="350" rx="46" ry="68" fill={B} />
      <path d="M235 372 Q205 400 214 425" stroke={CR} strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="262" cy="332" r="5" fill={CR} />
    </>
  ),
  ooty: () => (
    <>
      <Sky id="s4" a="#f6ecc8" b="#e3d08a" />
      <rect width="800" height="600" fill="url(#s4)" />
      <path d="M0 300 Q150 220 300 280 T560 250 T800 290 V600H0Z" fill="#a9b366" opacity=".7" />
      {hills([GR3, GR, GR2], [340, 400, 470])}
      {tea(360)}
      <ellipse cx="400" cy="300" rx="420" ry="26" fill="#fff9e2" opacity=".55" />
      <rect y="515" width="800" height="85" fill="#cdb86a" />
      {range(7).map((i) => <rect key={i} x={60 + i * 110} y={535 + (i % 2) * 14} width="60" height="3" fill={CR} opacity=".7" />)}
      <path d="M520 505 Q560 540 640 505Z" fill={D} /><path d="M580 505 V470 L615 505Z" fill={CR} />
    </>
  ),
  coimbatore: () => (
    <>
      <Sky id="s5" a="#fbe9b0" b="#efca6e" />
      <rect width="800" height="600" fill="url(#s5)" />
      <Sun x={150} y={130} r={55} />
      <rect y="500" width="800" height="100" fill={B} />
      <Gopuram tiers={5} w={300} x={400} y={500} />
      {range(9).map((i) => <circle key={i} cx={90 + i * 78} cy="545" r="9" fill={GL} />)}
      {range(9).map((i) => <path key={i} d={`M${90 + i * 78} 528 q-5 -12 0 -22 q5 10 0 22z`} fill="#ffb02e" />)}
    </>
  ),
  kodaikanal: () => (
    <>
      <Sky id="s6" a="#f6ecc8" b="#e3cf8a" />
      <rect width="800" height="600" fill="url(#s6)" />
      <polygon points="0,330 150,200 280,310 420,180 580,320 700,220 800,300 800,400 0,400" fill="#b9a36a" />
      <polygon points="0,380 200,290 380,370 560,280 800,380 800,430 0,430" fill="#8a7a45" />
      <ellipse cx="400" cy="380" rx="460" ry="22" fill="#fff9e2" opacity=".55" />
      <rect y="420" width="800" height="180" fill="#cdb86a" />
      {range(8).map((i) => <rect key={i} x={70 + i * 90} y={450 + (i % 3) * 28} width={70 - (i % 3) * 14} height="3" fill={CR} opacity=".8" />)}
      {[[70, 470, 1], [150, 490, .8], [730, 470, 1.1], [650, 495, .8]].map(([x, y, s]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <rect x="-6" y="-20" width="12" height="40" fill={D} />
          {[0, 1, 2, 3].map((i) => <polygon key={i} points={`0,${-190 + i * 44} ${-56 + i * 6},${-110 + i * 44} ${56 - i * 6},${-110 + i * 44}`} fill={GR2} />)}
        </g>
      ))}
    </>
  ),
  madurai: () => (
    <>
      <Sky id="s7" a="#fbe9b0" b="#f0cf74" />
      <rect width="800" height="600" fill="url(#s7)" />
      <Sun x={680} y={120} r={52} />
      <rect y="520" width="800" height="80" fill={B} />
      <g opacity=".85"><Gopuram tiers={5} w={150} x={105} y={520} base="#8a5f12" /><Gopuram tiers={5} w={150} x={695} y={520} base="#8a5f12" /></g>
      <Gopuram tiers={8} w={300} x={400} y={520} />
    </>
  ),
  munnar: () => (
    <>
      <Sky id="s8" a="#f8ecc4" b="#dcd08a" />
      <rect width="800" height="600" fill="url(#s8)" />
      {hills([GR3, GR, GR2], [320, 400, 480])}
      {tea(340)}
      <g transform="translate(560 130)"><g className="balloon">
        <path d="M0 -90 C-80 -90 -92 20 -22 70 L22 70 C92 20 80 -90 0 -90Z" fill="#e0a410" />
        <path d="M0 -90 C-36 -80 -36 20 -10 70 L10 70 C36 20 36 -80 0 -90Z" fill="#b5472a" />
        <path d="M-22 70 L-12 98 M22 70 L12 98" stroke={D} strokeWidth="3" />
        <rect x="-16" y="98" width="32" height="22" fill={B} />
      </g></g>
      <g transform="translate(200 90)" fill={D} opacity=".5"><path d="M0 0 q12 -10 24 0 q12 -10 24 0 q-12 4 -24 14 q-12 -10 -24 -14z" /></g>
    </>
  ),
  kochi: () => (
    <>
      <Sky id="s9" a="#f6d98a" b="#e08a2e" />
      <rect width="800" height="600" fill="url(#s9)" />
      <Sun x={400} y={330} r={90} o={0.9} />
      <rect y="350" width="800" height="250" fill="#b8741f" />
      {range(9).map((i) => <rect key={i} x={380 - i * 20 + (i % 2) * 30} y={365 + i * 22} width={40 + i * 24} height="3" fill={CR} opacity={0.7 - i * 0.05} />)}
      <Palm x={690} y={400} h={230} />
      <Palm x={745} y={410} h={170} s={0.8} />
      <Palm x={60} y={400} h={200} s={0.9} />
      <g stroke={D} strokeWidth="5" fill="none"><path d="M150 410 L230 210" /><path d="M110 330 Q200 250 265 250" /></g>
      <g stroke={D} strokeWidth="1.5" opacity=".7">{range(8).map((i) => <path key={i} d={`M${112 + i * 7} ${334 + i * 6} L${210 + i * 8} ${250 + i * 2}`} fill="none" />)}</g>
      <path d="M250 440 Q400 520 560 440Z" fill={D} />
      <rect x="290" y="392" width="230" height="50" fill={B} />
      <path d="M278 394 Q405 300 532 394Z" fill={G} />
      {range(12).map((i) => <rect key={i} x={300 + i * 18} y="404" width="3" height="30" fill={GL} />)}
    </>
  ),
  agra: () => (
    <>
      <Sky id="s10" a="#fbe9b0" b="#efca6e" />
      <rect width="800" height="600" fill="url(#s10)" />
      <Sun x={150} y={120} r={50} />
      <rect y="470" width="800" height="130" fill="#d8bf6e" />
      {range(7).map((i) => <rect key={i} x={380 - i * 8} y={490 + i * 15} width={40 + i * 16} height="4" fill={CR} opacity=".7" />)}
      <rect x="200" y="400" width="400" height="70" fill={CR} />
      <rect x="260" y="270" width="280" height="130" fill={CR} />
      <path d="M270 270 C270 150 530 150 530 270Z" fill={CR} stroke={GL} strokeWidth="2" />
      <rect x="397" y="106" width="6" height="40" fill={G} /><ellipse cx="400" cy="152" rx="9" ry="14" fill={G} />
      <path d="M365 400 V320 Q400 270 435 320 V400Z" fill={D} opacity=".85" />
      {[[320, 320], [480, 320]].map(([x, y]) => <path key={x} d={`M${x - 16} ${y + 70} V${y} Q${x} ${y - 30} ${x + 16} ${y} V${y + 70}Z`} fill={GL} opacity=".6" />)}
      {[[190, 440], [610, 440]].map(([x, y]) => (
        <g key={x}><rect x={x - 12} y={y - 190} width="24" height="190" fill={CR} /><rect x={x - 16} y={y - 100} width="32" height="6" fill={GL} /><path d={`M${x - 16} ${y - 190} Q${x} ${y - 230} ${x + 16} ${y - 190}Z`} fill={G} /></g>
      ))}
      {[60, 110, 690, 740].map((x) => <path key={x} d={`M${x} 470 q-16 -60 0 -120 q16 60 0 120z`} fill={GR2} />)}
    </>
  ),
  cooking: () => (
    <>
      <rect width="800" height="600" fill="#f4e1ac" />
      <rect y="360" width="800" height="240" fill={B} />
      <path d="M250 330 H550 Q550 460 400 460 Q250 460 250 330Z" fill={D} /><rect x="236" y="320" width="328" height="16" rx="8" fill={G} />
      {[330, 400, 470].map((x) => <path key={x} d={`M${x} 290 q-18 -26 0 -52 q18 -26 0 -52`} stroke="#fff9e2" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".7" />)}
      {[[120, 520, '#e0a410'], [260, 540, '#a8321c'], [400, 530, GR], [540, 540, '#7b4a1a'], [680, 520, '#e0a410']].map(([x, y, c]) => (
        <g key={String(x)}><ellipse cx={Number(x)} cy={Number(y)} rx="62" ry="22" fill={CR} /><ellipse cx={Number(x)} cy={Number(y) - 8} rx="46" ry="16" fill={String(c)} /></g>
      ))}
    </>
  ),
  safari: () => (
    <>
      <Sky id="s11" a="#fbe9b0" b="#e9b94c" />
      <rect width="800" height="600" fill="url(#s11)" />
      <Sun x={560} y={290} r={110} o={0.85} />
      <rect y="400" width="800" height="200" fill={GR3} />
      {range(40).map((i) => <path key={i} d={`M${i * 21} 600 q4 -50 10 -90`} stroke={GR2} strokeWidth="3" fill="none" opacity=".6" />)}
      {[[110, 1], [700, .8]].map(([x, s]) => (
        <g key={x} transform={`translate(${x} 420) scale(${s})`}><rect x="-5" y="-130" width="10" height="130" fill={D} /><ellipse cx="0" cy="-140" rx="100" ry="26" fill={GR2} /></g>
      ))}
      <g fill={D}>
        <rect x="260" y="400" width="290" height="60" rx="10" />
        <rect x="290" y="350" width="200" height="52" /><rect x="285" y="340" width="215" height="10" />
        <circle cx="320" cy="470" r="34" /><circle cx="500" cy="470" r="34" />
      </g>
      <circle cx="320" cy="470" r="14" fill={GL} /><circle cx="500" cy="470" r="14" fill={GL} />
      <rect x="305" y="360" width="80" height="34" fill={GL} opacity=".6" /><rect x="400" y="360" width="80" height="34" fill={GL} opacity=".6" />
    </>
  ),
  hotel: () => (
    <>
      <Sky id="s12" a="#fbe9b0" b="#efca6e" />
      <rect width="800" height="600" fill="url(#s12)" />
      <rect y="440" width="800" height="160" fill={B} />
      <path d="M230 460 V250 Q400 60 570 250 V460Z" fill={D} />
      <path d="M250 460 V256 Q400 90 550 256 V460Z" fill="#cdd9a0" />
      <Sun x={400} y={300} r={50} />
      <path d="M250 460 V360 Q400 300 550 360 V460Z" fill={GR} opacity=".8" />
      {[120, 680].map((x) => <g key={x}><rect x={x - 30} y="190" width="60" height="270" fill={GL} /><rect x={x - 40} y="180" width="80" height="16" fill={G} /><rect x={x - 40} y="450" width="80" height="18" fill={G} /></g>)}
      {range(11).map((i) => <circle key={i} cx={235 + i * 33} cy="262" r="5" fill={GL} />)}
      {range(7).map((i) => <rect key={i} x={20 + i * 120} y="468" width="60" height="4" fill={GL} opacity=".45" />)}
    </>
  ),
}

export default function Art({ scene, label, className = '' }: { scene: Scene; label: string; className?: string }) {
  return (
    <svg className={`art ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      {scenes[scene]()}
    </svg>
  )
}
