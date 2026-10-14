'use client'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Reveal from './Reveal'

const interests = [
  'Spirit of South India', 'Desert Odyssey Rajasthan', 'Sunsets & Saffron Kashmir', 'Majestic Realms India',
  'Ancient Encounters India', 'Arc of the East India Tour', 'Mother Masala Tours', 'A fully bespoke journey',
]

export default function Enquiry({ defaultInterest }: { defaultInterest?: string } = {}) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    // In local development there is no Netlify Forms endpoint, so just show the thank-you page.
    if (process.env.NODE_ENV === 'development') { router.push('/thanks'); return }
    try {
      const data = new FormData(e.currentTarget)
      const body = new URLSearchParams(data as unknown as Record<string, string>).toString()
      const res = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      if (!res.ok) throw new Error('Form submission failed')
      router.push('/thanks')
    } catch {
      setError('Sorry, something went wrong. Please email hello@discoverlife.travel.')
      setBusy(false)
    }
  }

  return (
    <section id="enquire">
      <div className="wrap enq">
        <Reveal>
          <div className="eyebrow l">Enquire</div>
          <h2>Be Part of the Journey</h2>
          <p>Tell us when and with whom you would like to travel. Catherine will reply personally with ideas for your journey, along with our India planning guide.</p>
        </Reveal>
        <Reveal>
          <form name="enquiry" method="POST" onSubmit={onSubmit}>
            <input type="hidden" name="form-name" value="enquiry" />
            <p hidden><label>Skip this <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
            <div><label htmlFor="n">Your name</label><input id="n" name="name" autoComplete="name" required /></div>
            <div><label htmlFor="e">Email</label><input id="e" name="email" type="email" autoComplete="email" required /></div>
            <div>
              <label htmlFor="w">Preferred travel window</label>
              <select id="w" name="window">
                <option>October to December 2027</option>
                <option>January to March 2028</option>
                <option>Flexible</option>
              </select>
            </div>
            <div>
              <label htmlFor="i">Journey of interest</label>
              <select id="i" name="interest" defaultValue={defaultInterest}>
                {interests.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
            <button className="btn" type="submit" disabled={busy} style={{ justifyContent: 'center' }}>{busy ? 'Sending…' : 'Request my consultation'}</button>
            {error && <p className="fine" role="alert">{error}</p>}
            <p className="fine">Your details stay private and are never shared, in line with the Australian Privacy Act.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
