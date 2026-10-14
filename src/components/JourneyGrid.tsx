'use client'
import { useState } from 'react'
import Image from 'next/image'
import Reveal from './Reveal'
import { journeys } from '@/data/journeys'

export default function JourneyGrid() {
  const [all, setAll] = useState(false)
  const list = all ? journeys : journeys.slice(0, 6)
  return (
    <>
      <Reveal className="cards stg">
        {list.map((j) => (
          <a key={j.title} className="jc" href={j.href ?? '#enquire'}>
            <div className="im">
              {j.img ? (
                <Image src={j.img} alt={j.title} width={j.w!} height={j.h!} sizes="(max-width:640px) 100vw, (max-width:1020px) 50vw, 380px" />
              ) : (
                <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 22h36c0 11-7 18-18 18S6 33 6 22zM17 40h14M30 20c1-6 6-10 11-12M24 20c0-5 2-8 5-10" /></svg>
              )}
            </div>
            <div className="tx">
              <div><h3>{j.title}</h3><p>{j.blurb}</p></div>
              <span className="ar" aria-hidden="true">&rarr;</span>
            </div>
          </a>
        ))}
      </Reveal>
      {!all && (
        <Reveal className="more">
          <button className="btn line" onClick={() => setAll(true)}>View all journeys &rarr;</button>
        </Reveal>
      )}
    </>
  )
}
