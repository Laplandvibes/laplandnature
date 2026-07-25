import { Link } from 'react-router-dom'
import { MapPin, Calendar, Lightbulb, ArrowRight, Moon, Activity, Camera, HelpCircle, Plus } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import HeroImage from '../components/HeroImage'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import FaqLinks, { type FaqNavKey } from '../components/FaqLinks'

const spotSids = ['aurora_spot_inari', 'aurora_spot_utsjoki', 'aurora_spot_kilpisjarvi', 'aurora_spot_enontekio']
const spotDestinations = ['Inari, Finland', 'Utsjoki, Finland', 'Kilpisjärvi, Finland', 'Enontekiö, Finland']

const NL_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Northern Lights in Finnish Lapland: where, when and how to see them',
  description: 'A practical guide to seeing the aurora borealis in Finnish Lapland: best viewing spots, season timing, and viewing tips from experienced local observers.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/northern-lights',

  image: "https://laplandnature.com/og/northern-lights-1200x630.jpg",
}

// Per-question cross-pillar links backing each FAQ answer (index-aligned
// with copy.en.ts faq.items; see FaqLinks.tsx).
const FAQ_LINKS: FaqNavKey[][] = [[], ['seasons'], [], ['seasons'], ['nationalParks']]

export default function NorthernLights() {
  const lang = useLang()
  const c = COPY[lang].northernLights
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
        canonicalPath={lang === 'en' ? '/northern-lights' : `/${lang}/northern-lights`}
        keywords={['northern lights lapland', 'aurora borealis finland', 'aurora viewing inari', 'kilpisjarvi aurora', 'lapland aurora season']}
        jsonLd={[NL_JSONLD, faqLd]}
      />

      <HeroImage
        image="hero-northern-lights.webp"
        priority
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
      />

      <section className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-start gap-3 bg-aurora-green/10 border border-aurora-green/25 rounded-2xl px-4 py-2.5">
            <Calendar className="w-4 h-4 text-aurora-green shrink-0 mt-0.5" />
            <span className="text-deep-night/80 text-sm leading-snug">
              {c.bestSeason} <span className="font-semibold text-aurora-green">{c.bestSeasonValue}</span>{c.bestSeasonSuffix}
            </span>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-3 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-vibe-pink" />
            {c.spotsH2}
          </h2>
          <p className="text-deep-night/65 max-w-2xl mb-10">{c.spotsLead}</p>

          <div className="grid sm:grid-cols-2 gap-5">
            {c.spots.map((spot, i) => (
              <div
                key={spot.name}
                className="rounded-2xl border border-deep-night/10 bg-snow p-6 hover:border-aurora-green/40 hover:shadow-md transition-all"
              >
                <h3 className="font-heading text-2xl text-deep-night tracking-wide mb-2">{spot.name}</h3>
                <p className="text-deep-night/70 leading-relaxed mb-5">{spot.description}</p>
                <AffiliateCTA
                  partner="hotels"
                  sid={spotSids[i]}
                  destination={spotDestinations[i]}
                  className="inline-flex items-center gap-1.5 text-vibe-pink hover:text-pink-600 text-sm font-semibold"
                >
                  {c.stayCta} {spot.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </AffiliateCTA>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-deep-night/10 bg-gradient-to-br from-emerald-50 via-snow to-cyan-50 p-8 sm:p-10">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-6 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-vibe-pink" />
            {c.tipsH2}
          </h2>

          <ol className="space-y-4">
            {c.tips.map((tip, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-aurora-green text-snow flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-deep-night/80 leading-relaxed pt-0.5">{tip}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-gradient-to-br from-deep-night via-deep-night to-emerald-950 text-snow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Moon className="w-4 h-4" />
            {c.oneNightKicker}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wider mb-4 leading-tight">
            {c.oneNightH2}
          </h2>
          <p className="text-snow/80 leading-relaxed mb-8 text-lg">
            {c.oneNightLead}
          </p>

          <ol className="space-y-5 mb-10">
            {c.oneNightSteps.map((s) => (
              <li key={s.time} className="flex gap-4 items-start">
                <span className={`flex-shrink-0 w-16 text-right font-heading text-xl tracking-wider ${s.highlight ? 'text-vibe-pink' : 'text-aurora-green'}`}>
                  {s.time}
                </span>
                <div className={`border-l-2 pl-4 ${s.highlight ? 'border-vibe-pink/40' : 'border-aurora-green/40'}`}>
                  <p className={`font-heading text-lg tracking-wide mb-1 ${s.highlight ? 'text-vibe-pink' : ''}`}>
                    {s.title}
                  </p>
                  <p className={`text-sm leading-relaxed ${s.highlight ? 'text-snow/85' : 'text-snow/75'}`}>
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border border-snow/15 bg-snow/5 backdrop-blur-sm p-6 sm:p-8">
            <div className="grid sm:grid-cols-3 gap-5 sm:gap-8 text-sm">
              {c.cards.map((card, i) => {
                const Icon = i === 0 ? Activity : i === 1 ? Camera : Moon
                return (
                  <div key={card.title}>
                    <Icon className="w-5 h-5 text-aurora-green mb-2" />
                    <p className="font-heading text-base tracking-wide mb-1">{card.title}</p>
                    <p className="text-snow/70 leading-relaxed">{card.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 sm:pt-16 pb-4 px-4 sm:px-6">
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

      <section className="pb-20 pt-12 sm:pt-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            {c.finalH2}
          </h2>
          <p className="text-deep-night/70 mb-7 max-w-xl mx-auto">
            {c.finalLead}
          </p>
          <AffiliateCTA
            partner="activities"
            sid="aurora_tour_cta"
            destination="lappi-suomi-l2652"
            className="inline-flex items-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            {c.finalCta}
            <ArrowRight className="w-4 h-4" />
          </AffiliateCTA>

          <div className="mt-12 pt-8 border-t border-deep-night/8 flex flex-wrap justify-center gap-2 text-sm">
            <Link to={to('/seasons')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.aurora}
            </Link>
            <Link to={to('/national-parks')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.parks}
            </Link>
            <HubLink href="https://laplandstays.com" placement="aurora_stays" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              {c.crossLinks.igloos}
            </HubLink>
          </div>
        </div>
      </section>
    </>
  )
}
