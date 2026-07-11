import { Link } from 'react-router-dom'
import { Droplets, Waves, Sprout, TreePine, Fish, HelpCircle, Plus, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'
import HeroImage from '../components/HeroImage'
import HubLink from '../components/HubLink'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import FaqLinks, { type FaqNavKey } from '../components/FaqLinks'

const FRESHWATER_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Freshwater Lapland — lakes, free-flowing rivers, aapa mires and the fish they support',
  description:
    "Why clean cold water is Lapland's rarest asset: 188,000 lakes (SYKE), the unregulated Tornio-Muonio river system, aapa mires and the forests that keep the water cold.",
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-07-11',
  dateModified: '2026-07-11',
  mainEntityOfPage: 'https://laplandnature.com/freshwater',
  image: 'https://laplandnature.com/images/hero-freshwater.webp',
}

// Per-question cross-pillar links backing each FAQ answer (index-aligned with
// copy.en.ts freshwater.faq.items; see FaqLinks.tsx).
const FAQ_LINKS: FaqNavKey[][] = [[], ['conservation'], ['conservation'], [], ['conservation']]

export default function Freshwater() {
  const lang = useLang()
  const c = COPY[lang].freshwater
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

  const chapters = [
    { key: 'lakes' as const, icon: Droplets, accent: 'text-sky-700', bg: 'bg-sky-500/10', data: c.lakes },
    { key: 'rivers' as const, icon: Waves, accent: 'text-aurora-green', bg: 'bg-aurora-green/10', data: c.rivers },
    { key: 'mires' as const, icon: Sprout, accent: 'text-emerald-700', bg: 'bg-emerald-500/10', data: c.mires },
    { key: 'forests' as const, icon: TreePine, accent: 'text-emerald-800', bg: 'bg-emerald-600/10', data: c.forests },
  ]

  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath={lang === 'en' ? '/freshwater' : `/${lang}/freshwater`}
        keywords={['lapland lakes', 'finland number of lakes', 'tornionjoki free flowing river', 'aapa mires ramsar', 'lapland fishing conservation', 'teno salmon 2026', 'clean water lapland']}
        jsonLd={[FRESHWATER_JSONLD, faqLd]}
      />

      <HeroImage
        image="hero-freshwater.webp"
        priority
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
      />

      {/* Intro — value framing */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.introKicker}</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-5">
            {c.introH2}
          </h2>
          <p className="text-deep-night/75 text-base sm:text-lg leading-relaxed">{c.introLead}</p>
        </div>
      </section>

      {/* Four chapters — one system, four parts */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.chaptersKicker}</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider">
              {c.chaptersH2}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {chapters.map((ch, i) => {
              const Icon = ch.icon
              return (
                <article key={ch.key} className="rounded-2xl border border-deep-night/10 bg-snow p-6 sm:p-7 hover:shadow-md hover:border-aurora-green/40 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${ch.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${ch.accent}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${ch.accent} mb-1`}>
                        {`0${i + 1}`}
                      </p>
                      <h3 className="font-heading text-2xl text-deep-night tracking-wide leading-tight">{ch.data.title}</h3>
                    </div>
                  </div>
                  <p className="text-deep-night/75 text-sm leading-relaxed mb-3">{ch.data.body1}</p>
                  <p className="text-deep-night/75 text-sm leading-relaxed">{ch.data.body2}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fish stocks — the system keeping score */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-gradient-to-br from-cyan-50 via-snow to-emerald-50 p-8 sm:p-12">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
              <Fish className="w-4 h-4" />
              {c.fish.kicker}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
              {c.fish.title}
            </h2>
            <p className="text-deep-night/75 text-sm sm:text-base leading-relaxed">{c.fish.lead}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
            {c.fish.stories.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-deep-night/10 bg-snow/80 p-6">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-aurora-green text-snow flex items-center justify-center text-sm font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2 leading-tight">{s.title}</h3>
                    <p className="text-deep-night/75 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-deep-night/60 text-xs sm:text-sm leading-relaxed text-center mb-7">{c.fish.feeNote}</p>

          <div className="flex justify-center">
            <a
              href="https://laplandactivities.fi/fishing/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {c.fish.pillarCta}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Final — protect it, then enjoy it */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.finalKicker}</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            {c.finalH2}
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-8">{c.finalLead}</p>

          <div className="flex flex-wrap gap-2 text-sm mb-8">
            <a
              href="https://laplandactivities.fi/fishing/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold"
            >
              {c.crossLinks.fishing}
            </a>
            <Link to={to('/conservation')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.conservation}
            </Link>
            <Link to={to('/wildlife')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.wildlife}
            </Link>
            <HubLink href="https://laplandvibes.com" placement="freshwater_hub_cta" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              {c.crossLinks.hub}
            </HubLink>
          </div>

          <p className="text-deep-night/50 text-xs leading-relaxed border-t border-deep-night/10 pt-6">{c.verifyLine}</p>
        </div>
      </section>
    </>
  )
}
