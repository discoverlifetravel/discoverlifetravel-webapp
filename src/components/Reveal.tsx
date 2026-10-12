'use client'
import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

type Variant = 'left' | 'right' | 'zoom'

/**
 * Scroll-reveal wrapper. CSS lives in globals.css (.js .rv / .rv.in, variants, .stg, .imgrev).
 * - variant: slide in from the left / right, or zoom in
 * - add className "stg" to stagger the direct children (each gets --i)
 * - add className "imgrev" to reveal an <img> with a clip-path wipe
 */
export default function Reveal({ children, className = '', style, variant }: { children: ReactNode; className?: string; style?: CSSProperties; variant?: Variant }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (el.classList.contains('stg')) Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)))
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const cls = ['rv', variant ? `rv-${variant}` : '', className].filter(Boolean).join(' ')
  return <div ref={ref} className={cls} style={style}>{children}</div>
}
