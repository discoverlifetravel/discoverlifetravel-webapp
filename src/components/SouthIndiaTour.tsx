import Image from 'next/image'
import Reveal from './Reveal'
import TourPage from './TourPage'
import RouteMapCard, { SOUTH_MAPS_URL } from './tour/RouteMapCard'
import { southMap } from './tour/RouteMap'
import { c, stops } from '@/data/southIndia'

export default function SouthIndiaTour() {
  return (
    <TourPage
      c={c}
      stops={stops}
      hero={<Image src="/images/hero.jpg" alt="A traveller relaxing on a Kerala backwaters houseboat" width={1824} height={747} priority sizes="100vw" />}
      h1={<><span>Spirit <i>of</i></span> <em>Southern India</em> Tour</>}
      map={<RouteMapCard c={c} map={southMap} uid="rms" mapsUrl={SOUTH_MAPS_URL} />}
      climate={
        <Reveal variant="zoom" className="x-graph">
          <div className="x-gscroll" tabIndex={0} role="group" aria-label="Seasonal temperature table, scroll sideways on small screens">
            <Image src="/images/temperature.png" alt="Climate graph spirit of south india" width={1600} height={532} sizes="(max-width: 1100px) 100vw, 800px" />
          </div>
        </Reveal>
      }
      arts={{
        leader: { scene: 'hotel', label: 'Illustration of a heritage hotel archway' },
        secrets: [
          { scene: 'cooking', label: 'Illustration of spices and a cooking pot' },
          { scene: 'safari', label: 'Illustration of a jeep safari at sunset' },
          { scene: 'ooty', label: 'Illustration of tea hills and a misty lake' },
        ],
      }}
    />
  )
}
