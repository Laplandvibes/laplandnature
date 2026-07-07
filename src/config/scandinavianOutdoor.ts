// Scandinavian Outdoor (Adtraction) affiliate link builder — Nordic outdoor
// retailer, "Outdoor expert since 1970", 100% Finnish-owned (Turku).
//
// Source of truth: _affiliate/affiliate-links.json → "Scandinavian Outdoor"
// (programId 1119705540, channel laplandvibes.com as=2086870803, commission 7%/sale,
// cookie 30d). Target pages: "what-to-pack / laplandnature / skiresorts / activities
// / laplandgifts".
//
// Offer / compliance (affiliate_ad_creative_process, checked live 2026-06-26):
//   • International audience gate (§1): the global English store scandinavianoutdoor.com
//     ships across the EU — "Free delivery for orders over 250 € inside the EU with UPS"
//     — so this is SAFE for the 11-language audience (not a Finland-only shop). The
//     EU-wide free-delivery threshold is an EVERGREEN, always-true hook (not a
//     time-limited %), so it is safe to feature.
//   • They run seasonal sales too, but per §3 we do NOT hardcode any sale-% (would go
//     stale). The ad leans on evergreen facts: since 1970, EU delivery (free over €250),
//     real outdoor brands (Fjällräven, Haglöfs, Rab, Salomon, Lowa…).
//
// Adtraction tracking URL is COMPLETE + PUBLIC (carries our channel via as=2086870803),
// attribution handled by Adtraction — NOT routed through go.laplandvibes.com. Per-
// placement tracking via Adtraction's `epi` sub-id (snake_case SID).
//
// Required affiliate <a> attributes (LV spec):
//   target="_blank" rel="sponsored nofollow noopener"   — NO `noreferrer`.

const SCANDINAVIAN_OUTDOOR_TRACKING_URL =
  'https://to.scandinavianoutdoor.fi/t/t?a=1119705543&as=2086870803&t=2&tk=1'

/**
 * Build the Scandinavian Outdoor Adtraction link for a given placement.
 *   scandinavianOutdoorLink('seasons_what_to_pack')
 *   → https://to.scandinavianoutdoor.fi/t/t?a=...&epi=seasons_what_to_pack
 */
export function scandinavianOutdoorLink(sid = 'laplandnature'): string {
  const sep = SCANDINAVIAN_OUTDOOR_TRACKING_URL.includes('?') ? '&' : '?'
  return `${SCANDINAVIAN_OUTDOOR_TRACKING_URL}${sep}epi=${encodeURIComponent(sid)}`
}

export const SCANDINAVIAN_OUTDOOR = {
  /** Advertiser slug used as the analytics `partner` label. */
  slug: 'scandinavian_outdoor',
  /** Real, official maroon wordmark (Adtraction advertiser media, transparent PNG). */
  logo: '/images/partners/scandinavian-outdoor.png',
  /** Adtraction program id (for reference / audits). */
  programId: 1119705540,
} as const
