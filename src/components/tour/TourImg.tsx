'use client'
import { useState } from 'react'

/** Plain <img> for photos hosted on the client's existing site. If one fails to load, the gold placeholder behind it shows instead. */
export default function TourImg({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [bad, setBad] = useState(false)
  if (bad) return null
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setBad(true)} />
}
