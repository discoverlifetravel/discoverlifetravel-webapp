'use client'
import { useEffect, useRef } from 'react'

/** Sidebar "on this page" list: highlights the link of the section currently in view. */
export default function SpyNav({ items }: { items: [string, string][] }) {
  const ref = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const links = Array.from(ref.current?.querySelectorAll('a') ?? [])
    const secs = items.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!('IntersectionObserver' in window) || !secs.length) return
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return
        links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id))
      })
    }, { rootMargin: '-30% 0px -60% 0px' })
    secs.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [items])
  return (
    <ul ref={ref}>
      {items.map(([id, t]) => <li key={id}><a href={`#${id}`}><i>&rarr;</i><span>{t}</span></a></li>)}
    </ul>
  )
}
