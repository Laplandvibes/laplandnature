/**
 * Uutisosion SIVUSTOSOVITIN — laplandnature.com.
 *
 * Osio on kopioitu laplandflights.fi:stä (18.9.2026), jossa se rakennettiin MALLIKSI
 * tälle sivustolle. Kaikki muu src/news/:ssä on tavu tavulta sama: tietomalli,
 * rekisteri, kortit, runko, portti. Vain tämä tiedosto + news.css + embeds.tsx
 * tuntevat sivuston.
 *
 * Neljä eroa flightsiin, kaikki sivuston omasta rakenteesta:
 *  1. Navi ja alatunniste tulevat App.tsx:stä (flightsissa sivu piirtää ne itse)
 *     ⇒ NewsChrome kääriytyy vain omaan juurielementtiinsä.
 *  2. Otsikot ja metat menevät sivuston omalla <SEO>-komponentilla, joka on
 *     komponentti eikä hookki ⇒ useNewsHead palauttaa ReactNoden, ei objektilistaa.
 *     NewsIndex/NewsArticle renderöivät sen sellaisenaan.
 *  3. Murupolun JSON-LD rakennetaan tässä (flightsin usePageMeta teki sen itse).
 *  4. Jutun alle ei tule mainosruudukkoa: tällä sivustolla ei ole sellaista pintaa,
 *     eikä uutisjuttuun lisätä sellaista vain siksi että malli tuntee sen.
 */
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import type { NewsBlock, NewsMeta } from './types'
import { FenceFigure } from './embeds'
import './news.css'

export const SITE = {
  name: 'LaplandNature',
  origin: 'https://laplandnature.com',
  /** Osion polku ilman kieliprefiksiä. Sama arvo scripts/news-prerender.mjs:ssä. */
  path: '/news',
} as const

/** Sivuston omat aihesivut jutun perään — sama linkkijoukko kuin alatunnisteessa. */
function MorePages({ current }: { current: string }) {
  const lang = useLang()
  const to = useLocalePath()
  const c = COPY[lang]
  const items = [
    { href: '/northern-lights', label: c.nav.northernLights },
    { href: '/national-parks', label: c.nav.nationalParks },
    { href: '/wildlife', label: c.nav.wildlife },
    { href: '/hiking-trails', label: c.nav.hiking },
    { href: '/seasons', label: c.nav.seasons },
    { href: '/conservation', label: c.nav.conservation },
    { href: '/freshwater', label: c.nav.freshwater },
  ].filter((i) => !current.startsWith(i.href))
  return (
    <nav className="nw-morepages" aria-label={SITE.name}>
      <div className="nw-wrap">
        <ul>
          {items.map((i) => (
            <li key={i.href}><Link to={to(i.href)}>{i.label}</Link></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export function NewsChrome({ current, children }: { current: string; children: ReactNode }) {
  return (
    <div className="nw">
      {children}
      <MorePages current={current} />
    </div>
  )
}

/**
 * Sivun otsikko, metat, kanoninen, hreflang ja JSON-LD. Palauttaa elementin, jonka
 * sivu renderöi: sivuston <SEO> hoitaa headin efektissä ja latoo JSON-LD:n
 * <script>-elementteinä, jotka React 19 nostaa headiin myös esirenderöinnissä.
 */
export function useNewsHead(m: {
  title: string
  description: string
  path: string
  image?: string
  breadcrumbs: { name: string; path: string }[]
  jsonLd?: unknown[]
}): ReactNode {
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: m.breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE.origin}${b.path}`.replace(/\/?$/, '/'),
    })),
  }
  return (
    <SEO
      title={m.title}
      description={m.description}
      canonicalPath={m.path}
      ogImage={m.image}
      jsonLd={[crumbs, ...((m.jsonLd ?? []) as object[])]}
    />
  )
}

export function renderEmbed(block: Extract<NewsBlock, { t: 'embed' }>, meta: NewsMeta): ReactNode {
  const cfg = meta.embeds?.[block.id]
  if (!cfg) return null
  if (cfg.type === 'fence') return <FenceFigure config={cfg} block={block} />
  return null
}

/** Tällä sivustolla ei ole jutun alle tulevaa mainosruudukkoa. */
export function NewsAds(_: { meta: NewsMeta }) {
  return null
}

export function NotFoundPage() {
  return (
    <div className="nw">
      <header className="nw-head">
        <div className="nw-wrap">
          <h1 className="nw-h1">404</h1>
        </div>
      </header>
    </div>
  )
}
