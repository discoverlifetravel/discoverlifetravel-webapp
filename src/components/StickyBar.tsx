'use client'
import { useEffect, useState } from 'react'

export default function StickyBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 320)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className={`sticky${show ? ' show' : ''}`}>
      <a className="btn line" href="tel:1800000000">Call us</a>
      <a className="btn" href="#enquire">Talk to Catherine</a>
    </div>
  )
}
