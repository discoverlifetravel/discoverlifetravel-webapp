/** Shape shared by every tour page's content file (southIndia.ts, desert.ts, ...). */
export type TourContent = {
  readonly brand: string; readonly title: string; readonly tagline: string; readonly length: string
  readonly route: readonly string[]; readonly extension: string; readonly heading: string; readonly intro: string
  readonly departure: string; readonly dates: string; readonly instal?: string; readonly tempH?: string
  readonly incH: string; readonly inc: readonly string[]; readonly notH: string; readonly notP: string; readonly not_: readonly string[]
  readonly optH: string; readonly opt: string; readonly leadH: string; readonly leadP: string; readonly realH: string; readonly quote1: string
  readonly secH: string; readonly sec: readonly string[]; readonly bookH: string; readonly book: readonly string[]; readonly note: string
  readonly whyH: string; readonly why: readonly string[]; readonly quote2: string; readonly greatH: string; readonly greatP: string
  readonly lifeH: string; readonly life: readonly string[]; readonly seekH: string; readonly seekP: string
  readonly himH: string; readonly him: readonly string[]; readonly privH: string; readonly privP: string
  readonly stepH: string; readonly stepP: string; readonly links: readonly string[]
}
