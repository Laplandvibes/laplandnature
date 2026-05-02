import SharedNewsletterPopup from '../../../shared/NewsletterPopup'
import { trackNewsletterSignup } from '../lib/analytics'

/**
 * Site wrapper for the shared LV newsletter popup.
 *
 * Routes through same-origin Pages Function `/api/newsletter` so we don't
 * have to add laplandnature.com to the Supabase Edge Function CORS allowlist.
 * The proxy server-side fetches the shared `send-welcome-email` function and
 * returns the same `{message, alreadySubscribed?}` payload.
 *
 * Trigger: 25 s OR 55 % scroll. Suppressed on /privacy, /terms, /cookie-policy.
 */
export default function NewsletterPopup() {
  return (
    <SharedNewsletterPopup
      siteId="laplandnature"
      brandWord="NATURE"
      endpoint="/api/newsletter"
      onSubscribed={(source) => trackNewsletterSignup(source)}
    />
  )
}
