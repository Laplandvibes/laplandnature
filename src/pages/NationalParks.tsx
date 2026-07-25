import { Link } from 'react-router-dom'
import { Trees, Mountain, MapPin, Gem, Footprints, ArrowRight, Backpack, Sunrise, AlertTriangle, HelpCircle, Plus } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import HeroImage from '../components/HeroImage'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import FaqLinks, { type FaqNavKey } from '../components/FaqLinks'

const PARK_LOCATIONS = ['Saariselkä', 'Muonio – Kittilä', 'Inari', 'Posio', 'Pelkosenniemi – Sodankylä']
const PARK_ICONS = [Mountain, Footprints, Gem, Trees, Gem]
const PARK_SIDS = ['park_gateway_saariselka', 'park_gateway_muonio', 'park_gateway_inari', 'park_gateway_posio', 'park_gateway_pyha_luosto']
const PARK_DESTS = ['Saariselkä, Finland', 'Muonio, Finland', 'Inari, Finland', 'Posio, Finland', 'Pyhä, Finland']

const PARKS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Five National Parks in Finnish Lapland: a hiker\'s overview',
  description: 'Urho Kekkonen, Pallas-Yllästunturi, Lemmenjoki, Riisitunturi and Pyhä-Luosto: what makes each Lapland national park distinctive, with gateway villages and best season.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/national-parks',

  image: "https://laplandnature.com/og/national-parks-1200x630.jpg",
}

// Per-question cross-pillar links backing each FAQ answer (index-aligned
// with copy.en.ts faq.items; see FaqLinks.tsx).
const FAQ_LINKS: FaqNavKey[][] = [[], [], ['conservation'], ['seasons'], []]

export default function NationalParks() {
  const lang = useLang()
  const c = COPY[lang].nationalParks
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
        canonicalPath="/national-parks"
        keywords={['lapland national parks', 'urho kekkonen national park', 'pallas yllastunturi', 'lemmenjoki', 'riisitunturi', 'pyha luosto']}
        jsonLd={[PARKS_JSONLD, faqLd]}
      />

      <HeroImage
        image="hero-national-parks.webp"
        priority
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
      />

      <section className="pt-8 pb-2 px-4 sm:px-6"><div className="max-w-4xl mx-auto" /></section>

      <section className="pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {c.parks.map((park, i) => {
            const Icon = PARK_ICONS[i]
            return (
              <div
                key={park.name}
                className="rounded-2xl border border-deep-night/10 bg-snow overflow-hidden hover:shadow-lg hover:border-aurora-green/40 transition-all"
              >
                <div className="h-2 bg-gradient-to-r from-aurora-green to-forest" />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-aurora-green/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-aurora-green" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl text-deep-night tracking-wide leading-tight">
                        {park.name}
                      </h2>
                      <div className="flex items-center gap-1 text-sm text-deep-night/55 mt-1">
                        <MapPin className="w-3 h-3" />
                        {PARK_LOCATIONS[i]}
                      </div>
                    </div>
                  </div>

                  <p className="text-deep-night/70 text-sm mb-4 leading-relaxed">{park.description}</p>

                  <p className="text-deep-night/55 text-xs italic mb-4 border-l-2 border-aurora-green/40 pl-3">
                    {c.weThere} {park.visited}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-aurora-green/10 text-forest text-xs font-semibold px-3 py-1.5 rounded-full">
                      {park.highlight}
                    </span>
                    <AffiliateCTA
                      partner="hotels"
                      sid={PARK_SIDS[i]}
                      destination={PARK_DESTS[i]}
                      className="inline-flex items-center gap-1 text-vibe-pink hover:text-pink-600 text-xs font-semibold"
                    >
                      {c.stayNearby}
                      <ArrowRight className="w-3 h-3" />
                    </AffiliateCTA>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-snow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Backpack className="w-4 h-4" />
            {c.hettaKicker}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-4 leading-tight">
            {c.hettaH2}
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-8">{c.hettaLead}</p>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-8">
            {c.days.map((d) => (
              <div key={d.day} className="rounded-2xl border border-deep-night/10 bg-cream p-6">
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
              sid="parks_hetta_pre_walk"
              destination="Enontekiö, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {c.preWalkCta}
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="hotels"
              sid="parks_pallas_post_walk"
              destination="Muonio, Finland"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              {c.postWalkCta}
            </AffiliateCTA>
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
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-gradient-to-br from-emerald-50 via-snow to-cyan-50 p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-deep-night tracking-wider mb-2">
                {c.crossH3}
              </h3>
              <p className="text-deep-night/70 text-sm sm:text-base">{c.crossLead}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to={to('/hiking-trails')} className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                {c.crossLinks.trails}
              </Link>
              <Link to={to('/wildlife')} className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                {c.crossLinks.wildlife}
              </Link>
              <Link to={to('/seasons')} className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                {c.crossLinks.season}
              </Link>
              <HubLink href="https://laplandstays.com" placement="parks_stays" className="text-sm font-semibold px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors">
                {c.crossLinks.stays}
              </HubLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
