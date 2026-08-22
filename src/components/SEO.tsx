// 2026-05-21: locale-aware — hreflang × 11 + og:locale + JSON-LD inLanguage.
import { useEffect } from 'react'
import { useLang, type Lang } from '../i18n/useLang'

const SITE_URL = 'https://laplandnature.com'
const DEFAULT_OG = 'https://laplandnature.com/images/hero-home.webp'
const SITE_NAME = 'LaplandNature'

const SUPPORTED: Lang[] = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv']

const URL_PREFIX_OF: Record<Lang, string> = {
  en: '', fi: '/fi', de: '/de', ja: '/ja', es: '/es',
  'pt-BR': '/br', 'zh-CN': '/cn', ko: '/kr', fr: '/fr', it: '/it', nl: '/nl', sv: '/sv',
}
const BCP47: Record<Lang, string> = {
  en: 'en-US', fi: 'fi-FI', de: 'de-DE', ja: 'ja-JP', es: 'es-ES',
  'pt-BR': 'pt-BR', 'zh-CN': 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE',
}
const OG_LOCALE: Record<Lang, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP', es: 'es_ES',
  'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN', ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE',
}

interface SEOProps {
  title: string
  description: string
  canonicalPath: string
  ogImage?: string
  keywords?: string[]
  jsonLd?: object | object[]
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]:not([hreflang])`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function injectInLanguage(node: unknown, bcp47: string): unknown {
  if (Array.isArray(node)) return node.map((n) => injectInLanguage(n, bcp47))
  if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>
    if (o['@type'] && o.inLanguage === undefined) o.inLanguage = bcp47
    if (Array.isArray(o['@graph'])) o['@graph'] = (o['@graph'] as unknown[]).map((n) => injectInLanguage(n, bcp47))
    return o
  }
  return node
}

export default function SEO({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG,
  keywords,
  jsonLd,
}: SEOProps) {
  const lang = useLang()
  const prefix = URL_PREFIX_OF[lang]
  const bcp47 = BCP47[lang]
  const ogLocale = OG_LOCALE[lang]

  // JSON-LD is rendered as real <script> elements below (React 19 hoists them to
  // <head>) so the schema lands in the prerendered static HTML — a useEffect
  // injection does not run during SSG/prerender.
  const jsonLdItems = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map(
        (obj) => injectInLanguage(JSON.parse(JSON.stringify(obj)), bcp47) as object,
      )
    : []

  useEffect(() => {
    document.title = title
    // Trailing-slash form matches the prerendered static HTML (Cloudflare Pages
    // serves /path/index.html at /path/ with 200; the no-slash form 308-redirects).
    const canonical = `${SITE_URL}${prefix}${canonicalPath}`.replace(/\/?$/, '/')

    upsertMeta('meta[name="description"]', 'name', 'description', description)
    if (keywords?.length) {
      upsertMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '))
    }
    upsertLink('canonical', canonical)
    document.documentElement.lang = bcp47

    // hreflang × 11 + x-default — short codes (en, fi, pt-BR, …) + trailing-slash
    // hrefs: must match the prerenderer (_prerender_routes.mjs) and sitemap.xml exactly.
    document.head.querySelectorAll('link[rel="alternate"][data-seo-hreflang]').forEach((el) => el.remove())
    SUPPORTED.forEach((l) => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'alternate')
      link.setAttribute('hreflang', l)
      link.setAttribute('href', `${SITE_URL}${URL_PREFIX_OF[l]}${canonicalPath}`.replace(/\/?$/, '/'))
      link.setAttribute('data-seo-hreflang', 'true')
      document.head.appendChild(link)
    })
    const xDefault = document.createElement('link')
    xDefault.setAttribute('rel', 'alternate')
    xDefault.setAttribute('hreflang', 'x-default')
    xDefault.setAttribute('href', `${SITE_URL}${canonicalPath}`.replace(/\/?$/, '/'))
    xDefault.setAttribute('data-seo-hreflang', 'true')
    document.head.appendChild(xDefault)

    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
    upsertMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    upsertMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', ogLocale)

    // og:locale:alternate × 10 others
    document.head.querySelectorAll('meta[property="og:locale:alternate"][data-seo-og]').forEach((el) => el.remove())
    SUPPORTED.filter((l) => l !== lang).forEach((l) => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:locale:alternate')
      m.setAttribute('content', OG_LOCALE[l])
      m.setAttribute('data-seo-og', 'true')
      document.head.appendChild(m)
    })

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)
    upsertMeta('meta[name="twitter:site"]', 'name', 'twitter:site', '@laplandvibes')
  }, [title, description, canonicalPath, ogImage, keywords, prefix, bcp47, ogLocale, lang])

  return (
    <>
      {jsonLdItems.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
    </>
  )
}

export { SITE_URL, DEFAULT_OG }
