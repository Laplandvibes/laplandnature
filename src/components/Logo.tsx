import type { CSSProperties } from 'react';

import { LV_SANAMERKKI } from './lvSanamerkki';
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
  md: 'text-2xl sm:text-[28px] xl:text-3xl',
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
    <span translate="no"
      className={`notranslate font-heading tracking-wide leading-none ${base}${nav ? ' lv-wm' : ''} ${className}`}
      data-lv-sanamerkki={nav ? '' : undefined}
      style={nav ? WM_STYLE : undefined}
      aria-label="LaplandNature"
    >
      {/* VIRALLINEN sanamerkki (Vesa 14.11.2026; yläpalkki 15.11.2026 "sama leveys kuin nyt"): piirros ./lvSanamerkki.ts,
          leveys = entisen tekstin leveys, osat perivät entiset värinsä (currentColor). Teksti ruudunlukijalle ja hakukoneelle. */}
      <svg viewBox={LV_SANAMERKKI.viewBox} aria-hidden="true" focusable="false" style={{ width: `${LV_SANAMERKKI.leveysEm}em`, height: 'auto', display: 'inline-block', verticalAlign: 'middle', overflow: 'visible' }}>
        <path className="text-vibe-pink" fill="currentColor" d={LV_SANAMERKKI.d[0]} />
        <path className={lap} fill="currentColor" d={LV_SANAMERKKI.d[1]} />
        <path className="text-aurora-green" fill="currentColor" d={LV_SANAMERKKI.d[2]} />
      </svg>
      <span className="sr-only">#LAPLANDNATURE</span>
    </span>
  )
}
