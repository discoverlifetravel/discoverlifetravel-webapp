import Reveal from '../Reveal'
import RouteMap, { type MapCfg } from './RouteMap'
import type { TourContent } from '@/data/tourTypes'

export const SOUTH_MAPS_URL = 'https://www.google.com/maps/dir/Bengaluru,+Karnataka/Mysuru/Ooty,+Tamil+Nadu/Coimbatore/Kodaikanal/Madurai/Munnar,+Kerala/Kochi/Alappuzha'

export default function RouteMapCard({ c, map, uid, mapsUrl, list = true }: { c: TourContent; map: MapCfg; uid: string; mapsUrl: string; list?: boolean }) {
  return (
    <Reveal variant="zoom" className={`rmap${list ? '' : ' nolist'}`}>
      <div className="rm-box" style={{ background: map.bg }}><RouteMap map={map} uid={uid} label={`Route map: ${c.route.join(', ')}`} /></div>
      <div className="rm-side">
        {list && <ol>{c.route.map((r) => <li key={r}>{r}</li>)}</ol>}
        <p className="rm-note">Illustrative route map</p>
        <a className="btn line" href={mapsUrl} target="_blank" rel="noopener noreferrer">View route in Google Maps &rarr;</a>
      </div>
    </Reveal>
  )
}
