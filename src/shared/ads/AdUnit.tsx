import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// AdUnit — the SHARED brand-skinned affiliate ad renderer for the whole LV
// network. Generalised from laplandstays' PartnerStayAd (ads-project reference,
// Vesa 2026-07-06 spec: big real logo, "Mainos" chip bottom-right, sales-
// psychology copy, advertiser brand colours).
//
// ARCHITECTURE (2026-07-07): one advertiser = one spec module under
// shared/ads/advertisers/*.ts (config + copy). Pages import ONLY the specs they
// render, so 20+ advertisers never bloat a site's bundle:
//
//   import AdUnit from '../../../shared/ads/AdUnit'
//   import lomarengas from '../../../shared/ads/advertisers/lomarengas'
//   <AdUnit spec={lomarengas} sid="home_cabins" lang={lang} variant="dark"
//           onCtaClick={(k, s, u) => trackAffiliateClick(k, `ad_unit:${s}`, u)}
//           disclosure={<AffiliateDisclosure />} />
//
// Adding a new advertiser = one new spec file from _affiliate/affiliate-links.json
// (29 advertisers + logos ready) — no per-site ad components anymore.
//
// Design contract:
//   • Each ad adopts the ADVERTISER's own brand (real logo + accent colour) as a
//     clearly-labelled "Mainos / Ad" unit. Offers are EVERGREEN and accurate —
//     no time-limited promos hardcoded, no invented stats.
//   • variant="light"  → warm paper-white card (stays/christmas-style pages).
//     variant="dark"   → deep-night glass card (default LV dark sites).
//   • A spec's `copy` may cover only SOME languages (e.g. Finnish-only shops
//     like Matkapörssi carry just `fi`). If the active language has no copy and
//     the spec has no `en` fallback, AdUnit renders NOTHING — placements must
//     tolerate that (they do: the card simply doesn't appear on that locale).
//   • Shared code takes NO dependency on any site's i18n/analytics/lib code:
//     pass `lang` in, get clicks out via `onCtaClick`, slot the site's own
//     <AffiliateDisclosure/> in via `disclosure`.
//   • Logos ship per-site: copy the advertiser file from _affiliate/logos/ into
//     the site's public/images/partners/ (or override with `logoSrc`).
//   • Required affiliate attributes (LV spec): target="_blank"
//     rel="sponsored nofollow noopener" — NO noreferrer (Worker/CJ attribution
//     reads Referer).
//   • Do NOT place a lodging unit (`sembo`) on a page whose own CTAs already
//     route to the same lodging search, nor `klook` on a page monetised with
//     GetYourGuide — they cannibalise the site's own routing (Vesa 2026-07-06).
//     (The dropped lodging partner's spec was deleted in the 2026-07 CJ exit; lodging is now
//     Sembo for fi and Trip.com for other locales, resolved by the Worker.)
//   • EKTA insurance was REMOVED from the roster 2026-07-07 — their site is
//     broken (Vesa). Do not re-add without checking ektatraveling.com works.
// ─────────────────────────────────────────────────────────────────────────────

export type AdLang =
  | 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv'

export interface AdCopy {
  eyebrow: string
  headline: string
  sub: string
  trust: [string, string, string]
  cta: string
  poweredBy: string
  /** Secondary link label, e.g. "Lue lisää" — shown only when the placement
   *  passes `articleHref` (our own editorial page about the advertiser). */
  readMore?: string
  /** Alt text for the ad photo (only needed when the spec/placement sets one). */
  imageAlt?: string
}

export interface AdSpec {
  /** Stable analytics key, e.g. 'kiwitaxi' — passed to onCtaClick. */
  key: string
  brand: string
  /** Default logo path under the consuming site's public/. Optional: a category
   *  advertiser without a single brand logo (e.g. car rental) omits it and the
   *  unit renders the brand name as a wordmark instead. */
  logo?: string
  /** Dark-variant logo override (white/negative version), if the brand has one. */
  logoDark?: string
  /** Optional photo that brings the ad to life (Vesa 2026-07-25: "logon lisäksi
   *  pitää olla elävöittävä kuva"). Use a CLEAN photo, never a social creative
   *  with baked-in text — the text here is localized per locale. Paths differ per
   *  site, so a placement may override with the `imageSrc` prop. */
  image?: string
  /** Resolve the final tracking href for a given placement SID. Receives the
   *  active UI language too, so a partner with language versions on their own
   *  site can land the visitor on the matching one (e.g. Bear Kuusamo /fi/).
   *  Specs that don't care simply ignore the second argument. */
  linkFor: (sid: string, lang?: AdLang) => string
  accent: string
  accentDark: string
  icon: LucideIcon
  /** Languages present here decide where the ad shows; missing lang + no `en` → renders nothing. */
  copy: Partial<Record<AdLang, AdCopy>>
}

