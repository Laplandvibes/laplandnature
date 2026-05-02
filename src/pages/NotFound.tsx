import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page not found — LaplandNature"
        description="The page you were looking for doesn't exist or has moved."
        canonicalPath="/404"
      />
      <div className="min-h-screen flex items-center justify-center bg-cream pt-20 px-4">
        <div className="text-center max-w-md">
          <p className="font-heading text-aurora-green tracking-[0.3em] text-sm mb-4">404</p>
          <h1 className="font-heading text-4xl sm:text-5xl text-deep-night tracking-wider mb-4">
            Off the trail
          </h1>
          <p className="text-deep-night/70 mb-8">
            The page you were looking for doesn't exist on LaplandNature. Try one of the pillar guides
            below — that's where the wilderness is.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Home
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/national-parks"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/20 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              National parks
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
