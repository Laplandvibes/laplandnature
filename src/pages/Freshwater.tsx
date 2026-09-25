import { Link } from 'react-router-dom'
import { Droplets, Waves, Sprout, TreePine, Fish, HelpCircle, Plus, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'
import HeroImage from '../components/HeroImage'
import PhotoCredit from '../components/PhotoCredit'
import HubLink from '../components/HubLink'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import FaqLinks, { type FaqNavKey } from '../components/FaqLinks'

const FRESHWATER_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Freshwater Lapland: lakes, free-flowing rivers, aapa mires and the fish they support',
  description:
    "Why clean cold water is Lapland's rarest asset: 188,000 lakes (SYKE), the unregulated Tornio-Muonio river system, aapa mires and the forests that keep the water cold.",
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'LaPeso Oy' },
  datePublished: '2026-07-11',
  dateModified: '2026-09-26',
  mainEntityOfPage: 'https://laplandnature.com/freshwater',
  image: 'https://laplandnature.com/images/hero-freshwater.webp',
}

// Per-question cross-pillar links backing each FAQ answer (index-aligned with
// copy.en.ts freshwater.faq.items; see FaqLinks.tsx).
const FAQ_LINKS: FaqNavKey[][] = [[], ['conservation'], ['conservation'], [], ['conservation']]

/**
 * Kuvien vaihtoehtoiset tekstit kielittäin (26.9.2026). Aiemmin nämä olivat kovakoodattuna
 * englanniksi kaikilla 12 kielellä, ja ne kuvasivat tekoälykuvia. Järjestys: lakes, rivers,
 * mires, forests. Kuvien lähteet: src/data/photoCredits.ts.
 */
const CHAPTER_ALTS: Record<string, [string, string, string, string]> = {
  "en": [
    "Islands in Lake Inari seen from Ukko island",
    "The Tornio river at the Korpikoski rapids in Pello in July",
    "Sunset over a bog pond in Kemijärvi in September",
    "The Alajoki river in snowy forest in Inari in November"
  ],
  "fi": [
    "Inarijärven saaria Ukonsaaren näköalapaikalta",
    "Tornionjoki Korpikoskella Pellossa heinäkuussa",
    "Auringonlasku suolammen yllä Kemijärvellä syyskuussa",
    "Alajoki lumisessa metsässä Inarissa marraskuussa"
  ],
  "de": [
    "Inseln im Inarisee, von der Insel Ukko aus gesehen",
    "Der Tornionjoki an der Stromschnelle Korpikoski in Pello im Juli",
    "Sonnenuntergang über einem Moorteich in Kemijärvi im September",
    "Der Fluss Alajoki im verschneiten Wald in Inari im November"
  ],
  "sv": [
    "Öar i Enare träsk sedda från ön Ukko",
    "Torne älv vid forsen Korpikoski i Pello i juli",
    "Solnedgång över en myrtjärn i Kemijärvi i september",
    "Alajoki i snöig skog i Enare i november"
  ],
  "fr": [
    "Îles du lac Inari vues depuis l'île d'Ukko",
    "La Tornionjoki aux rapides de Korpikoski, à Pello, en juillet",
    "Coucher de soleil sur un étang de tourbière à Kemijärvi en septembre",
    "La rivière Alajoki dans une forêt enneigée à Inari en novembre"
  ],
  "it": [
    "Isole del lago Inari viste dall'isola di Ukko",
    "Il fiume Tornionjoki alle rapide di Korpikoski, a Pello, a luglio",
    "Tramonto su uno stagno di torbiera a Kemijärvi a settembre",
    "Il fiume Alajoki in un bosco innevato a Inari a novembre"
  ],
  "es": [
    "Islas del lago Inari vistas desde la isla de Ukko",
    "El río Tornionjoki en los rápidos de Korpikoski, en Pello, en julio",
    "Atardecer sobre una laguna de turbera en Kemijärvi en septiembre",
    "El río Alajoki en un bosque nevado en Inari en noviembre"
  ],
  "pt-BR": [
    "Ilhas do lago Inari vistas da ilha de Ukko",
    "O rio Tornionjoki nas corredeiras de Korpikoski, em Pello, em julho",
    "Pôr do sol sobre um lago de turfeira em Kemijärvi em setembro",
    "O rio Alajoki em uma floresta nevada em Inari em novembro"
  ],
  "nl": [
    "Eilanden in het Inarimeer, gezien vanaf het eiland Ukko",
    "De Tornionjoki bij de stroomversnelling Korpikoski in Pello in juli",
    "Zonsondergang boven een veenplas in Kemijärvi in september",
    "De rivier Alajoki in besneeuwd bos in Inari in november"
  ],
  "ja": [
    "ウッコ島から見たイナリ湖の島々",
    "7月、ペッロのコルピコスキ急流を流れるトルニオ川",
    "9月、ケミヤルヴィの沼の池に沈む夕日",
    "11月、イナリの雪の森を流れるアラヨキ川"
  ],
  "ko": [
    "우코섬에서 바라본 이나리 호수의 섬들",
    "7월 펠로의 코르피코스키 급류를 지나는 토르니오강",
    "9월 케미야르비 늪 연못 위의 일몰",
    "11월 이나리의 눈 덮인 숲을 흐르는 알라요키강"
  ],
  "zh-CN": [
    "从 Ukko 岛眺望伊纳里湖中的岛屿",
    "7 月，佩洛 Korpikoski 急流处的托尔尼奥河",
    "9 月，Kemijärvi 沼泽池塘上空的日落",
    "11 月，伊纳里雪林中的 Alajoki 河"
  ]
}

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

  const alts = CHAPTER_ALTS[lang] ?? CHAPTER_ALTS.en
  const chapters = [
    { key: 'lakes' as const, icon: Droplets, accent: 'text-sky-700', bg: 'bg-sky-500/10', data: c.lakes, alt: alts[0] },
    { key: 'rivers' as const, icon: Waves, accent: 'text-aurora-green', bg: 'bg-aurora-green/10', data: c.rivers, alt: alts[1] },
    { key: 'mires' as const, icon: Sprout, accent: 'text-emerald-700', bg: 'bg-emerald-500/10', data: c.mires, alt: alts[2] },
    { key: 'forests' as const, icon: TreePine, accent: 'text-emerald-800', bg: 'bg-emerald-600/10', data: c.forests, alt: alts[3] },
  ]

  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath="/freshwater"
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
                <article key={ch.key} className="rounded-2xl border border-deep-night/10 bg-snow overflow-hidden hover:shadow-md hover:border-aurora-green/40 transition-all flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <PhotoCredit src={`/images/freshwater-${ch.key}.webp`} />
                    <img
                      src={`/images/freshwater-${ch.key}.webp`}
                      alt={ch.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      width={1400}
                      height={875}
                    />
                  </div>
                  <div className="p-6 sm:p-7">
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
                  </div>
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
