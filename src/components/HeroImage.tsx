import type { ReactNode } from 'react'
import PageBreadcrumb from './PageBreadcrumb'
import PhotoCredit from './PhotoCredit'

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
  /** Breadcrumb label for a route PageBreadcrumb does not map from COPY (e.g. /news). */
  crumbLabel?: string
}

/**
 * Heroes that have 800 px and 1200 px AVIF + WebP siblings in public/images/.
 *
 * 🔴 Those 32 files shipped on 2026-08-22 but nothing ever referenced them: the
 * `<picture>` this component's docblock promised did not exist, so every device
 * downloaded the full-width original. A phone was pulling 231 kB of
 * `hero-home.webp` where `hero-home-800.avif` is 68 kB — on the LCP image of
 * every pillar page. The list below is what turns them on.
 *
 * Only add a name here after all four sibling files exist, or the srcset will
 * point at 404s. `hero-bear-kuusamo` deliberately stays out: it has no variants.
 *
 * 26.9.2026: `hero-home-winter` left the list on purpose. It is now a Commons panorama
 * (Pallastunturi, 3.8:1) that may not be cropped, and a width ladder is wrong for a panorama:
 * on a phone the hero is ~740 px tall, so object-cover needs ~2 800 px of width, not 800.
 * The single 3 000 px file is served everywhere instead.
 *
 * 🔴 26.9.2026: the ladder had not worked since the image-versioning build step (9.9.). It
 * appends `?v=<hash>` to every image string in the JS bundle, `image` included, so the old
 * `.webp$` test never matched, `hasVariants` was always false and every phone loaded the
 * 1 600 px file (same bug as laplandsnowmobile 25.9.). The name is now read without the query,
 * and the srcsets are written out as literal strings so that the build versions each rung with
 * its own hash — the same URLs index.html's homepage preload asks for, so it is fetched once.
 */
const RESPONSIVE_HEROES: Record<string, { avif: string; webp: string }> = {
  'hero-conservation': {
    avif: '/images/hero-conservation-800.avif 800w, /images/hero-conservation-1200.avif 1200w',
    webp: '/images/hero-conservation-800.webp 800w, /images/hero-conservation-1200.webp 1200w',
  },
  'hero-freshwater': {
    avif: '/images/hero-freshwater-800.avif 800w, /images/hero-freshwater-1200.avif 1200w',
    webp: '/images/hero-freshwater-800.webp 800w, /images/hero-freshwater-1200.webp 1200w',
  },
  'hero-hiking': {
    avif: '/images/hero-hiking-800.avif 800w, /images/hero-hiking-1200.avif 1200w',
    webp: '/images/hero-hiking-800.webp 800w, /images/hero-hiking-1200.webp 1200w',
  },
  'hero-home': {
    avif: '/images/hero-home-800.avif 800w, /images/hero-home-1200.avif 1200w',
    webp: '/images/hero-home-800.webp 800w, /images/hero-home-1200.webp 1200w',
  },
  'hero-home-autumn': {
    avif: '/images/hero-home-autumn-800.avif 800w, /images/hero-home-autumn-1200.avif 1200w',
    webp: '/images/hero-home-autumn-800.webp 800w, /images/hero-home-autumn-1200.webp 1200w',
  },
  'hero-national-parks': {
    avif: '/images/hero-national-parks-800.avif 800w, /images/hero-national-parks-1200.avif 1200w',
    webp: '/images/hero-national-parks-800.webp 800w, /images/hero-national-parks-1200.webp 1200w',
  },
  'hero-news': {
    avif: '/images/hero-news-800.avif 800w, /images/hero-news-1200.avif 1200w',
    webp: '/images/hero-news-800.webp 800w, /images/hero-news-1200.webp 1200w',
  },
  'hero-northern-lights': {
    avif: '/images/hero-northern-lights-800.avif 800w, /images/hero-northern-lights-1200.avif 1200w',
    webp: '/images/hero-northern-lights-800.webp 800w, /images/hero-northern-lights-1200.webp 1200w',
  },
  'hero-seasons': {
    avif: '/images/hero-seasons-800.avif 800w, /images/hero-seasons-1200.avif 1200w',
    webp: '/images/hero-seasons-800.webp 800w, /images/hero-seasons-1200.webp 1200w',
  },
  'hero-wildlife': {
    avif: '/images/hero-wildlife-800.avif 800w, /images/hero-wildlife-1200.avif 1200w',
    webp: '/images/hero-wildlife-800.webp 800w, /images/hero-wildlife-1200.webp 1200w',
  },
}

