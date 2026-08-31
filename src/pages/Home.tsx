import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Trees, Sparkles, Sun } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HeroImage from '../components/HeroImage'
import LaplandMap from '../components/LaplandMap'
import Newsletter from '../components/Newsletter'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import HomeAdSlots, { MainPartnerBanner } from '../shared/HomeAdSlots'
import AdUnit from '../shared/ads/AdUnit'
import bearKuusamoAd from '../shared/ads/advertisers/bearkuusamo'
import { trackPartnerClick } from '../lib/analytics'
import { AD_SLOTS } from '../data/adSlots'
import GygPicks from '../components/GygPicks';
import { AppPromoHero } from '../components/AppPromo';

const cardImages = [
  'card-national-parks.webp',
  'card-wildlife.webp',
  'card-northern-lights.webp',
  'card-hiking.webp',
  'card-conservation.webp',
  'card-midnight-sun.webp',
  'card-freshwater.webp',
]

const cardHrefs = [
  '/national-parks',
  '/wildlife',
  '/northern-lights',
  '/hiking-trails',
  '/conservation',
  '/seasons',
  '/freshwater',
]

const cardTagBgs = [
  'bg-emerald-500',
  'bg-emerald-500',
  'bg-emerald-500',
  'bg-emerald-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-sky-500',
]

const ICONS = [Compass, Trees, Sun, Sparkles]

const HOME_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Finnish Lapland: Arctic Wilderness',
    description:
      'Finnish Lapland: 100,367 km² of arctic country above the Arctic Circle. Northern lights, seven national parks, wildlife, hiking trails and four distinct seasons.',
    touristType: ['Nature lovers', 'Hikers', 'Aurora chasers', 'Wildlife photographers'],
    url: 'https://laplandnature.com/',
    geo: { '@type': 'GeoCoordinates', latitude: 67.5, longitude: 26.0 },
    containsPlace: [
      { '@type': 'TouristAttraction', name: 'Urho Kekkonen National Park' },
      { '@type': 'TouristAttraction', name: 'Pallas-Yllästunturi National Park' },
      { '@type': 'TouristAttraction', name: 'Lemmenjoki National Park' },
      { '@type': 'TouristAttraction', name: 'Riisitunturi National Park' },
      { '@type': 'TouristAttraction', name: 'Pyhä-Luosto National Park' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://laplandnature.com/',
    name: 'LaplandNature',
    publisher: { '@type': 'Organization', name: 'LaPeso Oy' },
  },
]

