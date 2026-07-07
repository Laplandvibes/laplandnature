import { useLocation } from 'react-router-dom'

export type Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl'

export function useLang(): Lang {
  const { pathname } = useLocation()
  if (pathname === '/fi' || pathname.startsWith('/fi/')) return 'fi'
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de'
  if (pathname === '/ja' || pathname.startsWith('/ja/')) return 'ja'
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es'
  if (pathname === '/br' || pathname.startsWith('/br/')) return 'pt-BR'
  if (pathname === '/cn' || pathname.startsWith('/cn/')) return 'zh-CN'
  if (pathname === '/kr' || pathname.startsWith('/kr/')) return 'ko'
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr'
  if (pathname === '/it' || pathname.startsWith('/it/')) return 'it'
  if (pathname === '/nl' || pathname.startsWith('/nl/')) return 'nl'
  return 'en'
}

export const LANG_PREFIX: Record<Lang, string> = {
  en: '',
  fi: 'fi',
  de: 'de',
  ja: 'ja',
  es: 'es',
  'pt-BR': 'br',
  'zh-CN': 'cn',
  ko: 'kr',
  fr: 'fr',
  it: 'it',
  nl: 'nl',
}

export function langPrefix(lang: Lang): string {
  const seg = LANG_PREFIX[lang]
  return seg ? `/${seg}` : ''
}

export function useLocalePath() {
  const lang = useLang()
  return (path: string): string => {
    if (lang === 'en') return path
    const prefix = langPrefix(lang)
    if (path === '/') return prefix
    return `${prefix}${path.startsWith('/') ? path : `/${path}`}`
  }
}

export function useHtmlLang(): string {
  const lang = useLang()
  if (lang === 'fi') return 'fi-FI'
  if (lang === 'de') return 'de-DE'
  if (lang === 'ja') return 'ja-JP'
  if (lang === 'es') return 'es-ES'
  if (lang === 'pt-BR') return 'pt-BR'
  if (lang === 'zh-CN') return 'zh-CN'
  if (lang === 'ko') return 'ko-KR'
  if (lang === 'fr') return 'fr-FR'
  if (lang === 'it') return 'it-IT'
  if (lang === 'nl') return 'nl-NL'
  return 'en-US'
}
