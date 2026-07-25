import { Link } from 'react-router-dom'
import { Shield, TreePine, Leaf, Users, ArrowRight, HelpCircle, Plus } from 'lucide-react'
import SEO from '../components/SEO'
import HeroImage from '../components/HeroImage'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import FaqLinks, { type FaqNavKey } from '../components/FaqLinks'
import { withReferral } from '../lib/referral'

const ORG_VISUAL = [
  { accent: 'text-aurora-green', icon: Shield, url: 'https://www.metsa.fi/en/' },
  { accent: 'text-emerald-700', icon: Leaf, url: 'https://www.sll.fi/en/' },
  { accent: 'text-sky-700', icon: TreePine, url: 'https://wwf.fi/en/' },
  { accent: 'text-vibe-pink', icon: Users, url: 'https://www.samediggi.fi/?lang=en' },
]

const CONSERVATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Conservation in Finnish Lapland: who protects the wilderness, and how',
  description: 'Metsähallitus manages 85% of fell areas and all seven national parks.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/conservation',

  image: "https://laplandnature.com/og/conservation-1200x630.jpg",
}

// Per-question cross-pillar links backing each FAQ answer (index-aligned
// with copy.en.ts faq.items; see FaqLinks.tsx).
const FAQ_LINKS: FaqNavKey[][] = [[], ['nationalParks'], ['nationalParks'], ['wildlife'], []]

export default function Conservation() {
  const lang = useLang()
  const c = COPY[lang].conservation
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
        canonicalPath="/conservation"
        keywords={['lapland conservation', 'metsahallitus', 'sll finland', 'everymans right finland', 'sami parliament', 'arctic fox finland', 'lapland national parks management']}
        jsonLd={[CONSERVATION_JSONLD, faqLd]}
      />

      <HeroImage
        image="hero-conservation.webp"
        priority
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
      />

      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.orgsKicker}</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-4">
              {c.orgsH2}
            </h2>
            <p className="text-deep-night/70 max-w-2xl mx-auto">{c.orgsLead}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {c.orgs.map((o, i) => {
              const v = ORG_VISUAL[i]
              const Icon = v.icon
              return (
                <article key={o.name} className="rounded-2xl border border-deep-night/10 bg-snow p-6 sm:p-7 hover:shadow-md hover:border-aurora-green/40 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-aurora-green/10 flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 ${v.accent}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${v.accent} mb-1`}>{o.role}</p>
                      <h3 className="font-heading text-2xl text-deep-night tracking-wide leading-tight">{o.name}</h3>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${v.accent} mb-3`}>{o.summary}</p>
                  <p className="text-deep-night/75 text-sm leading-relaxed mb-5">{o.body}</p>
                  <a
                    href={withReferral(v.url, 'nature_conservation')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-vibe-pink hover:text-pink-600 text-sm font-semibold"
                  >
                    {c.visitSite}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-gradient-to-br from-emerald-50 via-snow to-cyan-50 p-8 sm:p-12">
          <div className="text-center mb-10">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.responsibilityKicker}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider">
              {c.responsibilityH2}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {c.principles.map((p, i) => (
              <div key={p.title} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-aurora-green text-snow flex items-center justify-center text-sm font-bold mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">{p.title}</h3>
                  <p className="text-deep-night/75 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 sm:px-6">
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
        <div className="max-w-4xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.finalKicker}</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            {c.finalH2}
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-7">{c.finalLead}</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <AffiliateCTA
              partner="hotels"
              sid="conservation_local_stay"
              destination="Inari, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {c.samiVillageCta}
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="conservation_local_tour"
              destination="lappi-suomi-l2652"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              {c.localTourCta}
            </AffiliateCTA>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <Link to={to('/wildlife')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.wildlife}
            </Link>
            <Link to={to('/national-parks')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.parks}
            </Link>
            <Link to={to('/freshwater')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.freshwater}
            </Link>
            <HubLink href="https://laplandvibes.com" placement="conservation_hub_cta" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              {c.crossLinks.hub}
            </HubLink>
          </div>
        </div>
      </section>
    </>
  )
}
