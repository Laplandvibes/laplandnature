import { Link } from 'react-router-dom'
import { Clock, BarChart3, MapPin, ArrowRight, Backpack, Tent, AlertTriangle, Sunrise, HelpCircle, Plus } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import HeroImage from '../components/HeroImage'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import AdUnit from '../../../shared/ads/AdUnit'
import scandinavianOutdoorAd from '../../../shared/ads/advertisers/scandinavianOutdoor'
import { trackAffiliateClick } from '../lib/analytics'
import FaqLinks, { type FaqNavKey } from '../components/FaqLinks'

const TRAIL_LOCATIONS = [
  'Pallas-Yllästunturi National Park',
  'Oulanka National Park',
  'Urho Kekkonen National Park',
  'Enontekiö',
  'Pyhä-Luosto National Park',
  'Lemmenjoki National Park',
]
const TRAIL_HEADS = [
  { dest: 'Hetta, Finland', sid: 'trailhead_hetta' },
  { dest: 'Ruka, Finland', sid: 'trailhead_oulanka' },
  { dest: 'Saariselkä, Finland', sid: 'trailhead_saariselka' },
  { dest: 'Kilpisjärvi, Finland', sid: 'trailhead_kilpisjarvi' },
  { dest: 'Pyhä, Finland', sid: 'trailhead_pyha' },
  { dest: 'Inari, Finland', sid: 'trailhead_lemmenjoki' },
]

function difficultyColor(d: string): string {
  const map: Record<string, string> = {
    Easy: 'bg-emerald-100 text-emerald-700',
    Helppo: 'bg-emerald-100 text-emerald-700',
    Leicht: 'bg-emerald-100 text-emerald-700',
    Moderate: 'bg-amber-100 text-amber-700',
    Keskivaativa: 'bg-amber-100 text-amber-700',
    Mittel: 'bg-amber-100 text-amber-700',
    Challenging: 'bg-orange-100 text-orange-700',
    Vaativa: 'bg-orange-100 text-orange-700',
    Anspruchsvoll: 'bg-orange-100 text-orange-700',
    Demanding: 'bg-rose-100 text-rose-700',
    'Erittäin vaativa': 'bg-rose-100 text-rose-700',
    'Sehr anspruchsvoll': 'bg-rose-100 text-rose-700',
  }
  return map[d] ?? 'bg-deep-night/10 text-deep-night/70'
}

const HIKING_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Six hiking trails in Finnish Lapland — from 5 km to 82 km',
  description: 'Karhunkierros, Hetta–Pallas, Halti and three more — the trails worth planning a Lapland trip around, with distance, duration and difficulty for each.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/hiking-trails',

  image: "https://laplandnature.com/og/hiking-trails-1200x630.jpg",
}

// Per-question cross-pillar links backing each FAQ answer (index-aligned
// with copy.en.ts faq.items; see FaqLinks.tsx).
const FAQ_LINKS: FaqNavKey[][] = [['nationalParks'], ['nationalParks'], [], [], ['seasons']]

