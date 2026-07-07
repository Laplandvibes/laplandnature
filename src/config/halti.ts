// Halti (Adtraction) affiliate link builder — Finnish outdoor brand (since 1976).
//
// Source of truth: _affiliate/affiliate-links.json → "Halti" (programId 1622199570,
// channel laplandvibes.com as=2086870803, commission 7.7%/sale, cookie 30d, feed=true).
// Target pages for this site: "what-to-pack / laplandnature / skiresorts / laplandgifts".
//
// Program-terms check (mirrors laplandkids/src/config/halti.ts, 2026-06-26):
//   couponMarketing = 1  → featuring Halti's public discount IS permitted, BUT we do
//                          NOT hardcode any sale-% / time-limited promo (goes stale =
//                          fake data, brand "never stale" rule + affiliate_ad_creative
//                          _process §3). We lean on EVERGREEN, always-true brand facts
//                          (Finnish brand since 1976, DrymaxX waterproofing, built for
//                          real arctic weather). Halti's own .com store ships
//                          internationally (English), so it is safe for the global,
//                          11-language audience of this site.
//
// The Adtraction tracking URL is COMPLETE + PUBLIC (carries our channel via
// as=2086870803). Adtraction handles attribution itself — this does NOT route through
// go.laplandvibes.com (that Worker is CJ-only). Per-placement tracking via Adtraction's
// `epi` sub-id (snake_case SID).
//
// Required affiliate <a> attributes (LV spec):
//   target="_blank" rel="sponsored nofollow noopener"   — NO `noreferrer`.

const HALTI_TRACKING_URL =
  'https://to.halti.fi/t/t?a=1622199573&as=2086870803&t=2&tk=1'

/**
 * Build the Halti Adtraction link for a given placement.
 *   haltiLink('hiking_trail_gear')
 *   → https://to.halti.fi/t/t?a=...&epi=hiking_trail_gear
 */
export function haltiLink(sid = 'laplandnature'): string {
  const sep = HALTI_TRACKING_URL.includes('?') ? '&' : '?'
  return `${HALTI_TRACKING_URL}${sep}epi=${encodeURIComponent(sid)}`
}

export const HALTI = {
  /** Advertiser slug used as the analytics `partner` label. */
  slug: 'halti',
  /** Real, official black wordmark (Adtraction advertiser media, transparent PNG). */
  logo: '/images/partners/halti.png',
  /** Adtraction program id (for reference / audits). */
  programId: 1622199570,
} as const
