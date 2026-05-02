import type { ReactNode, MouseEvent } from 'react'
import { buildAffiliateUrl, type Partner } from '../lib/affiliate'
import { trackAffiliateClick } from '../lib/analytics'

interface AffiliateCTAProps {
  partner: Partner
  /** snake_case placement tag — e.g. `aurora_spot_card`, `inline_paragraph`. No domain. */
  sid: string
  /** Hotels: property/city query. Activities: GYG slug (e.g. `rovaniemi-l2653`). */
  destination?: string
  query?: Record<string, string | number | undefined>
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Renders an affiliate `<a>` that routes through go.laplandvibes.com.
 * Required: target="_blank", rel="sponsored nofollow noopener".
 * `noreferrer` is OMITTED — the redirect Worker reads `Referer` to resolve
 * per-domain CJ Website IDs.
 */
export default function AffiliateCTA({
  partner,
  sid,
  destination,
  query,
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
}: AffiliateCTAProps) {
  const href = buildAffiliateUrl({ partner, sid, destination, query })
  const handleClick = () => {
    trackAffiliateClick(partnerToTrackingLabel(partner), sid, href)
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={className}
      style={style}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  )
}

function partnerToTrackingLabel(partner: Partner): string {
  switch (partner) {
    case 'hotels':
    case 'hotels-seasonal':
    case 'hotels-budget':
      return 'hotelscom'
    case 'cars':
      return 'economybookings'
    case 'activities':
      return 'getyourguide'
  }
}