/** "Mainos / Ad" label — identical for every advertiser, so it lives here. */
const AD_LABEL: Record<AdLang, string> = {
  en: 'Ad', fi: 'Mainos', de: 'Anzeige', ja: '広告', es: 'Anuncio',
  'pt-BR': 'Anúncio', 'zh-CN': '广告', ko: '광고', fr: 'Annonce', it: 'Annuncio', nl: 'Advertentie',
  sv: 'Annons',
}

export interface AdUnitProps {
  spec: AdSpec
  /** snake_case GA4/attribution SID (+ Travelpayouts sub_id for TP partners). */
  sid: string
  /** Active UI language — pass from the site's own i18n. */
  lang: AdLang
  /** 'light' = warm paper-white card (stays-style); 'dark' = deep-night glass. */
  variant?: 'light' | 'dark'
  /** Site analytics hook, e.g. (key, sid, url) => trackAffiliateClick(key, sid, url). */
  onCtaClick?: (specKey: string, sid: string, href: string) => void
  /** Slot for the site's own <AffiliateDisclosure/>, rendered inside the card. */
  disclosure?: ReactNode
  /** Override the default /images/partners/… logo path. */
  logoSrc?: string
  /** Override the spec's photo path (image files live per-site under public/). */
  imageSrc?: string
  /** Internal href to OUR editorial page about this advertiser. When set (and the
   *  locale copy has `readMore`), a secondary text link renders next to the CTA so
   *  the reader can go deeper on our own site instead of bouncing straight out. */
  articleHref?: string
  /** Called when the secondary "read more" link is clicked. */
  onArticleClick?: (specKey: string, sid: string) => void
  className?: string
}

