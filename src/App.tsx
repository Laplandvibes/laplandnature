import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from '../../shared/Footer'
import CookieBanner from '../../shared/CookieBanner'
import NewsletterPopup from './components/NewsletterPopup'
import Home from './pages/Home'
import NorthernLights from './pages/NorthernLights'
import NationalParks from './pages/NationalParks'
import Wildlife from './pages/Wildlife'
import Seasons from './pages/Seasons'
import HikingTrails from './pages/HikingTrails'
import Conservation from './pages/Conservation'
import EditorialPolicy from './pages/EditorialPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import CookiePolicy from './pages/CookiePolicy'
import NotFound from './pages/NotFound'
import { trackPageView, initScrollDepth, initOutboundTracking } from './lib/analytics'

const FOOTER_PILLARS = [
  { name: 'Northern Lights', href: '/northern-lights' },
  { name: 'National Parks', href: '/national-parks' },
  { name: 'Wildlife', href: '/wildlife' },
  { name: 'Hiking Trails', href: '/hiking-trails' },
  { name: 'Seasons', href: '/seasons' },
  { name: 'Conservation', href: '/conservation' },
]

const FOOTER_EDITORIAL_NOTE = 'Independently maintained by Lapeso Oy in Finnish Lapland · last reviewed April 2026 · we earn an affiliate commission on some bookings, but it never shapes which destinations or operators we recommend.'

const FOOTER_EXTRA_LEGAL = [
  { to: '/editorial-policy', label: 'Editorial Policy' },
]

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
      <Nav />
      <div className="min-h-screen flex flex-col bg-cream">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/northern-lights" element={<NorthernLights />} />
            <Route path="/national-parks" element={<NationalParks />} />
            <Route path="/wildlife" element={<Wildlife />} />
            <Route path="/seasons" element={<Seasons />} />
            <Route path="/hiking-trails" element={<HikingTrails />} />
            <Route path="/conservation" element={<Conservation />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer
          pillarLinks={FOOTER_PILLARS}
          editorialNote={FOOTER_EDITORIAL_NOTE}
          extraLegalLinks={FOOTER_EXTRA_LEGAL}
        />
      </div>
      <CookieBanner consentKey="laplandnature_cookie_consent" />
      <NewsletterPopup />
    </BrowserRouter>
  )
}
