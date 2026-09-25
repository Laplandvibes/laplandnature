import { useState, useEffect} from 'react'
import { Link, useLocation} from 'react-router-dom'
import { Menu, X} from 'lucide-react'
import Logo from './Logo'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'
import EcosystemMenu from '../shared/EcosystemMenu'
import LanguageSwitcher from '../i18n/LanguageSwitcher'

/**
 * Uutisosion nimi navissa. Osion omat käännökset (src/news/i18n/*.json) ladataan laiskasti vasta
 * osiossa, joten yhden sanan taulukko on tässä — sama ratkaisu kuin App.tsx:n toimituslinjalinkissä.
 */
const NEWS_LABEL: Record<string, string> = {
  en: 'News', fi: 'Uutiset', de: 'Nachrichten', ja: 'ニュース', es: 'Noticias', 'pt-BR': 'Notícias',
  'zh-CN': '新闻', ko: '뉴스', fr: 'Actualités', it: 'Notizie', nl: 'Nieuws', sv: 'Nyheter',
}

/** Sama sivu loppukauttaviivasta riippumatta: sisääntulo on `/x/`, linkki voi olla `/x` (18.9.2026). */
const samePath = (a: string, b: string) => a.replace(/\/+$/, '') === b.replace(/\/+$/, '')

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
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
    { href: to('/news'), label: NEWS_LABEL[lang] ?? NEWS_LABEL.en },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])


  const isHome = samePath(location.pathname, '/') || samePath(location.pathname, '/fi') || samePath(location.pathname, '/de')
  // On Home: transparent over Hero gradient, switches to opaque on scroll.
  // Other pages: opaque immediately so the cream page bg has a clear nav band.
  const opaque = scrolled || !isHome
  const logoVariant = opaque ? 'light' : 'dark'




  const LangDropdown = ({ dark }: { dark: boolean }) => (
    <div className="relative">
      <LanguageSwitcher tone={dark ? 'dark' : 'light'} />
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
            <Link to={to('/')} className="flex items-center shrink-0 min-h-11" aria-label="LaplandNature home">
              <Logo variant={logoVariant} size="md" />
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-0.5">
            {links.map((l) => {
              const active = samePath(location.pathname, l.href)
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  // whitespace-nowrap + kapeampi sisennys 25.9.2026: työpöytävalikko alkaa 1280 px:stä,
                  // ja espanjan ja hollannin pidemmät nimet ("Aurora boreal", "Nationale parken")
                  // rivittyivät kahdelle riville juuri siinä leveydessä (7 löydöstä, portti `navi`).
                  className={`whitespace-nowrap px-2.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
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
              <LanguageSwitcher tone={opaque ? 'light' : 'dark'} />
            </div>
            <button
              className={`inline-flex items-center justify-center min-h-11 min-w-11 p-2.5 rounded-lg transition-colors ${opaque ? 'text-deep-night' : 'text-snow'}`}
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
              const active = samePath(location.pathname, l.href)
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
