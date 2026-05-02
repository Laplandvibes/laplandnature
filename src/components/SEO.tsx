import { useEffect } from 'react'

const SITE_URL = 'https://laplandnature.com'
const DEFAULT_OG = 'https://laplandnature.com/images/hero-home.webp'

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
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SEO({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG,
  keywords,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    document.title = title
    const canonical = `${SITE_URL}${canonicalPath}`

    upsertMeta('meta[name="description"]', 'name', 'description', description)
    if (keywords?.length) {
      upsertMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '))
    }
    upsertLink('canonical', canonical)

    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'LaplandNature')
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
    upsertMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    upsertMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_US')

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)
    upsertMeta('meta[name="twitter:site"]', 'name', 'twitter:site', '@laplandvibes')

    const existing = document.querySelectorAll('script[data-seo-jsonld]')
    existing.forEach((el) => el.remove())
    if (jsonLd) {
      const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      data.forEach((obj) => {
        const s = document.createElement('script')
        s.type = 'application/ld+json'
        s.setAttribute('data-seo-jsonld', 'true')
        s.textContent = JSON.stringify(obj)
        document.head.appendChild(s)
      })
    }
  }, [title, description, canonicalPath, ogImage, keywords, jsonLd])

  return null
}

export { SITE_URL, DEFAULT_OG }
