import { Link, type LinkProps } from 'react-router-dom'
import { useLocalePath } from './useLang'

/**
 * Locale-aware <Link>. Use this for INTERNAL app routes whose path is defined
 * outside render scope (module-level copy objects, JSON article bodies), where
 * the useLocalePath() helper is not available at definition time. The hook runs
 * at render, so the current locale prefix is applied (e.g. /wildlife →
 * /fi/wildlife when viewing the FI tree).
 *
 * `to` must be a string internal path without a language prefix.
 * Copied byte-for-byte in behaviour from laplandflights-new/src/i18n/LocaleLink.tsx
 * (18.9.2026) so the shared news module works unchanged on both sites.
 */
export default function LocaleLink({ to, ...rest }: Omit<LinkProps, 'to'> & { to: string }) {
  const lp = useLocalePath()
  return <Link to={lp(to)} {...rest} />
}
