// EVERY partner link routes through go.laplandvibes.com. No exceptions, no raw
// partner hosts in source. Spec: "LaplandVibes Affiliate System — Developer
// Handoff" (2026-04-25).
//
// 🔴 This file used to bypass the Worker for activities, citing
// bug_go_lv_worker_gyg_dropped.md (2026-05-02: `/go/activities/<slug>` collapsed
// every slug to the GYG homepage). That bug is FIXED — `handleGyg` forwards the
// whole multi-segment path, verified live 2026-08-22:
//   /go/activities/rovaniemi-l2653/the-santa-claus-village-visit-t434430
//     -> https://www.getyourguide.com/rovaniemi-l2653/the-santa-claus-village-visit-t434430/
// The network re-routed its GYG links through the Worker on 2026-08-01 for the
// click log; laplandnature was the one site never migrated, which is why the
// 2026-08-21 deploy gate stopped here.
//
// 🔴 Do NOT reintroduce per-locale GYG hosts (getyourguide.de/.fr/.es/…) or pass
// `?language=` on to GetYourGuide. Measured in a real browser 2026-08-02:
// `?language=xx` does NOTHING there — GYG localises by a `<lang>-<country>/`
// PATH PREFIX. `language=` here is read by the WORKER, which turns it into that
// prefix (language=fi -> /fi-fi/lappi-suomi-l2652/). Same contract as
// shared/gyg/picks.ts.

const REDIRECT_BASE = 'https://go.laplandvibes.com'
// No GYG_PARTNER_ID / SITE_ID here on purpose. The Worker owns the partner id
// (env.GYG_PARTNER_ID) and derives `cmp=lv_<domain>_<sid>` from the Referer, so
// a re-issued id is one Worker deploy instead of 27 site deploys.

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

// GetYourGuide's own language codes, handed to the WORKER as `language=`.
// `en` is GYG's default and needs no parameter. Keep in sync with
// shared/gyg/picks.ts — the Worker maps these to the `<lang>-<country>/` prefix.
const GYG_LANGUAGE: Partial<Record<Lang, string>> = {
  fi: "fi",
  de: "de",
  ja: "ja",
  es: "es",
  "pt-BR": "pt-br",
  "zh-CN": "zh",
  ko: "ko",
  fr: "fr",
  it: "it",
  nl: "nl",
  sv: "sv",
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
  // ─── Activities (GetYourGuide) via the Worker ─────────────────────────
  // The slug goes in the PATH so the Worker can log which activity converted
  // (D1 `slug` column, Command Center per-activity breakdown); a direct link
  // would be invisible to our own click count. `partner_id` + `cmp` are added
  // by the Worker from env + Referer, so the ID lives in exactly one place.
  if (partner === "activities") {
    const path = (destination ?? "").replace(/^\/+/, "").replace(/\/+$/, "");
    const params = new URLSearchParams();
    params.set("sid", sid);
    const gygLang = GYG_LANGUAGE[lang];
    if (gygLang) params.set("language", gygLang);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null && v !== "") {
          params.set(k, String(v));
        }
      }
    }
    return `${REDIRECT_BASE}/go/activities${path ? `/${path}` : ""}?${params.toString()}`;
  }

  // ─── Hotels / Cars via Worker ─────────────────────────────────────────
  const params = new URLSearchParams();
  params.set("sid", sid);

  if (destination) {
    // 🔴 cars käyttää pickup_location=IATA, EI ss:ää — ss=IATA valuu EB:n
    // ?location=-tekstihakuun, jonka EB pudottaa tyhjäksi etusivuksi (3.8.2026).
    if (partner === "cars") params.set('pickup_location', destination);
    else params.set('ss', anchorHotelsSs(partner, destination));
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
// — the lodging partner falls back to user geo when given "Lapland, Finland" alone.
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

// [2026-08-22] gygSearchUrl() removed. It hardcoded a raw getyourguide.com/s/ URL
// — a raw partner host, which the deploy smoke gate rejects — and it had zero
// call sites. If a place-contextual search CTA is ever needed, pass the query to
// the Worker instead: `/go/activities?sid=<sid>&q=<Plain ASCII place>`, which it
// resolves to `/<locale>/s?q=…` with partner_id + cmp attached.

// ─── EconomyBookings (cars) — wilderness routes need a car ──────────────────
export const CARS = (_lang: Lang = "en") => ({
  fromRovaniemi: buildAffiliateUrl({ partner: 'cars', sid: 'cars_rovaniemi', query: { pickup_location: 'RVN' } }),
  fromIvalo: buildAffiliateUrl({ partner: 'cars', sid: 'cars_ivalo', query: { pickup_location: 'IVL' } }),
  fromKittila: buildAffiliateUrl({ partner: 'cars', sid: 'cars_kittila', query: { pickup_location: 'KTT' } }),
})

/**
 * Anchor any hotels search to Finnish Lapland. A bare "Lapland"/"Levi"/etc.
 * makes the lodging partner geocode to *Lapland, Indiana, USA* — a real revenue/trust
 * bug (Vesa 2026-07-08). Force ", Finland" onto every hotels query that does
 * not already name the country; leave cars/activities queries untouched.
 */
function anchorHotelsSs(partner: string, destination: string): string {
  const isHotels = partner === "hotels" || partner === "hotels-seasonal" || partner === "hotels-budget";
  if (!isHotels) return destination;
  return /finland|suomi/i.test(destination) ? destination : `${destination.replace(/[\s,]+$/, "")}, Finland`;
}
