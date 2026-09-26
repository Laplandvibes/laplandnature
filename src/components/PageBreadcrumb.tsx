import Breadcrumbs from '../shared/Breadcrumbs'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'

/**
 * Ecosystem breadcrumb, rendered BELOW the hero (mounted once inside HeroImage)
 * so it reads as the first line of page content instead of a bar wedged between
 * the nav and the hero. Self-hides on home + unmapped routes (shared/Breadcrumbs
 * returns null there), so HeroImage can mount it unconditionally.
 */
export default function PageBreadcrumb({ currentLabel }: { currentLabel?: string } = {}) {
  const lang = useLang()
  const c = COPY[lang]
  const to = useLocalePath()
  const labelMap: Record<string, string> = {
    '/national-parks': c.nav.nationalParks,
    '/hiking-trails': c.nav.hiking,
    '/wildlife': c.nav.wildlife,
    '/northern-lights': c.nav.northernLights,
    '/seasons': c.nav.seasons,
    '/conservation': c.nav.conservation,
    // 26.9.2026: /freshwater was missing, so the Vesistöt page had no breadcrumb at all.
    '/freshwater': c.nav.freshwater,
  }
  return (
    <Breadcrumbs
      lang={lang}
      to={to}
      labelMap={labelMap}
      currentLabel={currentLabel}
      className="bg-cream text-deep-night border-b border-deep-night/10"
      accentClassName="hover:text-vibe-pink hover:opacity-100"
    />
  )
}
