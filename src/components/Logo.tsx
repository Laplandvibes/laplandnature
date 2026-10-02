import type { CSSProperties } from 'react';

// Sanamerkin leveys 1 px:n fontilla (Bebas Neue + tracking-wide). Puhelin- ja tablettinavissa koko lasketaan
// tästä ja vapaasta tilasta (index.css LV-NAV-SANAMERKKI): 24 px (tabletilla 28 px), pienempi vain kun ei mahdu.
const WM_STYLE = { '--lv-wm-k': 5.8, '--lv-wm-max-md': '28px' } as CSSProperties;

interface LogoProps {
  /** "light" = dark text on light bg (default for nav on cream pages).
   *  "dark"  = white text on dark bg (used over Hero gradient). */
  variant?: 'light' | 'dark'
  className?: string
  size?: 'sm' | 'md' | 'lg'
  /** Navin sanamerkki: koko puhelin- ja tablettinavissa vapaan tilan mukaan (index.css LV-NAV-SANAMERKKI). */
  nav?: boolean
}

const SIZE = {
  sm: 'text-xl sm:text-2xl',
  md: 'text-2xl sm:text-[28px]',
  lg: 'text-4xl sm:text-5xl md:text-6xl',
}

/**
 * Canonical LV hashtag-logo pattern: pink # + LAPLAND + brand suffix.
 * Uses TEXT spans (no Lucide Hash icon) — required by brand spec.
 */
export default function Logo({ variant = 'light', className = '', size = 'md', nav = false }: LogoProps) {
  const base = SIZE[size]
  const lap = variant === 'dark' ? 'text-snow' : 'text-deep-night'
  return (
    <span
      className={`font-heading tracking-wide leading-none ${base}${nav ? ' lv-wm' : ''} ${className}`}
      data-lv-sanamerkki={nav ? '' : undefined}
      style={nav ? WM_STYLE : undefined}
      aria-label="LaplandNature"
    >
      <span className="text-vibe-pink">#</span>
      <span className={lap}>LAPLAND</span>
      <span className="text-aurora-green">NATURE</span>
    </span>
  )
}
