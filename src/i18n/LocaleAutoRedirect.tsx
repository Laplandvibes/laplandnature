import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Lang } from './useLang'
import { langPrefix } from './useLang'

const STORAGE_KEY = 'lv_locale_choice'
const KNOWN: readonly Lang[] = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv']

export default function LocaleAutoRedirect() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname !== '/') return

    const stored =
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem(STORAGE_KEY)
        : null

    let target: Lang = 'en'

    if (stored && (KNOWN as readonly string[]).includes(stored)) {
      target = stored as Lang
    } else if (typeof navigator !== 'undefined') {
      const lang = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase()
      if (lang.startsWith('fi')) target = 'fi'
      else if (lang.startsWith('de')) target = 'de'
      else if (lang.startsWith('ja')) target = 'ja'
      else if (lang.startsWith('es')) target = 'es'
      else if (lang.startsWith('pt')) target = 'pt-BR'
      else if (lang.startsWith('zh')) target = 'zh-CN'
      else if (lang.startsWith('ko')) target = 'ko'
      else if (lang.startsWith('fr')) target = 'fr'
      else if (lang.startsWith('it')) target = 'it'
      else if (lang.startsWith('nl')) target = 'nl'
      else if (lang.startsWith('sv')) target = 'sv'
    }

    if (target === 'en') return
    const prefix = langPrefix(target)
    if (prefix) navigate(prefix, { replace: true })
  }, [pathname, navigate])

  return null
}
