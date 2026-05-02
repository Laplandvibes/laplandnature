import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const links = [
  { href: '/national-parks', label: 'National Parks' },
  { href: '/hiking-trails', label: 'Hiking' },
  { href: '/wildlife', label: 'Wildlife' },
  { href: '/northern-lights', label: 'Northern Lights' },
  { href: '/seasons', label: 'Seasons' },
  { href: '/conservation', label: 'Conservation' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const isHome = location.pathname === '/'
  // On Home: transparent over Hero gradient, switches to opaque on scroll.
  // Other pages: opaque immediately so the cream page bg has a clear nav band.
  const opaque = scrolled || !isHome
  const logoVariant = opaque ? 'light' : 'dark'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          opaque
            ? 'bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_rgba(15,23,42,0.06)] border-b border-deep-night/10'
            : 'bg-gradient-to-b from-deep-night/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center shrink-0" aria-label="LaplandNature home">
            <Logo variant={logoVariant} size="md" />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
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
          </div>

          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${opaque ? 'text-deep-night' : 'text-snow'}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 pt-16 bg-cream overflow-y-auto">
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
