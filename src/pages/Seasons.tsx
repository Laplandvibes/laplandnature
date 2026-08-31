import { Link } from 'react-router-dom'
import { Moon, Sun, Flower2, Leaf, ArrowRight, Calendar, Camera, AlertTriangle, HelpCircle, Plus } from 'lucide-react'
import SEO from '../components/SEO'
import HeroImage from '../components/HeroImage'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import FaqLinks, { type FaqNavKey } from '../components/FaqLinks'

// `image` is index-aligned with copy.seasons.seasons: ruska, kaamos, midnight
// sun, spring. The four files had been sitting unused in public/images/ since
// the site was built — the most visual topic on the site was the only pillar
// with no photography below the hero.
const SEASON_VISUAL = [
  { icon: Leaf, image: 'season-ruska', gradient: 'from-orange-500 to-red-600', bg: 'bg-orange-500/8', accent: 'text-orange-600' },
  { icon: Moon, image: 'season-kaamos', gradient: 'from-indigo-600 to-purple-800', bg: 'bg-indigo-500/8', accent: 'text-indigo-600' },
  { icon: Sun, image: 'season-midnight-sun', gradient: 'from-amber-400 to-yellow-500', bg: 'bg-amber-400/8', accent: 'text-amber-600' },
  { icon: Flower2, image: 'season-spring', gradient: 'from-emerald-400 to-cyan-500', bg: 'bg-emerald-400/8', accent: 'text-emerald-600' },
]

const SEASONS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Four seasons of Finnish Lapland: ruska, kaamos, midnight sun, spring',
  description: 'Each season above the Arctic Circle is a distinct world: ruska autumn colour, kaamos polar night, midnight sun summer, and spring snow.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'LaPeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/seasons',

  image: "https://laplandnature.com/og/seasons-1200x630.jpg",
}

// Per-question cross-pillar links backing each FAQ answer (index-aligned
// with copy.en.ts faq.items; see FaqLinks.tsx).
const FAQ_LINKS: FaqNavKey[][] = [['northernLights'], [], ['hiking'], ['nationalParks', 'hiking'], []]

export default function Seasons() {
  const lang = useLang()
  const c = COPY[lang].seasons
  const to = useLocalePath()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath="/seasons"
        keywords={['lapland seasons', 'kaamos polar night', 'ruska autumn lapland', 'midnight sun finland', 'lapland spring snow']}
        jsonLd={[SEASONS_JSONLD, faqLd]}
      />

      <HeroImage
        image="hero-seasons.webp"
        priority
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
      />

      <section className="pt-10 sm:pt-14 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
          {c.seasons.map((season, i) => {
            const v = SEASON_VISUAL[i]
            const Icon = v.icon
            return (
              <article
                key={season.name}
                className="rounded-2xl border border-deep-night/10 bg-snow overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Decorative: the card's own h2 names the season, so a
                    translated alt would only repeat it (see the alt rule in
                    the image-audit notes). */}
                <div className="aspect-[16/9] overflow-hidden bg-deep-night/5">
                  <picture>
                    <source type="image/avif" srcSet={`/images/${v.image}.avif`} />
                    <img
                      src={`/images/${v.image}.webp`}
                      alt=""
                      aria-hidden="true"
                      loading={i < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-full object-cover"
                      width={1280}
                      height={720}
                    />
                  </picture>
                </div>
                <div className={`h-2 bg-gradient-to-r ${v.gradient}`} />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${v.accent}`} />
                    </div>
                    <div>
                      <h2 className="font-heading text-3xl text-deep-night tracking-wide">{season.name}</h2>
                      <p className={`text-sm font-semibold ${v.accent}`}>{season.period}</p>
                    </div>
                  </div>
                  <p className="text-deep-night/75 leading-relaxed">{season.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-snow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Calendar className="w-4 h-4" />
            {c.ruskaKicker}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-4 leading-tight">
            {c.ruskaH2}
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-8">{c.ruskaLead}</p>

          <div className="space-y-4 mb-8">
            {c.ruskaWeeks.map((w, i) => (
              <div key={w.week} className="rounded-2xl border border-deep-night/10 bg-cream p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="sm:w-44 shrink-0">
                  <div className="font-heading text-vibe-pink text-lg tracking-wider">{w.week}</div>
                  <div className="text-deep-night/55 text-sm">{w.region}</div>
                </div>
                <div className="text-deep-night/80 text-sm leading-relaxed flex-1">
                  {w.body}
                  {i === 2 && (
                    <>{c.ruskaWeek3Suffix}<Link to={to('/national-parks')} className="text-vibe-pink hover:underline">{c.ruskaWeek3SuffixLink}</Link>).</>
                  )}
                  {i === 3 && (
                    <>{c.ruskaWeek4Suffix}<Link to={to('/hiking-trails')} className="text-vibe-pink hover:underline">{c.ruskaWeek4SuffixLink}</Link>).</>
                  )}
                  {i === 4 && (
                    <>{c.ruskaWeek5Suffix}<Link to={to('/northern-lights')} className="text-vibe-pink hover:underline">{c.ruskaWeek5SuffixLink}</Link>.</>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-deep-night/10 bg-gradient-to-br from-amber-50 via-snow to-emerald-50 p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-heading text-lg text-deep-night tracking-wide mb-2">{c.bookingH3}</h3>
                <ul className="text-deep-night/80 text-sm leading-relaxed space-y-1.5 list-disc pl-5">
                  {c.bookingItems.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-deep-night/10 bg-snow p-6 flex items-start gap-4">
            <Camera className="w-5 h-5 text-aurora-green mt-0.5 shrink-0" />
            <div>
              <p className="font-heading text-base text-deep-night tracking-wide mb-2">{c.photoNoteTitle}</p>
              <p className="text-deep-night/75 text-sm leading-relaxed">{c.photoNoteBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-snow p-8 sm:p-10">
          <h3 className="font-heading text-2xl sm:text-3xl text-deep-night tracking-wider mb-3">
            {c.matchH3}
          </h3>
          <p className="text-deep-night/70 mb-7">{c.matchLead}</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <AffiliateCTA
              partner="hotels-seasonal"
              sid="seasons_book_seasonal"
              destination="Saariselkä, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {c.seasonalBaseCta}
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="seasons_browse_activity"
              destination="lappi-suomi-l2652"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              {c.seasonMatchedCta}
            </AffiliateCTA>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <Link to={to('/northern-lights')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.aurora}
            </Link>
            <Link to={to('/hiking-trails')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.ruska}
            </Link>
            <Link to={to('/wildlife')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.wildlife}
            </Link>
            <HubLink href="https://laplandsnowmobile.com" placement="seasons_snowmobile" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              {c.crossLinks.snowmobile}
            </HubLink>
            <HubLink href="https://laplandskiresorts.com" placement="seasons_skiresorts" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              {c.crossLinks.xcski}
            </HubLink>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <HelpCircle className="w-4 h-4" />
            {c.faq.eyebrow}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-8">
            {c.faq.h2}
          </h2>
          <div className="space-y-3">
            {c.faq.items.map((item, faqIndex) => (
              <details key={item.q} className="group rounded-2xl border border-deep-night/10 bg-snow p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none font-heading text-lg sm:text-xl text-deep-night tracking-wide">
                  <span>{item.q}</span>
                  <Plus className="w-5 h-5 text-aurora-green shrink-0 mt-1 transition-transform group-open:rotate-45" />
                </summary>
                <p className="text-deep-night/75 text-sm sm:text-base leading-relaxed mt-3">{item.a}</p>
                <FaqLinks keys={FAQ_LINKS[faqIndex]} />
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