export default function Home() {
  const lang = useLang()
  const c = COPY[lang].home
  const to = useLocalePath()
  // LV:n omat mainospaikat vain fi/en/sv — muilla kielillä ne olisivat
  // kohdeyleisölle turhia (sama portti kuin /wildlife-sijoittelussa).

  const featured = c.featured.items.map((it, i) => ({
    href: to(cardHrefs[i]),
    image: cardImages[i],
    tag: it.tag,
    tagBg: cardTagBgs[i],
    title: it.title,
    blurb: it.blurb,
    cta: it.cta,
  }))

  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath="/"
        keywords={['lapland nature', 'finnish lapland wilderness', 'arctic circle finland', 'lapland national parks', 'lapland northern lights', 'lapland hiking trails']}
        jsonLd={HOME_JSONLD}
      />

      <HeroImage
        image="hero-home.webp"
        size="xl"
        priority
        alt={c.hero.alt}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        description={c.hero.description}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={to('/northern-lights')}
            className="inline-flex items-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            {c.hero.primaryCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to={to('/national-parks')}
            className="inline-flex items-center gap-2 text-snow/95 hover:text-snow bg-deep-night/30 hover:bg-deep-night/40 border border-snow/30 hover:border-snow/60 backdrop-blur-sm px-7 py-3.5 rounded-full transition-colors"
          >
            {c.hero.secondaryCta}
          </Link>
        </div>
      </HeroImage>

      {/* PÄÄKUMPPANI-banneri heti heron alla — sivun paras mainospaikka,
          tyhjänä kompakti house-ad → LV Media -portaali (cream-tausta → light) */}
      <MainPartnerBanner config={AD_SLOTS} locale={lang} surface="light" />

      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #0F172A 0%, #07254e 18%, #002F6C 50%, #07254e 82%, #0F172A 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 h-px"
          style={{
            top: '80px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.55) 25%, rgba(167,139,250,0.55) 50%, rgba(236,72,153,0.55) 75%, transparent 100%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="text-aurora-green uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold mb-4">
              {c.band.kicker}
            </p>
            <p className="font-heading text-3xl sm:text-5xl md:text-6xl text-snow tracking-wider leading-[1.05]">
              {c.band.h}<span className="text-aurora-green">{c.band.hHighlight}</span>{c.band.hSuffix}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-snow/10 rounded-2xl overflow-hidden border border-snow/15">
            {c.band.stats.map((s, i) => {
              const Icon = ICONS[i]
              return (
                <div
                  key={s.primary}
                  className="bg-finland-blue/95 backdrop-blur-sm p-6 sm:p-7 flex flex-col gap-3 items-center text-center sm:items-start sm:text-left"
                >
                  <Icon className="w-5 h-5 text-aurora-green" />
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl text-snow tracking-wider leading-none">
                      {s.value}
                    </div>
                    <div className="font-heading text-aurora-green text-base sm:text-lg tracking-wide mt-1.5">
                      {s.primary}
                    </div>
                    <div className="text-snow/65 text-xs sm:text-sm leading-snug mt-1.5">
                      {s.body}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 h-px"
          style={{
            bottom: '80px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(236,72,153,0.45) 25%, rgba(16,185,129,0.45) 50%, rgba(167,139,250,0.45) 75%, transparent 100%)',
          }}
        />
      </section>
      {/* App launch block, directly under the site's own opening. At the foot
          of the page it measured 81 % down a 33 000 px front page, and an
          announcement nobody scrolls to is not an announcement. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppPromoHero />
      </div>




      {/* Kumppaniosio heti ensimmäisen sisältöosion (tilastoband) jälkeen:
          kakkospääkumppani + 6 premium-paikkaa — pääkumppanit eivät näy
          vierekkäin (banneri ↑ heron alla). Cream-tausta → surface="light". */}
      <HomeAdSlots config={AD_SLOTS} locale={lang} surface="light" />

      {/* Varattavat GYG-tuotteet — korkealla sivulla mutta myytyjen mainospaikkojen ALAPUOLELLA */}
      <GygPicks />


      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.featured.kicker}</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-deep-night tracking-wider mb-4">
              {c.featured.h2}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-5" aria-hidden="true">
              <span className="h-px w-10 bg-aurora-green/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-green" />
              <span className="h-px w-10 bg-aurora-green/50" />
            </div>
            <p className="text-deep-night/65 text-base sm:text-lg max-w-2xl mx-auto">
              {c.featured.lead}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((f) => (
              <Link
                key={f.href}
                to={f.href}
                className="group rounded-2xl overflow-hidden border border-deep-night/10 bg-snow hover:shadow-xl hover:border-aurora-green/40 transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* AVIF siblings for these seven cards existed but nothing
                      pointed at them, so the WebP was always served. */}
                  <picture>
                    <source type="image/avif" srcSet={`/images/${f.image.replace(/\.webp$/, '.avif')}`} />
                    <img
                      src={`/images/${f.image}`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={1280}
                      height={800}
                    />
                  </picture>
                  <span className={`absolute top-3 left-3 ${f.tagBg} text-snow text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md`}>
                    {f.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-2xl text-deep-night tracking-wide mb-3">{f.title}</h3>
                  <p className="text-deep-night/70 text-sm leading-relaxed mb-5 flex-1">{f.blurb}</p>
                  <span className="block w-full text-center bg-finland-blue text-snow font-semibold text-sm px-5 py-3 rounded-lg group-hover:bg-vibe-pink transition-colors">
                    {f.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Maksettu kumppanipaikka etusivulla (Vesa 2026-07-26): "nature-sivulla
          voisi olla etusivulla jo tuo mainos, koska siten se herättää huomiota ja
          muut yrittäjät uskaltautuvat mukaan" — eli näyteikkuna sekä Bear
          Kuusamolle että myytäville paikoille. Sama dark-band-käsittely kuin
          /wildlife-sijoittelussa: valkoinen kortti katoaisi cream-taustaan, joten
          variant="dark" oman deep-night-kaistan sisällä. Kieliportti kuten kaikki
          LV:n omat mainospaikat (fi/en/sv). */}
      {/* Maksettu kumppanimainos näkyy KAIKILLA 12 kielellä (Vesa 2026-07-30):
          speksi kantaa nyt täydet käännökset, joten kieliporttia ei tarvita. */}
      {(
        <section className="px-4 sm:px-6 py-12 sm:py-16 bg-deep-night">
          <div className="max-w-6xl mx-auto">
            <AdUnit
              spec={bearKuusamoAd}
              sid="home_featured_below"
              lang={lang}
              variant="dark"
              imageSrc="/images/hero-bear-kuusamo.webp"
              articleHref={to('/bear-kuusamo')}
              onArticleClick={(_k, sid) => trackPartnerClick(`ad_article:${sid}`)}
              onCtaClick={(_specKey, sid) => trackPartnerClick(`ad_unit:${sid}`)}
            />
          </div>
        </section>
      )}

      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-snow border-y border-deep-night/8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">{c.map.kicker}</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-deep-night tracking-wider mb-4">
              {c.map.h2}
            </h2>
            <p className="text-deep-night/65 text-base sm:text-lg max-w-2xl mx-auto">
              {c.map.lead}
            </p>
          </div>
          <LaplandMap />
          <p className="text-deep-night/50 text-xs text-center mt-4">
            {c.map.foot}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-50 via-cream to-cyan-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            {c.ctaBand.h2}
          </h2>
          <p className="text-deep-night/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            {c.ctaBand.lead}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateCTA
              partner="hotels"
              sid="home_cta_base"
              destination="Saariselkä, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              {c.ctaBand.primary}
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="home_cta_activity"
              destination="lappi-suomi-l2652"
              className="inline-flex items-center justify-center gap-2 bg-aurora-green hover:bg-emerald-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              {c.ctaBand.secondary}
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
          </div>
        </div>
      </section>


      <Newsletter />
    </>
  )
}
