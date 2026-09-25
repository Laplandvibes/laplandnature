import { Link } from 'react-router-dom'
import { ArrowRight, Moon, Camera, AlertCircle, HelpCircle, Plus } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import HeroImage from '../components/HeroImage'
import PhotoCredit, { PhotoCreditsList } from '../components/PhotoCredit'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import FaqLinks, { type FaqNavKey } from '../components/FaqLinks'
import AdUnit from '../shared/ads/AdUnit'
import bearKuusamoAd from '../shared/ads/advertisers/bearkuusamo'
import { trackPartnerClick } from '../lib/analytics'

const ANIMAL_LATIN = [
  'Rangifer tarandus',
  'Vulpes lagopus',
  'Ursus arctos',
  'Gulo gulo',
  'Bubo scandiacus',
  'Cygnus cygnus',
]

/**
 * Uhanalaisuusmerkin väri lajin JÄRJESTYKSEN mukaan, ei tekstin (25.9.2026).
 * Tekstihaku ei tuntenut suomen "Äärimmäisen uhanalainen" -muotoa, joten naalin
 * merkki näkyi suomeksi vihreänä kuin "Yleinen" laji, ja "Erittäin uhanalainen"
 * (= EN) sai äärimmäisen uhanalaisen (CR) värin. Järjestys = copy.*.ts animals[]:
 * poro, naali, karhu, ahma, tunturipöllö, laulujoutsen. Luokat: Suomen lajien
 * uhanalaisuus 2019 (Punainen kirja).
 */
const STATUS_TONE = [
  'bg-emerald-500/10 text-emerald-700', // poro: yleinen
  'bg-rose-500/10 text-rose-700', // naali: CR
  'bg-amber-500/10 text-amber-700', // karhu: NT
  'bg-orange-500/10 text-orange-700', // ahma: EN
  'bg-rose-500/10 text-rose-700', // tunturipöllö: CR (pesimälaji)
  'bg-indigo-500/10 text-indigo-700', // laulujoutsen: kansallislintu
]

const W_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wildlife of Finnish Lapland: six iconic arctic species',
  description: 'Reindeer, brown bear, wolverine, arctic fox and more: the wildlife you can realistically encounter (or hope to glimpse) across Finnish Lapland\'s wilderness.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'LaPeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-09-26',
  mainEntityOfPage: 'https://laplandnature.com/wildlife',

  image: "https://laplandnature.com/og/wildlife-1200x630.jpg",
}

// Per-question cross-pillar links backing each FAQ answer (index-aligned
// with copy.en.ts faq.items; see FaqLinks.tsx).
const FAQ_LINKS: FaqNavKey[][] = [['seasons'], [], ['conservation'], [], []]

