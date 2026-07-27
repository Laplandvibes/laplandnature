import { Link } from 'react-router-dom'
import { ArrowRight, Sunset, Moon, MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import HeroImage from '../components/HeroImage'
import HubLink from '../components/HubLink'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import { trackPartnerClick } from '../lib/analytics'

// Bear Kuusamo brand green — used only as a restrained accent (partnership
// label + indicator dot), never as body-text colour.
const BEAR_GREEN = '#007E2E'
const BEAR_URL = 'https://bearkuusamo.com'

// EVERY outbound Bear link carries campaign UTM, including the two SEO keyword
// anchors. Those two used to be deliberately UTM-free ("clean backlink"), which
// meant Bear Kuusamo had no way to see in their own analytics that a visitor came
// from the article — the single thing they are paying for (Vesa 2026-07-27).
// A query string does not cost link equity: bearkuusamo.com canonicalises to the
// clean URL, so the dofollow backlink is unaffected and both sides get attribution.
// `utm_content` = the sid, so the June 2027 referral report shows WHICH surface
// (intro anchor, where anchor, CTA, logo) actually drove the visit.
const bearUrl = (sid: string) =>
  `${BEAR_URL}/?utm_source=laplandnature&utm_medium=partner&utm_campaign=bear-kuusamo-2026&utm_content=${sid}`

// The two paid SEO keyword anchors stay in ENGLISH in every locale — they are
// the purchased anchor texts and must not be translated.
const ANCHOR_WATCHING = 'bear watching in Finland'
const ANCHOR_TOUR = 'bear tour in Finland'

// Direct partner links: normal follow, target=_blank rel=noopener only.
// NO nofollow, NO sponsored, NO noreferrer (business decision, Vesa 2026-07-24).
const bearLinkClass =
  'text-vibe-pink underline decoration-vibe-pink/40 underline-offset-2 hover:text-pink-600 hover:decoration-pink-600 transition-colors'

const BK_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Bear Kuusamo: bear watching in Finland, on the edge of Lapland',
  description:
    'Bear Kuusamo runs the oldest and northernmost bear hides in the Ruka–Kuusamo region: ethical bear watching in Finland, on the edge of Lapland, from 1 May to 30 September.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-07-24',
  dateModified: '2026-07-24',
  mainEntityOfPage: 'https://laplandnature.com/bear-kuusamo',
  image: 'https://laplandnature.com/images/hero-bear-kuusamo.webp',
}

