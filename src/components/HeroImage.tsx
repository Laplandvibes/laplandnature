import type { ReactNode } from 'react'
import PageBreadcrumb from './PageBreadcrumb'

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
  /**
   * Descriptive alt text for the hero photo. These heroes are meaningful
   * full-bleed content images (image-SEO + a11y), not decorative — pass a
   * specific description. Falls back to a title-derived string. Pass `null`
   * to mark the image purely decorative (`alt=""` + `aria-hidden`).
   */
  alt?: string | null
  /**
   * Overlay scrim intensity. `default` (the standard for every pillar/topic
   * page) keeps the full deep-night wash that fades to solid dark at the bottom
   * so the hero merges into the next dark section. `feature` is a lighter,
   * top-weighted scrim: dark enough at the very top for the nav + headline to
   * read, then near-clear over the lower two-thirds so a photographic subject
   * (e.g. the backlit Bear Kuusamo family + golden light) stays visible. Used
   * only on photo-led partner features. Backward-compatible default.
   */
  overlay?: 'default' | 'feature'
  /**
   * Vertical placement of the typographic stack. `center` (default) keeps the
   * standard centered hero. `top` anchors the headline near the top of the
   * frame — used when the photo's subject sits low and must stay unobstructed.
   */
  align?: 'center' | 'top'
  /**
   * CSS `object-position` for the hero `<img>` (e.g. `'center 80%'`). Lets a
   * page pull a low subject into the letterboxed crop. Omit for the default
   * centered cover behaviour.
   */
  objectPosition?: string
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
  alt,
  overlay = 'default',
  align = 'center',
  objectPosition,
}: HeroImageProps) {
  const minH = size === 'xl' ? 'min-h-[88vh]' : 'min-h-[68vh] sm:min-h-[72vh]'

  // Overlay scrim. `default` keeps the original wash that fades to solid dark at
  // the bottom; `feature` is a lighter top-weighted scrim so a photographic
  // subject in the lower two-thirds (and the golden light) reads clearly.
  const overlayGradient =
    overlay === 'feature'
      ? 'linear-gradient(to bottom, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.55) 22%, rgba(15,23,42,0.28) 42%, rgba(15,23,42,0.10) 64%, rgba(15,23,42,0.05) 100%)'
      : 'linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.45) 30%, rgba(15,23,42,0.55) 60%, rgba(15,23,42,0.85) 88%, rgba(15,23,42,1) 100%)'

  const alignClass =
    align === 'top' ? 'items-start' : 'items-center'
  // When the stack is top-anchored, give it room to clear the fixed nav.
  const contentAlignClass = align === 'top' ? 'pt-24 sm:pt-28 pb-14' : ''

  // Treat the hero as a meaningful content image unless explicitly marked
  // decorative (alt === null). Derive a sensible default from the title when
  // no specific alt is supplied and the title is a plain string.
  const derivedAlt =
    typeof title === 'string' ? `${title} in Finnish Lapland` : ''
  const decorative = alt === null
  const altText = decorative ? '' : (alt ?? derivedAlt)

  return (
    <>
    <section className={`relative ${minH} flex ${alignClass} justify-center overflow-hidden`}>
      <img
        src={`/images/${image}`}
        alt={altText}
        {...(decorative || altText === '' ? { 'aria-hidden': true } : {})}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className="absolute inset-0 w-full h-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
        width={1920}
        height={815}
      />

      {/* Gradient overlay — see `overlayGradient` above. `default` fades to solid
          dark at the bottom to merge into the next dark section; `feature` stays
          light over the lower frame so the photo subject reads. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: overlayGradient }}
      />

      <div className={`relative text-center px-4 max-w-4xl ${contentAlignClass}`}>
        {eyebrow && (
          <p className="text-snow/85 uppercase tracking-[0.3em] text-xs sm:text-sm mb-5 [text-shadow:0_2px_12px_rgba(0,0,0,0.85)]">
            {eyebrow}
          </p>
        )}
        <h1 className={`font-heading ${size === 'xl' ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl' : 'text-5xl sm:text-6xl md:text-7xl'} text-snow tracking-wider leading-[0.95] mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]`}>
          {title}
          {subtitle && (
            <span
              className="block mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              style={{
                background: 'linear-gradient(90deg, #EC4899 0%, #F472B6 50%, #EC4899 100%)',
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
          <p className="text-snow/90 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {description}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
    <PageBreadcrumb />
    </>
  )
}
