import Image from 'next/image'

export default function Lockup({ label = 'Discover Life Travel home' }: { label?: string }) {
  return (
    <a className="lock" href="#top" aria-label={label}>
      <span className="mk"><Image src="/logo.jpeg" alt="" width={142} height={102} unoptimized /></span>
      <span>
        <b><i>D</i>ISCOVER <i>L</i>IFE</b>
        <em>travel</em>
        <small>Founder-Led Journeys through India</small>
      </span>
    </a>
  )

  // return (
  //   <a className="lock" href="/#top" aria-label={label}>
  //     <span className="mk"><Image src="/logo-mark.png" alt="" width={283} height={333} unoptimized priority /></span>
  //     <span className="lt">
  //       <Image src="/logo-text.png" alt="Discover Life Travel" width={797} height={168} unoptimized priority />
  //       <small>Founder-Led Journeys through India</small>
  //     </span>
  //   </a>
  // )
}
