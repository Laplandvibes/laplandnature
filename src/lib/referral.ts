// Editorial referral tagging for outbound links to a partner/organization's OWN
// website (e.g. Metsähallitus, WWF Finland, the Sámi Parliament). Appends UTM
// params at render time so the referral traffic we send is attributable, while
// the source data (the raw URLs) stays clean. This is an editorial referral, not
// a paid placement — callers keep their normal `rel` (no `sponsored`).
export function withReferral(url: string, campaign: string): string {
  try {
    const u = new URL(url)
    u.searchParams.set('utm_source', 'laplandvibes')
    u.searchParams.set('utm_medium', 'referral')
    u.searchParams.set('utm_campaign', campaign)
    return u.toString()
  } catch {
    return url
  }
}