/**
 * The ladder tops out at 1200 px, so it is offered to phones only. Above the
 * `md` breakpoint the original 1920 px file is still served — a 1280 px screen
 * at DPR 2 wants 2560 px and would have had to upscale the 1200 px rung, which
 * is a visible cost on a photo-led page for no real saving.
 */
const RESPONSIVE_MEDIA = '(max-width: 767px)'

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
  crumbLabel,
}: HeroImageProps) {
  const minH = size === 'xl' ? 'min-h-[88vh]' : 'min-h-[68vh] sm:min-h-[72vh]'

  // Overlay scrim. `default` keeps the original wash that fades to solid dark at
  // the bottom; `feature` is a lighter top-weighted scrim so a photographic
  // subject in the lower two-thirds (and the golden light) reads clearly.
  const overlayGradient =
    overlay === 'feature'
      ? 'linear-gradient(to bottom, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.55) 22%, rgba(15,23,42,0.28) 42%, rgba(15,23,42,0.10) 64%, rgba(15,23,42,0.05) 100%)'
      : // 25.9.2026 (Vesa: "hero tekstien tausta ei ole hyvä, peittää kuvia liikaa"): the old
        // wash was 45–55 % over the whole photo and faded to solid night at the bottom, and a
        // second 60 % box sat on top of it behind the text. The page below the hero is cream,
        // so there is nothing dark to merge into. Now: nav band at the top, the photo nearly
        // clear in the middle and lower frame, the text carried by its own feathered backdrop.
        'linear-gradient(180deg, rgba(15,23,42,0.50) 0%, rgba(15,23,42,0.16) 18%, rgba(15,23,42,0.08) 55%, rgba(15,23,42,0.22) 85%, rgba(15,23,42,0.40) 100%)'

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

  const base = image.split('?')[0].replace(/\.(avif|webp|jpe?g|png)$/i, '')
  const variants = RESPONSIVE_HEROES[base]

  return (
    <>
    <section className={`relative ${minH} flex ${alignClass} justify-center overflow-hidden`}>
      <picture>
        {variants && (
          <>
            <source
              type="image/avif"
              media={RESPONSIVE_MEDIA}
              sizes="100vw"
              srcSet={variants.avif}
            />
            <source
              type="image/webp"
              media={RESPONSIVE_MEDIA}
              sizes="100vw"
              srcSet={variants.webp}
            />
          </>
        )}
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
      </picture>

      {/* Gradient overlay — see `overlayGradient` above. `default` fades to solid
          dark at the bottom to merge into the next dark section; `feature` stays
          light over the lower frame so the photo subject reads. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: overlayGradient }}
      />

      {/* Tekijä + lisenssi oikeaan alakulmaan (Commons-kuvat) tai "Kuva: LaplandVibes" (omat). */}
      <PhotoCredit src={`/images/${image}`} />

      <div className={`relative isolate text-center px-4 max-w-4xl ${contentAlignClass}`}>
        {/* Reading backdrop behind the text stack only (23.9.2026). The deploy gates
            measure the pixels under each text line, and a text-shadow does not count.
            25.9.2026: the first version was a clipped rounded box whose gradient was
            sized to the box CORNERS (ellipse farthest-corner), so at the side edges it
            was still ~35 % dark and read as a visible rectangle over the photo.
            `closest-side` reaches zero at the element's own edges, and the element
            reaches well past the text, so the darkening feathers out with no edge. */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-28 sm:-inset-x-40 -inset-y-20 -z-10 bg-[radial-gradient(closest-side,rgba(15,23,42,0.66)_0%,rgba(15,23,42,0.58)_50%,rgba(15,23,42,0.3)_78%,rgba(15,23,42,0)_100%)]"
        />
        {eyebrow && (
          <p className="inline-block rounded-full bg-deep-night/75 px-3 py-1 text-snow uppercase tracking-[0.3em] text-xs sm:text-sm mb-5">
            {eyebrow}
          </p>
        )}
        <h1 className={`font-heading ${size === 'xl' ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl' : 'text-5xl sm:text-6xl md:text-7xl'} text-snow xl:text-[clamp(96px,1.5vw_+_76.8px,115.2px)] tracking-wider leading-[0.95] mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]`}>
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
          <p className="text-snow/90 text-lg md:text-xl max-w-2xl xl:max-w-4xl mx-auto font-body leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] xl:text-2xl">
            {description}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
    <PageBreadcrumb currentLabel={crumbLabel} />
    </>
  )
}
