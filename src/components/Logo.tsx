interface LogoProps {
  /** "light" = dark text on light bg (default for nav on cream pages).
   *  "dark"  = white text on dark bg (used over Hero gradient). */
  variant?: 'light' | 'dark'
  className?: string
  size?: 'sm' | 'md' | 'lg'
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
export default function Logo({ variant = 'light', className = '', size = 'md' }: LogoProps) {
  const base = SIZE[size]
  const lap = variant === 'dark' ? 'text-snow' : 'text-deep-night'
  return (
    <span
      className={`font-heading tracking-wider leading-none ${base} ${className}`}
      aria-label="LaplandNature"
    >
      <span className="text-vibe-pink">#</span>
      <span className={lap}>LAPLAND</span>
      <span className="text-aurora-green">NATURE</span>
    </span>
  )
}
