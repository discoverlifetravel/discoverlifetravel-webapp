'use client'
import { useRef } from 'react'
import type { ReactNode } from 'react'

export default function Carousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const go = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: 'smooth' })
  return (
    <div className="x-car">
      <div className="x-track" ref={ref} tabIndex={0} aria-label="Itineraries, scroll sideways">{children}</div>
      <div className="x-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Previous">&larr;</button>
        <button type="button" onClick={() => go(1)} aria-label="Next">&rarr;</button>
      </div>
    </div>
  )
}
