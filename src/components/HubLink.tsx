import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackHubClick } from '../lib/analytics';

interface HubLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Destination tag for GA4 — e.g. `laplandvibes`, `laplandstays`. Defaults to host extracted from href. */
  destination?: string;
  /** Optional placement label, appended to GA4 event for SID-style segmentation. */
  placement?: string;
  href: string;
  children: ReactNode;
}

/**
 * Hub-to-spoke (or spoke-to-hub) outbound link with GA4 tracking baked in.
 * Use this for every internal LV-ecosystem link (laplandvibes.com, laplandstays.com,
 * laplandnature.com, etc.) — clicks fire a `hub_click` event so we can see
 * cross-spoke traffic in GA4 instead of leaking it as a generic outbound.
 *
 * Sets `target="_blank"` and `rel="noopener noreferrer"` by default. Override
 * via props if needed. NOT for affiliate links — use `<AffiliateCTA>` for those.
 */
export default function HubLink({
  href,
  destination,
  placement,
  children,
  onClick,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...rest
}: HubLinkProps) {
  const dest = destination || extractHost(href);
  const label = placement ? `${dest}|${placement}` : dest;
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={(e) => {
        trackHubClick(label);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

function extractHost(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '').split('.')[0];
  } catch {
    return 'unknown';
  }
}
