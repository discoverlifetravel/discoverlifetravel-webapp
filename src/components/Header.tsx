'use client'
import { useEffect, useState } from 'react'
import Lockup from './Lockup'

const links: [string, string][] = [
  ['Journeys', '#tours'],
  ['Why Us', '#why'],
  ['Catherine', '#founder'],
  ['Guest Stories', '#stories'],
  ['Contact', '#enquire'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const close = () => setOpen(false)
  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="bar">
        <Lockup />
        <button className="burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>Menu</button>
        <nav id="menu" aria-label="Main" className={open ? 'open' : undefined}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <a className="btn" href="#enquire" onClick={close}>Talk to Catherine &rarr;</a>
        </nav>
      </div>
    </header>
  )
}
