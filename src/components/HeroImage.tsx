import type { ReactNode } from 'react'

interface HeroImageProps {
  /** Path under /images/, e.g. `hero-northern-lights.webp` */
  image: string
  /** Pre-headline pill text, e.g. "Pillar guide". Optional. */
  eyebrow?: ReactNode
  /** Main headline (bold). */
  title: ReactNode
  /** Secondary headline (cyan→pink gradient by default). Optional. */
  subtitle?: ReactNode
  /** One-paragraph description below headlines. Optional. */
  description?: ReactNode
  /** Visual height — homepage hero gets `xl`, pillar pages get `lg`. */
  size?: 'lg' | 'xl'
  children?: ReactNode
  /** True for the largest-contentful-paint image (homepage hero). */
  priority?: boolean
}

/**
 * Full-bleed image hero with deep-night overlay + LV typographic stack.
 * Photo is rendered as a `<picture>`/`<img>` (NOT background-image) so it
 * benefits from `loading=eager fetchpriority=high` for LCP, and Lighthouse
 * scores the image properly.
 */
export default function HeroImage({
  image,
  eyebrow,
  title,
  subtitle,
  description,
  size = 'lg',
  children,
  priority = false,
}: HeroImageProps) {
  const minH = size === 'xl' ? 'min-h-[88vh]' : 'min-h-[68vh] sm:min-h-[72vh]'

  return (
    <section className={`relative ${minH} flex items-center justify-center overflow-hidden`}>
      <img
        src={`/images/${image}`}
        alt=""
        aria-hidden="true"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={815}
      />

      {/* Dark gradient overlay — top fades to nav, bottom merges seamlessly into next dark section */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.28) 30%, rgba(15,23,42,0.42) 60%, rgba(15,23,42,0.85) 88%, rgba(15,23,42,1) 100%)',
        }}
      />

      <div className="relative text-center px-4 max-w-4xl">
        {eyebrow && (
          <p className="text-snow/85 uppercase tracking-[0.3em] text-xs sm:text-sm mb-5">
            {eyebrow}
          </p>
        )}
        <h1 className={`font-heading ${size === 'xl' ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl' : 'text-5xl sm:text-6xl md:text-7xl'} text-snow tracking-wider leading-[0.95] mb-4 drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]`}>
          {title}
          {subtitle && (
            <span
              className="block mt-1"
              style={{
                background: 'linear-gradient(90deg, #06B6D4 0%, #10B981 50%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {subtitle}
            </span>
          )}
        </h1>
        {description && (
          <p className="text-snow/90 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
            {description}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  )
}
