// Hotels + cars route through go.laplandvibes.com (CJ Referer-based attribution).
// Activities (GYG) bypass the Worker because of a known bug that collapses every
// `/go/activities/<slug>` to the GYG homepage (lv memory: bug_go_lv_worker_gyg_dropped.md,
// 2026-05-02). For GYG we build the direct deep link with partner_id + cmp baked
// into the query string — same affiliate attribution, correct landing page.
// Spec: "LaplandVibes Affiliate System — Developer Handoff" (2026-04-25).

const REDIRECT_BASE = 'https://go.laplandvibes.com'
const GYG_PARTNER_ID = 'VRMKD7N'
const SITE_ID = 'laplandnature'

export type Partner =
  | 'hotels'
  | 'hotels-seasonal'
  | 'hotels-budget'
  | 'cars'
  | 'activities'


export type Lang = "en" | "fi" | "de" | "ja" | "es" | "pt-BR" | "zh-CN" | "ko" | "fr" | "it" | "nl" | "sv";

const HOTELS_LOCALE: Record<Lang, string> = {
  en: "en_US",
  fi: "fi_FI",
  de: "de_DE",
  ja: "ja_JP",
  es: "es_ES",
  "pt-BR": "pt_BR",
  "zh-CN": "zh_CN",
  ko: "ko_KR",
  fr: "fr_FR",
  it: "it_IT",
  nl: "nl_NL",
  sv: "sv_SE",
};

const CARS_LANG: Record<Lang, string> = {
  en: "en",
  fi: "fi",
  de: "de",
  ja: "ja",
  es: "es",
  "pt-BR": "pt",
  "zh-CN": "zh",
  ko: "ko",
  fr: "fr",
  it: "it",
  nl: "nl",
  sv: "sv",
};

const GYG_DOMAIN: Record<Lang, string> = {
  en: "https://www.getyourguide.com",
  // GYG has no .fi — fallback to .com + ?language=fi.
  fi: "https://www.getyourguide.com",
  de: "https://www.getyourguide.de",
  ja: "https://www.getyourguide.com",
  es: "https://www.getyourguide.es",
  "pt-BR": "https://www.getyourguide.com.br",
  "zh-CN": "https://www.getyourguide.com",
  ko: "https://www.getyourguide.com",
  fr: "https://www.getyourguide.fr",
  it: "https://www.getyourguide.it",
  nl: "https://www.getyourguide.nl",
  // GYG has no dedicated .se — fallback to .com + ?language=sv.
  sv: "https://www.getyourguide.com",
};

export interface BuildAffiliateOptions {
  partner: Partner
  sid: string
  /** Hotels: property/city query (?ss=). Activities: GYG slug (e.g. `rovaniemi-l2653`). */
  destination?: string
  /** Any additional query params (checkin, pickup_date, adults, etc). */
  query?: Record<string, string | number | undefined>
  /** Active site language; defaults to "en" for backwards compat. */
  lang?: Lang;
}

export function buildAffiliateUrl({
  partner,
  sid,
  destination,
  query,
  lang = "en",
}: BuildAffiliateOptions): string {
  // ─── GYG direct deep-link (Worker-bypass) ─────────────────────────────
  if (partner === "activities") {
    const base = GYG_DOMAIN[lang];
    const path = (destination ?? "").replace(/^\/+/, "").replace(/\/+$/, "");
    const url = new URL(path ? `${base}/${path}/` : `${base}/`);
    url.searchParams.set("partner_id", GYG_PARTNER_ID);
    url.searchParams.set("cmp", `lv_${SITE_ID}_${sid}`);
    if (lang === "fi") url.searchParams.set("language", "fi");
    if (lang === "ja") url.searchParams.set("language", "ja");
    if (lang === "es") url.searchParams.set("language", "es");
    if (lang === "pt-BR") url.searchParams.set("language", "pt");
    if (lang === "zh-CN") url.searchParams.set("language", "zh");
    if (lang === "ko") url.searchParams.set("language", "ko");
    if (lang === "it") url.searchParams.set("language", "it");
    if (lang === "nl") url.searchParams.set("language", "nl");
    if (lang === "sv") url.searchParams.set("language", "sv");
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null && v !== "") {
          url.searchParams.set(k, String(v));
        }
      }
    }
    return url.toString();
  }

  // ─── Hotels / Cars via Worker ─────────────────────────────────────────
  const params = new URLSearchParams();
  params.set("sid", sid);

  if (destination) {
    params.set('ss', anchorHotelsSs(partner, destination));
  }

  if (partner === "hotels" || partner === "hotels-seasonal" || partner === "hotels-budget") {
    params.set("locale", HOTELS_LOCALE[lang]);
  } else if (partner === "cars") {
    params.set("lang", CARS_LANG[lang]);
  }

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== "") {
        params.set(k, String(v));
      }
    }
  }

  return `${REDIRECT_BASE}/go/${partner}?${params.toString()}`;
}
// ─── Hotel destinations ──────────────────────────────────────────────────────
// Pin generic "Lapland" CTAs to Rovaniemi (regional capital, deepest inventory)
// — Hotels.com falls back to user geo when given "Lapland, Finland" alone.
export const HOTELS = (lang: Lang = "en") => ({
  navBookNow: buildAffiliateUrl({ partner: 'hotels', sid: 'nav_book_now', destination: 'Rovaniemi, Finland', lang }),
  heroCta: buildAffiliateUrl({ partner: 'hotels', sid: 'hero_cta', destination: 'Rovaniemi, Finland', lang }),

  // Aurora viewing spots — anchor cities in NorthernLights pillar.
  inari: buildAffiliateUrl({ partner: 'hotels', sid: 'aurora_spot_inari', destination: 'Inari, Finland', lang }),
  utsjoki: buildAffiliateUrl({ partner: 'hotels', sid: 'aurora_spot_utsjoki', destination: 'Utsjoki, Finland', lang }),
  kilpisjarvi: buildAffiliateUrl({ partner: 'hotels', sid: 'aurora_spot_kilpisjarvi', destination: 'Kilpisjärvi, Finland', lang }),
  enontekio: buildAffiliateUrl({ partner: 'hotels', sid: 'aurora_spot_enontekio', destination: 'Enontekiö, Finland', lang }),

  // National-park gateway villages — used in NationalParks pillar.
  saariselka: buildAffiliateUrl({ partner: 'hotels', sid: 'park_gateway_saariselka', destination: 'Saariselkä, Finland', lang }),
  muonio: buildAffiliateUrl({ partner: 'hotels', sid: 'park_gateway_muonio', destination: 'Muonio, Finland', lang }),
  posio: buildAffiliateUrl({ partner: 'hotels', sid: 'park_gateway_posio', destination: 'Posio, Finland', lang }),
  pyhaLuosto: buildAffiliateUrl({ partner: 'hotels', sid: 'park_gateway_pyha_luosto', destination: 'Pyhä, Finland', lang }),

  // Trailheads — used in HikingTrails pillar.
  hetta: buildAffiliateUrl({ partner: 'hotels', sid: 'trailhead_hetta', destination: 'Hetta, Finland', lang }),
  oulanka: buildAffiliateUrl({ partner: 'hotels', sid: 'trailhead_oulanka', destination: 'Ruka, Finland', lang }),
})

