'use client'
import { useState } from 'react'

export default function CopyCode({ code }: { code: string }) {
  const [done, setDone] = useState(false)
  async function copy() {
    try { await navigator.clipboard.writeText(code) } catch { /* clipboard blocked: still show feedback */ }
    setDone(true)
    setTimeout(() => setDone(false), 1800)
  }
  return (
    <button type="button" className={`x-copy${done ? ' ok' : ''}`} onClick={copy} aria-label={`Copy discount code ${code}`}>
      <span>{code}</span><i>{done ? 'Copied' : 'Copy'}</i>
    </button>
  )
}
