// Google Analytics 4 — laplandnature
// Property: G-6MF4NX4PYJ

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_ID = 'G-6MF4NX4PYJ';

function gtag(...args: any[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

// ─── Page view ────────────────────────────────────────────────────────────────

export function trackPageView(path: string, title?: string) {
  gtag('config', GA_ID, {
    page_path: path,
    page_title: title ?? document.title,
  });
}

// ─── Affiliate / booking intent ───────────────────────────────────────────────

export function trackAffiliateClick(partner: string, type: string, url: string) {
  gtag('event', 'affiliate_click', {
    event_category: 'monetisation',
    event_label: partner,
    affiliate_type: type,
    outbound_url: url,
  });
}

export function trackBookingIntent(itemName: string, itemCategory: string) {
  gtag('event', 'booking_intent', {
    event_category: 'conversion',
    event_label: itemName,
    item_category: itemCategory,
  });
}

// ─── Hub navigation (spoke → hub) ─────────────────────────────────────────────

export function trackHubClick(destination: string) {
  gtag('event', 'hub_click', {
    event_category: 'navigation',
    event_label: destination,
  });
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export function trackNewsletterSignup(source: string) {
  gtag('event', 'newsletter_signup', {
    event_category: 'engagement',
    event_label: source,
  });
  gtag('event', 'generate_lead', { lead_source: 'newsletter', page_source: source });
}

// ─── CTA / engagement ─────────────────────────────────────────────────────────

export function trackCtaClick(label: string, section: string) {
  gtag('event', 'cta_click', {
    event_category: 'engagement',
    event_label: label,
    section,
  });
}

// ─── Scroll depth (25 / 50 / 75 / 100) ────────────────────────────────────────

export function initScrollDepth() {
  if (typeof window === 'undefined') return;
  const thresholds = [25, 50, 75, 100];
  const fired = new Set<number>();
  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
    for (const t of thresholds) {
      if (pct >= t && !fired.has(t)) {
        fired.add(t);
        gtag('event', 'scroll_depth', {
          event_category: 'engagement',
          event_label: `${t}%`,
          value: t,
        });
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ─── Outbound link clicks ─────────────────────────────────────────────────────

export function initOutboundTracking() {
  if (typeof window === 'undefined') return;
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
    if (!el) return;
    const href = el.getAttribute('href') || '';
    if (!href.startsWith('http')) return;
    const url = new URL(href, window.location.href);
    if (url.host === window.location.host) return;
    gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url.href,
      transport_type: 'beacon',
    });
  });
}