export default function BearKuusamo() {
  const lang = useLang()
  const c = COPY[lang].bearKuusamo
  const to = useLocalePath()

  const PartnershipLabel = () => (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
      style={{
        color: BEAR_GREEN,
        backgroundColor: 'rgba(0,126,46,0.08)',
        border: '1px solid rgba(0,126,46,0.28)',
      }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BEAR_GREEN }} />
      {c.partnership}
    </span>
  )

  const tourIcons = [Sunset, Moon]

  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath="/bear-kuusamo"
        ogImage="https://laplandnature.com/images/hero-bear-kuusamo.webp"
        keywords={['bear watching in Finland', 'bear tour in Finland', 'Bear Kuusamo', 'brown bear hide Kuusamo', 'bear watching Ruka', 'ethical bear watching Finland']}
        jsonLd={BK_JSONLD}
      />

      <HeroImage
        image="hero-bear-kuusamo.webp"
        priority
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
        overlay="feature"
        align="top"
        objectPosition="center 80%"
      />

      {/* Intro + disclosure */}
      <section className="pt-12 sm:pt-16 pb-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <PartnershipLabel />
          </div>
          <div className="max-w-none text-deep-night/80 leading-relaxed space-y-5">
            {/* Lead paragraph — larger, so the feature has a clear opening beat
                under the photo. */}
            <p className="text-xl sm:text-2xl font-light text-deep-night/90 leading-snug">
              {c.intro}
            </p>
            <p className="text-base sm:text-lg">
              {c.introLinkBefore}
              <a
                href={bearUrl('intro_keyword')}
                target="_blank"
                rel="noopener"
                className={bearLinkClass}
                onClick={() => trackPartnerClick('intro_keyword')}
              >
                {ANCHOR_WATCHING}
              </a>
              {c.introLinkAfter}
            </p>
          </div>
        </div>
      </section>

      {/* A night in a hide + tree photo */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-snow">
        <div className="max-w-3xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.hideKicker}</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-5">
            {c.hideH2}
          </h2>
          <div className="prose prose-deep-night max-w-none text-deep-night/80 leading-relaxed space-y-4">
            {c.hideBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <figure className="mt-9">
            <div className="rounded-2xl overflow-hidden border border-deep-night/10">
              <img
                src="/images/bear-kuusamo-tree.webp"
                alt={`${c.treeCaption} ${c.photoCredit}`}
                loading="lazy"
                decoding="async"
                width={1200}
                height={819}
                className="w-full h-auto object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-deep-night/60 leading-relaxed">
              {c.treeCaption} <span className="text-deep-night/45">{c.photoCredit}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Two ways to go */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.waysKicker}</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-8">
            {c.waysH2}
          </h2>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-10">
            {c.ways.map((w, i) => {
              const Icon = tourIcons[i] ?? Sunset
              return (
                <article
                  key={w.title}
                  className="rounded-2xl border border-deep-night/10 bg-snow p-6 sm:p-7 hover:border-aurora-green/40 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-aurora-green/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-aurora-green" />
                  </div>
                  <h3 className="font-heading text-2xl text-deep-night tracking-wide mb-2 leading-tight">
                    {w.title}
                  </h3>
                  <p className="text-deep-night/75 text-sm sm:text-base leading-relaxed">{w.body}</p>
                </article>
              )
            })}
          </div>

          <div className="prose prose-deep-night max-w-none text-deep-night/80 leading-relaxed space-y-4">
            {c.season.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              {c.bookingBefore}
              <a
                href={bearUrl('booking')}
                target="_blank"
                rel="noopener"
                className={bearLinkClass}
                onClick={() => trackPartnerClick('booking')}
              >
                {c.bookingLink}
              </a>
              {c.bookingAfter}
            </p>
          </div>
        </div>
      </section>

      {/* Where it is */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-snow">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <MapPin className="w-4 h-4" />
            {c.whereKicker}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-5">
            {c.whereH2}
          </h2>
          <p className="text-deep-night/80 leading-relaxed text-base sm:text-lg">
            {c.whereBefore}
            <a
              href={bearUrl('where_keyword')}
              target="_blank"
              rel="noopener"
              className={bearLinkClass}
              onClick={() => trackPartnerClick('where_keyword')}
            >
              {ANCHOR_TOUR}
            </a>
            {c.whereAfter}
          </p>

          <div className="mt-8 pt-6 border-t border-deep-night/10 flex flex-wrap gap-2 text-sm">
            <Link
              to={to('/wildlife')}
              className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold"
            >
              {c.crossWildlife}
            </Link>
            <HubLink
              href="https://laplandvibes.com"
              placement="bear_kuusamo_hub"
              className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold"
            >
              {c.crossHub}
            </HubLink>
          </div>
        </div>
      </section>

      {/* Final CTA + Bear Kuusamo logo (white) on dark */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-deep-night via-deep-night to-emerald-950 text-snow">
        <div className="max-w-3xl mx-auto text-center">
          <a
            href={bearUrl('cta_book')}
            target="_blank"
            rel="noopener"
            onClick={() => trackPartnerClick('cta_book')}
            className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            {c.ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="mt-12 pt-10 border-t border-snow/12">
            <a
              href={bearUrl('logo')}
              target="_blank"
              rel="noopener"
              aria-label={c.logoAlt}
              onClick={() => trackPartnerClick('logo')}
              className="inline-block opacity-90 hover:opacity-100 transition-opacity"
            >
              <img
                src="/images/bear-kuusamo-logo-white.png"
                alt={c.logoAlt}
                width={220}
                height={65}
                className="h-12 sm:h-14 w-auto mx-auto"
              />
            </a>
            <p className="mt-5 text-snow/55 text-xs tracking-wide">{c.photosCredit}</p>
          </div>
        </div>
      </section>
    </>
  )
}
