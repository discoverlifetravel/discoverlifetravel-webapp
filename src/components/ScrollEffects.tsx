'use client'
import { useEffect, useRef } from 'react'

/** Scroll progress bar + gentle hero parallax. Writes straight to the elements (no React re-renders). */
export default function ScrollEffects() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero > img')
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
      if (hero && y < 1400) hero.style.translate = `0 ${Math.min(18, y * 0.05)}px`
      ticking = false
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return <div ref={bar} className="progress" aria-hidden="true" />
}