// ─── GetYourGuide activity slugs ─────────────────────────────────────────────
// Slug format: `<city>-l<location-id>` from a real GYG URL.
// Use destination cards on aurora hunts, wilderness tours, gold panning etc.
export const ACTIVITIES = (_lang: Lang = "en") => ({
  rovaniemi: 'rovaniemi-l2653',
  saariselka: 'saariselka-l181615',
  inari: 'inari-municipality-l164594',
  levi: 'levi-sirkka-l150197',
  yllas: 'yllas-l87669',
})

export function activityUrl(citySlug: string, sid: string): string {
  return buildAffiliateUrl({ partner: 'activities', sid, destination: citySlug })
}

// ─── GYG search deep-link (place-contextual, resolves to a real results page) ────────
// premium_design_standard §6: booking CTAs must point at a GYG page that RESOLVES (200),
// never a 404. The Worker's /go/activities bug collapses slugs, so we hit GYG directly.
// A `/s/?q=<place>` search resolves to live results for that town (verified 200 for
// Rovaniemi, Saariselka, Inari, Kuusamo, Levi, Yllas). Use PLAIN-ASCII place names — an
// ä in the query is intermittently bot-blocked (403), ASCII is reliable.
//   gygSearchUrl('Saariselka', 'aurora_tour_saariselka')
//   → https://www.getyourguide.com/s/?q=Saariselka&partner_id=VRMKD7N&cmp=lv_laplandnature_aurora_tour_saariselka
export function gygSearchUrl(place: string, sid: string, lang: Lang = 'en'): string {
  const base = GYG_DOMAIN[lang]
  const url = new URL(`${base}/s/`)
  url.searchParams.set('q', place)
  url.searchParams.set('partner_id', GYG_PARTNER_ID)
  url.searchParams.set('cmp', `lv_${SITE_ID}_${sid}`)
  const langParam: Partial<Record<Lang, string>> = {
    fi: 'fi', ja: 'ja', es: 'es', 'pt-BR': 'pt', 'zh-CN': 'zh', ko: 'ko', it: 'it', nl: 'nl', sv: 'sv',
  }
  if (langParam[lang]) url.searchParams.set('language', langParam[lang] as string)
  return url.toString()
}

// ─── EconomyBookings (cars) — wilderness routes need a car ──────────────────
export const CARS = (_lang: Lang = "en") => ({
  fromRovaniemi: buildAffiliateUrl({ partner: 'cars', sid: 'cars_rovaniemi', query: { pickup_location: 'RVN' } }),
  fromIvalo: buildAffiliateUrl({ partner: 'cars', sid: 'cars_ivalo', query: { pickup_location: 'IVL' } }),
  fromKittila: buildAffiliateUrl({ partner: 'cars', sid: 'cars_kittila', query: { pickup_location: 'KTT' } }),
})

/**
 * Anchor any hotels search to Finnish Lapland. A bare "Lapland"/"Levi"/etc.
 * makes Hotels.com geocode to *Lapland, Indiana, USA* — a real revenue/trust
 * bug (Vesa 2026-07-08). Force ", Finland" onto every hotels query that does
 * not already name the country; leave cars/activities queries untouched.
 */
function anchorHotelsSs(partner: string, destination: string): string {
  const isHotels = partner === "hotels" || partner === "hotels-seasonal" || partner === "hotels-budget";
  if (!isHotels) return destination;
  return /finland|suomi/i.test(destination) ? destination : `${destination.replace(/[\s,]+$/, "")}, Finland`;
}
