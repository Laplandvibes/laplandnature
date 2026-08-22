import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'

/**
 * Per-answer link row for pillar-page FAQs (Vesa 2026-07-07: FAQ answers must
 * point to our own supporting content). Keys are nav entries → labels come
 * pre-translated in all 11 locales, routes are the matching pillar pages.
 */
export type FaqNavKey =
  | 'nationalParks'
  | 'hiking'
  | 'wildlife'
  | 'northernLights'
  | 'seasons'
  | 'conservation'
  | 'freshwater'

const FAQ_ROUTE: Record<FaqNavKey, string> = {
  nationalParks: '/national-parks',
  hiking: '/hiking-trails',
  wildlife: '/wildlife',
  northernLights: '/northern-lights',
  seasons: '/seasons',
  conservation: '/conservation',
  freshwater: '/freshwater',
}

export default function FaqLinks({ keys }: { keys?: FaqNavKey[] }) {
  const lang = useLang()
  const to = useLocalePath()
  if (!keys || keys.length === 0) return null
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
      {keys.map((k) => (
        <Link
          key={k}
          to={to(FAQ_ROUTE[k])}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-aurora-green hover:text-vibe-pink transition-colors"
        >
          {COPY[lang].nav[k]} <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
      ))}
    </div>
  )
}
