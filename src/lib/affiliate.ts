// All affiliate CTAs route through go.laplandvibes.com — never raw partner URLs.
// Worker resolves per-site CJ Website ID from Referer (laplandnature.com -> resolved server-side).
// Spec: "LaplandVibes Affiliate System — Developer Handoff" (2026-04-25).

const REDIRECT_BASE = 'https://go.laplandvibes.com'

export type Partner =
  | 'hotels'
  | 'hotels-seasonal'
  | 'hotels-budget'
  | 'cars'
  | 'activities'

export interface BuildAffiliateOptions {
  partner: Partner
  sid: string
  /** Hotels: property/city query (?ss=). Activities: GYG slug (e.g. `rovaniemi-l2653`). */
  destination?: string
  /** Any additional query params (checkin, pickup_date, adults, etc). */
  query?: Record<string, string | number | undefined>
}

export function buildAffiliateUrl({
  partner,
  sid,
  destination,
  query,
}: BuildAffiliateOptions): string {
  const params = new URLSearchParams()
  params.set('sid', sid)

  if (destination && partner !== 'activities') {
    params.set('ss', destination)
  }

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== '') {
        params.set(k, String(v))
      }
    }
  }

  let pathname = `/go/${partner}`
  if (partner === 'activities' && destination) {
    pathname = `/go/activities/${destination}`
  }

  return `${REDIRECT_BASE}${pathname}?${params.toString()}`
}

// ─── Hotel destinations ──────────────────────────────────────────────────────
// Pin generic "Lapland" CTAs to Rovaniemi (regional capital, deepest inventory)
// — Hotels.com falls back to user geo when given "Lapland, Finland" alone.
export const HOTELS = {
  navBookNow: buildAffiliateUrl({ partner: 'hotels', sid: 'nav_book_now', destination: 'Rovaniemi, Finland' }),
  heroCta: buildAffiliateUrl({ partner: 'hotels', sid: 'hero_cta', destination: 'Rovaniemi, Finland' }),

  // Aurora viewing spots — anchor cities in NorthernLights pillar.
  inari: buildAffiliateUrl({ partner: 'hotels', sid: 'aurora_spot_inari', destination: 'Inari, Finland' }),
  utsjoki: buildAffiliateUrl({ partner: 'hotels', sid: 'aurora_spot_utsjoki', destination: 'Utsjoki, Finland' }),
  kilpisjarvi: buildAffiliateUrl({ partner: 'hotels', sid: 'aurora_spot_kilpisjarvi', destination: 'Kilpisjärvi, Finland' }),
  enontekio: buildAffiliateUrl({ partner: 'hotels', sid: 'aurora_spot_enontekio', destination: 'Enontekiö, Finland' }),

  // National-park gateway villages — used in NationalParks pillar.
  saariselka: buildAffiliateUrl({ partner: 'hotels', sid: 'park_gateway_saariselka', destination: 'Saariselkä, Finland' }),
  muonio: buildAffiliateUrl({ partner: 'hotels', sid: 'park_gateway_muonio', destination: 'Muonio, Finland' }),
  posio: buildAffiliateUrl({ partner: 'hotels', sid: 'park_gateway_posio', destination: 'Posio, Finland' }),
  pyhaLuosto: buildAffiliateUrl({ partner: 'hotels', sid: 'park_gateway_pyha_luosto', destination: 'Pyhä, Finland' }),

  // Trailheads — used in HikingTrails pillar.
  hetta: buildAffiliateUrl({ partner: 'hotels', sid: 'trailhead_hetta', destination: 'Hetta, Finland' }),
  oulanka: buildAffiliateUrl({ partner: 'hotels', sid: 'trailhead_oulanka', destination: 'Ruka, Finland' }),
}

// ─── GetYourGuide activity slugs ─────────────────────────────────────────────
// Slug format: `<city>-l<location-id>` from a real GYG URL.
// Use destination cards on aurora hunts, wilderness tours, gold panning etc.
export const ACTIVITIES = {
  rovaniemi: 'rovaniemi-l2653',
  saariselka: 'saariselka-l30432',
  inari: 'inari-l99920',
  levi: 'levi-l2655',
  yllas: 'yllas-l2656',
}

export function activityUrl(citySlug: string, sid: string): string {
  return buildAffiliateUrl({ partner: 'activities', sid, destination: citySlug })
}

// ─── EconomyBookings (cars) — wilderness routes need a car ──────────────────
export const CARS = {
  fromRovaniemi: buildAffiliateUrl({ partner: 'cars', sid: 'cars_rovaniemi', query: { pickup_location: 'RVN' } }),
  fromIvalo: buildAffiliateUrl({ partner: 'cars', sid: 'cars_ivalo', query: { pickup_location: 'IVL' } }),
  fromKittila: buildAffiliateUrl({ partner: 'cars', sid: 'cars_kittila', query: { pickup_location: 'KTT' } }),
}
