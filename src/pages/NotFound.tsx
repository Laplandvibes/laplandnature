import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'

export default function NotFound() {
  const lang = useLang()
  const c = COPY[lang].notFound
  const to = useLocalePath()
  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath="/404"
      />
      <div className="min-h-screen flex items-center justify-center bg-cream pt-20 px-4">
        <div className="text-center max-w-md">
          <p className="font-heading text-aurora-green tracking-[0.3em] text-sm mb-4">404</p>
          <h1 className="font-heading text-4xl sm:text-5xl text-deep-night tracking-wider mb-4">
            {c.h1}
          </h1>
          <p className="text-deep-night/70 mb-8">{c.body}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={to('/')}
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {c.home}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={to('/national-parks')}
              className="inline-flex items-center justify-center gap-2 border border-deep-night/20 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              {c.parks}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
