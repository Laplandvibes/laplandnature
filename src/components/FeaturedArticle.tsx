import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PhotoCredit from './PhotoCredit'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import { trackPartnerClick } from '../lib/analytics'

/**
 * Etusivun juttunosto (Vesa 4.10.2026): etusivulla oli Bear Kuusamon mainos kahdesti,
 * kumppanikortti A ylempänä ja sama mainos tummana kaistana GetYourGuide-osion alla.
 * *"poista alempi. etusivulla voisi olla myös linkki artikkeliin vaikka sen tilalla."*
 *
 * Tämä on toimituksellinen nosto, ei mainos: kuva on jutun oma (puu-kuva, ei mainoksen
 * heroa, jottei sama kuva toistu sivulla), ainoa linkki vie sivuston omaan juttuun
 * /bear-kuusamo eikä kumppanille, eikä sävy ole pinkki myynti-CTA. Kaupallisen
 * yhteistyön merkintä on silti näkyvissä, koska juttu on maksettu (KKV: markkinointi
 * on tunnistettava myös linkin päässä).
 *
 * Kaikki teksti on jutun omaa, jo käännettyä copyä (COPY[lang].bearKuusamo) ja
 * uutisosion "Lue juttu" -merkkijonoja. Uutta käännettävää ei ole.
 */
const READ_MORE: Record<string, string> = {
  en: 'Read the story',
  fi: 'Lue juttu',
  de: 'Beitrag lesen',
  ja: '記事を読む',
  es: 'Leer el artículo',
  'pt-BR': 'Ler a matéria',
  'zh-CN': '阅读全文',
  ko: '기사 읽기',
  fr: "Lire l'article",
  it: "Leggi l'articolo",
  nl: 'Lees het artikel',
  sv: 'Läs artikeln',
}

const BEAR_GREEN = '#007E2E'
const IMAGE = '/images/bear-kuusamo-tree.webp'

export default function FeaturedArticle() {
  const lang = useLang()
  const to = useLocalePath()
  const c = COPY[lang].bearKuusamo

  return (
    <section className="px-4 sm:px-6 pb-16 sm:pb-20">
      <div className="max-w-6xl mx-auto">
        <Link
          to={to('/bear-kuusamo/')}
          onClick={() => trackPartnerClick('home_article_teaser')}
          className="group grid overflow-hidden rounded-3xl bg-white ring-1 ring-deep-night/10 shadow-[0_24px_56px_-32px_rgba(15,23,42,0.5)] no-underline transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_64px_-32px_rgba(15,23,42,0.6)] lg:grid-cols-[5fr_7fr]"
        >
          <div className="relative aspect-[3/2] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
            <img
              src={IMAGE}
              alt={`${c.treeCaption} ${c.photoCredit}`}
              loading="lazy"
              decoding="async"
              width={1200}
              height={819}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <PhotoCredit src={IMAGE} plain />
          </div>

          <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{ color: BEAR_GREEN, backgroundColor: 'rgba(0,126,46,0.08)', border: '1px solid rgba(0,126,46,0.28)' }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BEAR_GREEN }} aria-hidden="true" />
              {c.partnership}
            </span>

            <h2 className="font-heading text-4xl leading-[1.05] tracking-wider text-deep-night">
              {c.hero.title} <span className="text-[#047857]">{c.hero.subtitle}</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-deep-night/75">
              {c.hero.description}
            </p>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-deep-night px-6 py-3 text-sm font-semibold text-snow transition-colors group-hover:bg-[#047857]">
              {READ_MORE[lang] ?? READ_MORE.en}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