export default function HikingTrails() {
  const lang = useLang()
  const c = COPY[lang].hiking
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
        canonicalPath={lang === 'en' ? '/hiking-trails' : `/${lang}/hiking-trails`}
        keywords={['lapland hiking', 'karhunkierros', 'hetta pallas trail', 'halti finland', 'lemmenjoki hike', 'pyhakuru gorge']}
        jsonLd={[HIKING_JSONLD, faqLd]}
      />

      <HeroImage
        image="hero-hiking.webp"
        priority
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
      />

      <section className="pt-8 pb-2 px-4 sm:px-6"><div className="max-w-4xl mx-auto" /></section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-b border-deep-night/8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Backpack className="w-4 h-4" />
            {c.karhuKicker}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-4 leading-tight">
            {c.karhuH2}
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-8">{c.karhuLead}</p>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
            {c.days.map((d) => (
              <div key={d.day} className="rounded-2xl border border-deep-night/10 bg-snow p-6">
                <div className="flex items-center gap-2 text-vibe-pink text-xs font-bold uppercase tracking-wider mb-2">
                  <Sunrise className="w-3.5 h-3.5" /> {d.day}
                </div>
                <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">{d.title}</h3>
                <p className="text-deep-night/75 text-sm leading-relaxed">{d.body}</p>
                <p className="text-deep-night/55 text-xs mt-3 italic">{d.note}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-deep-night/10 bg-gradient-to-br from-amber-50 via-snow to-emerald-50 p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-heading text-lg text-deep-night tracking-wide mb-2">{c.differentlyH3}</h3>
                <ul className="text-deep-night/80 text-sm leading-relaxed space-y-1.5 list-disc pl-5">
                  {c.differently.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <AffiliateCTA
              partner="hotels"
              sid="trip_report_ruka_post_walk"
              destination="Ruka, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <Tent className="w-4 h-4" />
              {c.rukaPostCta}
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="trip_report_oulanka_guided"
              destination="rovaniemi-l2653"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              {c.oulankaGuidedCta}
            </AffiliateCTA>
          </div>

          {/* Scandinavian Outdoor ad — gear context after the trail walk-through
              (shared/ads; disclosure lives in the shared Footer bottom strip). */}
          <AdUnit
            spec={scandinavianOutdoorAd}
            sid="hiking_trails_gear"
            lang={lang}
            variant="light"
            className="mt-10"
            onCtaClick={(specKey, sid, url) => trackAffiliateClick(specKey, `ad_unit:${sid}`, url)}
          />
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.listKicker}</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-3">
            {c.listH2}
          </h2>
          <p className="text-deep-night/65 mb-8">{c.listLead}</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 sm:gap-6">
          {c.trails.map((trail, i) => (
            <article
              key={trail.name}
              className="rounded-2xl border border-deep-night/10 bg-snow p-6 hover:border-aurora-green/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-heading text-2xl text-deep-night tracking-wide">{trail.name}</h2>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${difficultyColor(trail.difficulty)}`}>
                  {trail.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-1 text-deep-night/55 text-sm mb-3">
                <MapPin className="w-3.5 h-3.5" />
                {TRAIL_LOCATIONS[i]}
              </div>

              <p className="text-deep-night/75 text-sm leading-relaxed mb-5">{trail.description}</p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 items-center text-sm">
                <div className="flex items-center gap-1.5 text-aurora-green font-semibold">
                  <BarChart3 className="w-4 h-4" />
                  {trail.distance}
                </div>
                <div className="flex items-center gap-1.5 text-deep-night/65">
                  <Clock className="w-4 h-4" />
                  {trail.duration}
                </div>
                <AffiliateCTA
                  partner="hotels"
                  sid={TRAIL_HEADS[i].sid}
                  destination={TRAIL_HEADS[i].dest}
                  className="ml-auto inline-flex items-center gap-1 text-vibe-pink hover:text-pink-600 text-xs font-semibold"
                >
                  {c.trailheadStays}
                  <ArrowRight className="w-3 h-3" />
                </AffiliateCTA>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-4 pb-4 px-4 sm:px-6">
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

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-snow p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-deep-night tracking-wider mb-2">
                {c.planRestH3}
              </h3>
              <p className="text-deep-night/70 text-sm sm:text-base">{c.planRestLead}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to={to('/seasons')} className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                {c.crossLinks.when}
              </Link>
              <Link to={to('/national-parks')} className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                {c.crossLinks.parks}
              </Link>
              <HubLink href="https://laplandstays.com" placement="hiking_stays" className="text-sm font-semibold px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors">
                {c.crossLinks.stays}
              </HubLink>
              <HubLink href="https://laplandtransport.com" placement="hiking_transport" className="text-sm font-semibold px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors">
                {c.crossLinks.transport}
              </HubLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