export default function Wildlife() {
  const lang = useLang()
  const c = COPY[lang].wildlife
  const bk = COPY[lang].bearKuusamo
  const to = useLocalePath()
  // LV Media inventory (paid placements) ships only on fi/en/sv — shared/adSlotsCopy.

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
        canonicalPath="/wildlife"
        keywords={['lapland wildlife', 'finnish lapland animals', 'lapland reindeer', 'lapland bear watching', 'arctic fox finland', 'wolverine lapland']}
        jsonLd={[W_JSONLD, faqLd]}
      />

      {/* Poro seisoo kuvassa keskellä: teksti ylös, jotta eläin jää näkyviin sen alle. */}
      <HeroImage
        image="hero-wildlife.webp"
        priority
        align="top"
        objectPosition="center 35%"
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
      />

      {/* Bear Kuusamo — PAID PARTNER placement (flat fee, not affiliate/commission).
          Sits immediately under the hero, full content width (matches the animal
          grid below), so it is the first thing a bear-watching visitor sees
          (Vesa 2026-07-25). Locale-gated to fi/en/sv like all LV Media inventory:
          without this the AdUnit's `en` fallback would show an English ad on
          /de, /ja etc.
          🔴 CONTRAST RULE (Vesa 2026-07-25): a paid ad must STAND OUT, never blend
          into the page. This page is cream, so the unit sits in a full-width
          deep-night band — the band itself is the visual break — and uses the
          `dark` variant (which is a translucent glass card, only legible on a dark
          surface) plus the white Bear wordmark. Do NOT switch this to `light`:
          a white card on a cream page disappears. */}
      {/* Maksettu kumppanimainos näkyy KAIKILLA 12 kielellä (Vesa 2026-07-30):
          speksi kantaa nyt täydet käännökset, joten kieliporttia ei tarvita. */}
      {(
        <section className="mt-8 sm:mt-10 mb-12 sm:mb-16 py-10 sm:py-12 px-4 sm:px-6 bg-deep-night">
          <div className="max-w-6xl mx-auto">
            <AdUnit
              spec={bearKuusamoAd}
              sid="wildlife_hero_below"
              lang={lang}
              variant="dark"
              imageSrc="/images/hero-bear-kuusamo.webp"
              articleHref={to('/bear-kuusamo/')}
              onArticleClick={(_k, sid) => trackPartnerClick(`ad_article:${sid}`)}
              onCtaClick={(_specKey, sid) => trackPartnerClick(`ad_unit:${sid}`)}
            />
          </div>
        </section>
      )}

      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {c.animals.map((animal, i) => (
            <article
              key={animal.name}
              className="rounded-2xl border border-deep-night/10 bg-snow p-6 hover:border-aurora-green/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-heading text-2xl text-deep-night tracking-wide">{animal.name}</h2>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${STATUS_TONE[i] ?? 'bg-deep-night/10 text-deep-night/70'}`}>
                  {animal.status}
                </span>
              </div>
              <p className="text-deep-night/55 text-sm italic mb-3">{ANIMAL_LATIN[i]}</p>
              <p className="text-deep-night/75 text-sm leading-relaxed">{animal.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-snow">
        <div className="max-w-4xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.bearKicker}</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-5">
            {c.bearH2}
          </h2>
          <div className="prose prose-deep-night max-w-none text-deep-night/80 leading-relaxed space-y-4">
            {c.bearBody.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {/* Bear hides = PAID partner category (Bear Kuusamo, Vesa 2026-07-25):
                this CTA goes to our own partner feature, whose tracked links book
                directly with Bear Kuusamo. It used to be a GYG Kuusamo search —
                which surfaced only the contract-excluded competitor. Never
                restore a GYG search on a bear CTA. */}
            <Link
              to={to('/bear-kuusamo/')}
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {c.browseHidesCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <AffiliateCTA
              partner="hotels"
              sid="wildlife_kuusamo_base"
              destination="Kuusamo, Finland"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              {c.preNightCta}
            </AffiliateCTA>
          </div>

          {/* Partner feature: Bear Kuusamo (commercial partnership) */}
          <Link
            to={to('/bear-kuusamo/')}
            className="mt-8 group flex flex-col sm:flex-row items-stretch rounded-2xl border border-deep-night/10 bg-cream overflow-hidden hover:border-aurora-green/40 hover:shadow-md transition-all"
          >
            <div className="relative sm:w-52 shrink-0 aspect-[16/10] sm:aspect-auto overflow-hidden">
              <PhotoCredit src="/images/bear-kuusamo-tree.webp" plain />
              <img
                src="/images/bear-kuusamo-tree.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                width={1280}
                height={543}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex-1">
              <p className="text-xs font-semibold mb-2" style={{ color: '#007E2E' }}>{bk.wildlifeCardKicker}</p>
              <h3 className="font-heading text-2xl text-deep-night tracking-wide mb-2 leading-tight">{bk.wildlifeCardTitle}</h3>
              <p className="text-deep-night/70 text-sm leading-relaxed mb-3">{bk.wildlifeCardBody}</p>
              <span className="inline-flex items-center gap-1.5 text-vibe-pink font-semibold text-sm">
                {bk.wildlifeCardCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-deep-night via-deep-night to-emerald-950 text-snow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Moon className="w-4 h-4" />
            {c.bearNightKicker}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wider mb-4 leading-tight">
            {c.bearNightH2}
          </h2>
          <p className="text-snow/80 leading-relaxed mb-8 text-lg">{c.bearNightLead}</p>

          <ol className="space-y-5 mb-10">
            {c.bearNightSteps.map((s) => (
              <li key={s.time} className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start">
                <span className={`sm:flex-shrink-0 sm:w-36 sm:text-right font-heading text-lg sm:text-xl leading-tight tracking-wider ${s.highlight ? 'text-vibe-pink' : 'text-aurora-green'}`}>
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
                const Icon = i === 0 ? Camera : i === 1 ? AlertCircle : Moon
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

      <section className="pb-20 pt-12 sm:pt-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center rounded-3xl border border-deep-night/10 bg-gradient-to-br from-amber-50 via-snow to-emerald-50 p-8 sm:p-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            {c.finalH2}
          </h2>
          <p className="text-deep-night/70 mb-7 max-w-xl mx-auto">{c.finalLead}</p>
          <AffiliateCTA
            partner="activities"
            sid="wildlife_tour_cta"
            destination="lappi-suomi-l2652"
            className="inline-flex items-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            {c.finalCta}
            <ArrowRight className="w-4 h-4" />
          </AffiliateCTA>

          <div className="mt-10 pt-7 border-t border-deep-night/10 flex flex-wrap justify-center gap-2 text-sm">
            <Link to={to('/conservation')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.conservation}
            </Link>
            <Link to={to('/national-parks')} className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              {c.crossLinks.parks}
            </Link>
            <HubLink href="https://laplandhuskysafaris.com" placement="wildlife_husky" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              {c.crossLinks.husky}
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

      <PhotoCreditsList srcs={['/images/hero-wildlife.webp']} />
    </>
  )
}
