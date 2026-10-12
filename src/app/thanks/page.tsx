import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Thank you | Discover Life Travel', robots: { index: false } }

export default function Thanks() {
  return (
    <main className="thanks">
      <div>
        <h1>Thank you.</h1>
        <p>Catherine will be in touch personally to begin planning your journey.</p>
        <a className="btn" href="/">Back to the website</a>
      </div>
    </main>
  )
}
