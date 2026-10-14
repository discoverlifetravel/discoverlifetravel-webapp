import TourPage from './TourPage'
import Image from 'next/image'
import RouteMapCard from './tour/RouteMapCard'
import { desertMap } from './tour/RouteMap'
import { c, stops } from '@/data/desert'

export const DESERT_MAPS_URL = 'https://www.google.com/maps/dir/Delhi/Bikaner,+Rajasthan/Nagaur,+Rajasthan/Jodhpur,+Rajasthan/Udaipur,+Rajasthan/Pushkar,+Rajasthan/Jaipur,+Rajasthan'

export default function DesertOdysseyTour() {
  return (
    <TourPage
      c={c}
      stops={stops}
      hero={<Image src="/images/hero-desert.svg" alt="Illustration of a camel caravan crossing the Thar Desert at sunset, with a fort on the horizon" width={1600} height={480} priority unoptimized sizes="100vw" />}
      h1={<><span>Desert <i>Odyssey</i> Tour</span> <em>Rajasthan India</em></>}
      map={<RouteMapCard c={c} map={desertMap} uid="rmd" mapsUrl={DESERT_MAPS_URL} />}
      arts={{
        leader: { scene: 'hotel', label: 'Illustration of a heritage hotel archway' },
        secrets: [
          { scene: 'cooking', label: 'Illustration of spices and a cooking pot' },
          { scene: 'bikaner', label: 'Illustration of a camel and the fort at Bikaner' },
          { scene: 'udaipur', label: 'Illustration of the white palace on Lake Pichola, Udaipur' },
        ],
      }}
    />
  )
}
