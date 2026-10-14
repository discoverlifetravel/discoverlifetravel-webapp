'use client'
import { useEffect, useRef, useState } from 'react'
import Lockup from './Lockup'

/** [label, href, id of the section (or page key) used to highlight the active link] */
const links: [string, string, string][] = [
  ['Journeys', '/#tours', 'tours'],
  ['Why We Are Different', '/#why', 'why'],
  ['Founder', '/#founder', 'founder'],
  ['Guest Stories', '/#stories', 'stories'],
  ['Contact', '#enquire', 'enquire'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const box = useRef<HTMLElement>(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  /* highlight the link of the section in view (home page) or the current page (tour page) */
  useEffect(() => {
    if (window.location.pathname.startsWith('/spirit-of-south-india')) return
    if (!('IntersectionObserver' in window)) return
    const secs = links.map(([, , id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!secs.length) return
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-35% 0px -55% 0px' })
    secs.forEach((s) => io.observe(s))
    const top = () => { if (window.scrollY < 200) setActive('') }
    window.addEventListener('scroll', top, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', top) }
  }, [])

  /* close the mobile menu with Escape or a tap outside it */
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const away = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('keydown', esc)
    document.addEventListener('click', away)
    return () => { document.removeEventListener('keydown', esc); document.removeEventListener('click', away) }
  }, [open])

  const close = () => setOpen(false)
  return (
    <header ref={box} className={`nav${scrolled ? ' scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="bar">
        <Lockup />
        <button className="burger" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
          <span>Menu</span><span className="bg" aria-hidden="true"><i /><i /><i /></span>
        </button>
        <nav id="menu" aria-label="Main" className={open ? 'open' : undefined}>
          {links.map(([label, href, id], i) => (
            <a key={label} href={href} onClick={close} style={{ ['--i' as string]: i }} className={active === id ? 'on' : undefined} aria-current={active === id ? ('location') : undefined}>
              <span>{label}</span>
            </a>
          ))}
          <a className="btn" href="#enquire" onClick={close} style={{ ['--i' as string]: links.length }}>Talk with Catherine &rarr;</a>
        </nav>
      </div>
    </header>
  )
}