export default function AdUnit({
  spec,
  sid,
  lang,
  variant = 'light',
  onCtaClick,
  disclosure,
  logoSrc,
  imageSrc,
  articleHref,
  onArticleClick,
  className = '',
}: AdUnitProps) {
  const c = spec.copy[lang] ?? spec.copy.en
  if (!c) return null // e.g. a Finnish-only shop on a /ja page — show nothing

  const Icon = spec.icon
  const href = spec.linkFor(sid, lang)
  const dark = variant === 'dark'
  const logo = logoSrc ?? (dark && spec.logoDark ? spec.logoDark : spec.logo)
  const adLabel = AD_LABEL[lang] ?? AD_LABEL.en
  const photo = imageSrc ?? spec.image

  return (
    <section
      className={`relative overflow-hidden rounded-2xl ${
        dark ? 'border border-white/10 bg-white/[0.03]' : 'bg-white shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)]'
      } ${className}`}
      style={{ borderTop: `3px solid ${spec.accent}` }}
      aria-label={c.headline}
    >
      {/* Soft advertiser-accent wash, top-right, ties the card to their brand.
          🔴 Sizing/offsets are INLINE, not Tailwind: this file lives in shared/ and
          Tailwind does not reliably scan it from every consuming site (verified
          2026-07-25 — classes used only here, e.g. `-top-24`, never reached the
          built CSS on nature/activities/hub), which left the blob unsized. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          top: '-6rem', right: '-6rem', height: '16rem', width: '16rem',
          background: `radial-gradient(closest-side, ${spec.accent}${dark ? '2E' : '1F'}, transparent)`,
        }}
      />

      {/* Photo rail — a real image next to the copy, so a paid placement looks like
          an ad worth its price rather than a text box (Vesa 2026-07-25). Stacks
          above the copy on mobile, sits beside it from md up. Renders only when the
          spec/placement supplies a photo, so image-less advertisers are unchanged. */}
      <div className={photo ? 'relative md:grid md:grid-cols-[minmax(0,40%)_1fr] md:items-stretch' : 'relative'}>
        {photo && (
          <div className="relative h-52 sm:h-64 md:h-auto md:min-h-[19rem] overflow-hidden">
            <img
              src={photo}
              alt={c.imageAlt ?? spec.brand}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
      <div className="relative p-6 sm:p-8">
        {/* Header: icon badge + eyebrow left, BIG real partner logo right.
            🔴 MOBILE (Vesa 2026-07-26: "logo näkyy vain puoliksi"): side by side,
            a wide wordmark (`shrink-0`) plus a long uppercase eyebrow with
            tracking-[0.2em] needed ~370px of a ~295px row. Flex items default to
            `min-width:auto`, so the eyebrow could not shrink below its longest
            word and the overflow pushed the logo under the card's
            `overflow-hidden` edge — the paid partner's logo was clipped in half.
            Fix: below sm the logo takes its own line ABOVE the eyebrow
            (col-reverse = logo first, full prominence), and the left block gets
            `min-w-0` so the eyebrow wraps instead of forcing overflow. From sm up
            the original two-column header is unchanged. */}
        <div className="mb-4 flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${spec.accent}${dark ? '26' : '14'}`, boxShadow: `inset 0 0 0 1px ${spec.accent}${dark ? '59' : '33'}` }}
            >
              <Icon className="h-5 w-5" style={{ color: spec.accent }} aria-hidden="true" />
            </span>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: dark ? spec.accent : spec.accentDark }}
            >
              {c.eyebrow}
            </p>
          </div>
          {logo ? (
            <img
              src={logo}
              alt={spec.brand}
              width={260}
              height={80}
              loading="lazy"
              decoding="async"
              className={`h-12 sm:h-16 w-auto max-w-[220px] shrink-0 ${dark && !spec.logoDark ? 'rounded-lg bg-white/95 px-3 py-1.5' : ''}`}
            />
          ) : (
            // Category advertiser without a brand logo (e.g. car rental): show the
            // brand name as a wordmark so the header stays balanced, no fake logo.
            <span
              className="font-heading text-xl sm:text-2xl font-bold tracking-wide shrink-0"
              style={{ color: dark ? '#F9FAFB' : '#101828' }}
            >
              {spec.brand}
            </span>
          )}
        </div>

        {/* 🔴 TEXT COLOURS ARE INLINE ON PURPOSE (Vesa 2026-07-25). Tailwind does
            not reliably scan shared/ from the consuming sites, so `text-[#101828]`
            was never generated and the light-variant card rendered near-WHITE text
            on a WHITE card — the ad was unreadable on every site. Inline styles
            always win and need no build-time scanning. Do not "tidy" these back
            into Tailwind classes. */}
        <h3
          className="font-heading text-2xl sm:text-3xl tracking-wide leading-tight mb-3 max-w-2xl text-balance"
          style={{ color: dark ? '#F9FAFB' : '#101828' }}
        >
          {c.headline}
        </h3>
        <p
          className="text-sm sm:text-base leading-relaxed max-w-2xl"
          style={{ color: dark ? 'rgba(249,250,251,0.80)' : 'rgba(16,24,40,0.75)' }}
        >
          {c.sub}
        </p>

        {/* Trust points, advertiser-accent dots. */}
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
          {c.trust.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2 text-sm"
              style={{ color: dark ? 'rgba(249,250,251,0.85)' : 'rgba(16,24,40,0.80)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: spec.accent }} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={href}
            target="_blank"
            rel="sponsored nofollow noopener"
            onClick={() => onCtaClick?.(spec.key, sid, href)}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-white font-semibold no-underline shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            style={{ backgroundColor: spec.accent, boxShadow: `0 14px 30px -12px ${spec.accent}8C` }}
          >
            {c.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          {/* Secondary route: OUR editorial page about the advertiser. Keeps the
              reader on our site when they want depth instead of a booking, and
              gives the paid placement a second reason to be clicked. Internal
              link, so no rel/sponsored attributes here. */}
          {articleHref && c.readMore && (
            <a
              href={articleHref}
              onClick={() => onArticleClick?.(spec.key, sid)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: dark ? '#F9FAFB' : spec.accentDark, textDecorationColor: spec.accent }}
            >
              {c.readMore}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          <span
            className="uppercase"
            style={{
              fontSize: '11px', letterSpacing: '0.12em',
              color: dark ? 'rgba(249,250,251,0.60)' : 'rgba(16,24,40,0.45)',
            }}
          >
            {c.poweredBy}
          </span>
        </div>

        {disclosure ? <div className="mt-6">{disclosure}</div> : null}
      </div>
      </div>

      {/* Ad label — bottom-right corner (Vesa 2026-07-06). */}
      <span
        className="absolute bottom-3.5 right-4 z-10 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
        style={{
          background: `${spec.accent}${dark ? '2E' : '14'}`,
          color: dark ? spec.accent : spec.accentDark,
        }}
      >
        {adLabel}
      </span>
    </section>
  )
}
