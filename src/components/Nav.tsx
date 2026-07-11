import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import EcosystemMenu from '../../../shared/EcosystemMenu'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langWrapRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const lang = useLang()
  const to = useLocalePath()
  const c = COPY[lang].nav

  const links = [
    { href: to('/national-parks'), label: c.nationalParks },
    { href: to('/hiking-trails'), label: c.hiking },
    { href: to('/wildlife'), label: c.wildlife },
    { href: to('/northern-lights'), label: c.northernLights },
    { href: to('/seasons'), label: c.seasons },
    { href: to('/conservation'), label: c.conservation },
    { href: to('/freshwater'), label: c.freshwater },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false); setLangOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!langOpen) return
    const onClick = (e: MouseEvent) => {
      if (!langWrapRef.current?.contains(e.target as Node)) setLangOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLangOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

  const isHome = location.pathname === '/' || location.pathname === '/fi' || location.pathname === '/de'
  // On Home: transparent over Hero gradient, switches to opaque on scroll.
  // Other pages: opaque immediately so the cream page bg has a clear nav band.
  const opaque = scrolled || !isHome
  const logoVariant = opaque ? 'light' : 'dark'

  type LangCode = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl'
  const URL_PREFIX_OF: Record<LangCode, string> = {
    en: '', fi: 'fi', de: 'de', ja: 'ja', es: 'es', 'pt-BR': 'br', 'zh-CN': 'cn',
    ko: 'kr', fr: 'fr', it: 'it', nl: 'nl',
  }
  const ALL_LANGS: { code: LangCode; label: string; native: string }[] = [
    { code: 'en', label: 'EN', native: 'English' },
    { code: 'fi', label: 'FI', native: 'Suomi' },
    { code: 'de', label: 'DE', native: 'Deutsch' },
    { code: 'ja', label: 'JA', native: '日本語' },
    { code: 'es', label: 'ES', native: 'Español' },
    { code: 'pt-BR', label: 'BR', native: 'Português' },
    { code: 'zh-CN', label: 'CN', native: '简体中文' },
    { code: 'ko', label: 'KR', native: '한국어' },
    { code: 'fr', label: 'FR', native: 'Français' },
    { code: 'it', label: 'IT', native: 'Italiano' },
    { code: 'nl', label: 'NL', native: 'Nederlands' },
  ]

  const switchTo = (target: LangCode) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('lv_locale_choice', target)
    }
    const path = location.pathname
    const bare = path.replace(/^\/(fi|de|ja|es|br|cn|kr|fr|it|nl)(?=\/|$)/, '') || '/'
    const prefix = URL_PREFIX_OF[target]
    if (!prefix) navigate(bare)
    else navigate(bare === '/' ? `/${prefix}` : `/${prefix}${bare}`)
  }

  const currentLangLabel = ALL_LANGS.find((l) => l.code === lang)?.label ?? 'EN'

  const LangDropdown = ({ dark }: { dark: boolean }) => (
    <div className="relative" ref={langWrapRef}>
      <button
        type="button"
        onClick={() => setLangOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={langOpen}
        aria-label="Switch language"
        className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide px-2.5 py-1 rounded-md border transition-colors ${
          dark
            ? 'text-snow border-snow/40 hover:bg-snow/10'
            : 'text-deep-night/80 border-deep-night/20 hover:border-vibe-pink hover:text-vibe-pink'
        }`}
      >
        <Globe className="w-3.5 h-3.5" />
        {currentLangLabel}
        <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
      </button>
      {langOpen && (
        <ul
          role="listbox"
          aria-label="Language"
          className={`absolute right-0 top-full mt-2 min-w-[180px] py-1 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto border ${
            dark
              ? 'bg-deep-night/95 backdrop-blur-md border-white/15'
              : 'bg-cream backdrop-blur-md border-deep-night/15'
          }`}
        >
          {ALL_LANGS.map((item) => {
            const isActive = item.code === lang
            return (
              <li key={item.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => { switchTo(item.code); setLangOpen(false) }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-vibe-pink/15 text-vibe-pink font-semibold'
                      : dark
                        ? 'text-snow/85 hover:bg-white/5 hover:text-snow'
                        : 'text-deep-night/85 hover:bg-vibe-pink/5 hover:text-vibe-pink'
                  }`}
                >
                  <span className="w-8 font-semibold text-xs tracking-wider">{item.label}</span>
                  <span>{item.native}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          opaque
            ? 'bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_rgba(15,23,42,0.06)] border-b border-deep-night/10'
            : 'bg-gradient-to-b from-deep-night/40 to-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <EcosystemMenu lang={lang} currentDomain="laplandnature.com" variant={opaque ? 'light' : 'dark'} />
            <Link to={to('/')} className="flex items-center shrink-0" aria-label="LaplandNature home">
              <Logo variant={logoVariant} size="md" />
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-0.5">
            {links.map((l) => {
              const active = location.pathname === l.href
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'text-vibe-pink bg-vibe-pink/10'
                      : opaque
                        ? 'text-deep-night/80 hover:text-vibe-pink hover:bg-vibe-pink/5'
                        : 'text-snow/90 hover:text-snow hover:bg-snow/10'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
            <div className={`ml-2 pl-3 border-l ${opaque ? 'border-deep-night/15' : 'border-snow/20'}`}>
              <LangDropdown dark={!opaque} />
            </div>
          </div>

          <div className="xl:hidden flex items-center gap-2">
            <div className="relative inline-flex items-center">
              <select
                value={lang}
                onChange={(e) => switchTo(e.target.value as LangCode)}
                aria-label="Language"
                className={`appearance-none bg-transparent border rounded pl-2 pr-6 py-1 text-xs font-semibold uppercase ${opaque ? 'border-deep-night/30 text-deep-night' : 'border-snow/40 text-snow'}`}
              >
                {ALL_LANGS.map((l) => (
                  <option key={l.code} value={l.code} className="bg-cream text-deep-night">
                    {l.label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 ${opaque ? 'text-deep-night' : 'text-snow'}`} />
            </div>
            <button
              className={`p-2 rounded-lg transition-colors ${opaque ? 'text-deep-night' : 'text-snow'}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="xl:hidden fixed inset-0 z-40 pt-16 bg-cream overflow-y-auto">
          <div className="flex flex-col p-5 gap-1">
            {links.map((l) => {
              const active = location.pathname === l.href
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                    active ? 'text-vibe-pink bg-vibe-pink/10' : 'text-deep-night hover:bg-vibe-pink/5'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
