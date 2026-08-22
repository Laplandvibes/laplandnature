import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppPromoNudge } from './components/AppPromo'
import { useEffect, useReducer, lazy, Suspense, type ReactNode } from 'react'
import Nav from './components/Nav'
import Footer from './shared/Footer'
import CookieBanner from './shared/CookieBanner'
import NewsletterPopup from './components/NewsletterPopup'
const Home = lazy(() => import('./pages/Home'))
const NorthernLights = lazy(() => import('./pages/NorthernLights'))
const NationalParks = lazy(() => import('./pages/NationalParks'))
const Wildlife = lazy(() => import('./pages/Wildlife'))
const BearKuusamo = lazy(() => import('./pages/BearKuusamo'))
const Seasons = lazy(() => import('./pages/Seasons'))
const HikingTrails = lazy(() => import('./pages/HikingTrails'))
const Conservation = lazy(() => import('./pages/Conservation'))
const Freshwater = lazy(() => import('./pages/Freshwater'))
const EditorialPolicy = lazy(() => import('./pages/EditorialPolicy'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { trackPageView, initScrollDepth, initOutboundTracking } from './lib/analytics'
import LocaleAutoRedirect from './i18n/LocaleAutoRedirect'
import { useHtmlLang, useLang, useLocalePath } from './i18n/useLang'
import { COPY, loadCopy } from './locales/copy'

/**
 * Non-EN copy lives in per-language lazy chunks (see locales/copy.ts).
 * Gate the UI until the active language's chunk is registered in COPY, so
 * every consumer keeps reading COPY[lang] synchronously. EN is bundled
 * eagerly — English visitors never hit the gate.
 */
/**
 * 🔴 The app layout's landmark, EXCEPT on /terms.
 *
 * shared/Legal/TermsContent opens its own <main>; nesting it inside this one is
 * invalid HTML and gives a screen reader two "main" regions. Its siblings
 * PrivacyContent/CookieContent open a <div>, so only /terms is affected.
 * Measured from the rendered DOM 2026-08-13 (12 network sites) -- the raw HTML
 * has zero <main> elements, so this is invisible to grep.
 *
 * Do NOT "simplify" this back to a plain <main>.
 */
function MainOrDiv({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation();
  const Tag = /(^|\/)terms\/?$/.test(pathname) ? 'div' : 'main';
  return <Tag className="flex-1 pt-16">{children}</Tag>;
}

function CopyGate({ children }: { children: ReactNode }) {
  const lang = useLang()
  const [, bump] = useReducer((x: number) => x + 1, 0)
  useEffect(() => {
    let alive = true
    if (!COPY[lang]) loadCopy(lang).then(() => { if (alive) bump() })
    return () => { alive = false }
  }, [lang])
  if (!COPY[lang]) return <div className="min-h-screen bg-cream" />
  return <>{children}</>
}

function LocaleSync() {
  const lang = useHtmlLang()
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return null
}

function LocalisedCookieBanner() {
  const lang = useLang()
  return <CookieBanner consentKey="laplandnature_cookie_consent" lang={lang} />
}

function FooterShell() {
  const lang = useLang()
  const c = COPY[lang]
  const to = useLocalePath()
  const FOOTER_PILLARS = [
    { name: c.nav.northernLights, href: to('/northern-lights') },
    { name: c.nav.nationalParks, href: to('/national-parks') },
    { name: c.nav.wildlife, href: to('/wildlife') },
    { name: c.nav.hiking, href: to('/hiking-trails') },
    { name: c.nav.seasons, href: to('/seasons') },
    { name: c.nav.conservation, href: to('/conservation') },
    { name: c.nav.freshwater, href: to('/freshwater') },
  ]
  const FOOTER_EXTRA_LEGAL = [
    { to: to('/editorial-policy'), label:
        lang === 'fi' ? 'Toimituslinja' :
        lang === 'de' ? 'Redaktionsrichtlinie' :
        lang === 'ja' ? '編集方針' :
        lang === 'es' ? 'Política editorial' :
        lang === 'pt-BR' ? 'Política editorial' :
        lang === 'zh-CN' ? '编辑方针' :
        lang === 'ko' ? '편집 정책' :
        lang === 'fr' ? 'Politique éditoriale' :
        lang === 'it' ? 'Politica editoriale' :
        lang === 'nl' ? 'Redactioneel beleid' :
        lang === 'sv' ? 'Redaktionell policy' :
        'Editorial Policy' },
  ]
  return (
    <Footer
      pillarLinks={FOOTER_PILLARS}
      editorialNote={c.footerCookie.affiliateNote}
      extraLegalLinks={FOOTER_EXTRA_LEGAL}
    />
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    trackPageView(pathname)
  }, [pathname])
  return null
}

function AnalyticsBootstrap() {
  useEffect(() => {
    initScrollDepth()
    initOutboundTracking()
  }, [])
  return null
}

// Re-arm TLS connection to the affiliate redirect on hover. Static
// <link rel="preconnect"> in index.html dies after ~10s idle; hovering
// signals an imminent click — kick off a fresh preconnect.
function AffiliateLinkWarmup() {
  useEffect(() => {
    let last = 0
    const onHover = (e: Event) => {
      const a = (e.target as HTMLElement).closest?.('a[href*="go.laplandvibes.com"]')
      if (!a) return
      const now = Date.now()
      if (now - last < 5000) return
      last = now
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = 'https://go.laplandvibes.com'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
      setTimeout(() => link.remove(), 12000)
    }
    document.addEventListener('mouseover', onHover, { passive: true })
    document.addEventListener('touchstart', onHover, { passive: true })
    return () => {
      document.removeEventListener('mouseover', onHover)
      document.removeEventListener('touchstart', onHover)
    }
  }, [])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsBootstrap />
      <AffiliateLinkWarmup />
      <LocaleAutoRedirect />
      <LocaleSync />
      <CopyGate>
      <Nav />
      <div className="min-h-screen flex flex-col bg-cream">
        <MainOrDiv>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
            {(['', '/fi', '/de', '/ja', '/es', '/br', '/cn', '/kr', '/fr', '/it', '/nl', '/sv'] as const).flatMap((prefix) => [
              <Route key={`${prefix}/`} path={prefix === '' ? '/' : prefix} element={<Home />} />,
              <Route key={`${prefix}/northern-lights`} path={`${prefix}/northern-lights`} element={<NorthernLights />} />,
              <Route key={`${prefix}/national-parks`} path={`${prefix}/national-parks`} element={<NationalParks />} />,
              <Route key={`${prefix}/wildlife`} path={`${prefix}/wildlife`} element={<Wildlife />} />,
              <Route key={`${prefix}/bear-kuusamo`} path={`${prefix}/bear-kuusamo`} element={<BearKuusamo />} />,
              <Route key={`${prefix}/seasons`} path={`${prefix}/seasons`} element={<Seasons />} />,
              <Route key={`${prefix}/hiking-trails`} path={`${prefix}/hiking-trails`} element={<HikingTrails />} />,
              <Route key={`${prefix}/conservation`} path={`${prefix}/conservation`} element={<Conservation />} />,
              <Route key={`${prefix}/freshwater`} path={`${prefix}/freshwater`} element={<Freshwater />} />,
              <Route key={`${prefix}/editorial-policy`} path={`${prefix}/editorial-policy`} element={<EditorialPolicy />} />,
              <Route key={`${prefix}/privacy`} path={`${prefix}/privacy`} element={<PrivacyPolicy />} />,
              <Route key={`${prefix}/terms`} path={`${prefix}/terms`} element={<Terms />} />,
              <Route key={`${prefix}/cookie-policy`} path={`${prefix}/cookie-policy`} element={<CookiePolicy />} />,
            ])}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </MainOrDiv>
        <FooterShell />
      </div>
      </CopyGate>
      <LocalisedCookieBanner />
      <NewsletterPopup />
    <AppPromoNudge />
    </BrowserRouter>
  )
}
