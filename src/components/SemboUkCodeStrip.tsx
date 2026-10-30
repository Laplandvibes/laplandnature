import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * Sembo UK's November 2026 discount code as a strip under an existing Sembo
 * button, for English readers only.
 *
 * Source: Adtraction mail to info@ on 27.10.2026 ("Sembo UK - November code!",
 * unitedkingdom@adtraction.com), sent as an offer to promote: £30 off with code
 * ADTRACTIONUK, minimum booking £300, book 1–30 November 2026, travel any date
 * in November or December 2026.
 *
 * English only: the code works on sembo.co.uk, where the Worker sends English
 * lodging clicks since 17.10.2026. Every other language lands on sembo.fi/.se/.de
 * or Trip.com. The strip has no button of its own: it sits under the button the
 * reader is about to press, which already opens sembo.co.uk in English.
 *
 * Shown from 1.11.2026 00:00 to 1.12.2026 00:00 UK time (GMT in November),
 * decided at render, so neither end needs a deploy. Styled with literal colours
 * so it reads the same on a dark or a light section.
 */
const CODE = 'ADTRACTIONUK'
const SHOW_FROM = Date.UTC(2026, 10, 1)
const SHOW_UNTIL = Date.UTC(2026, 11, 1)

export default function SemboUkCodeStrip({ lang, surface, className = '' }: { lang: string; surface: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const [now] = useState(() => Date.now())
  if (lang !== 'en' || now < SHOW_FROM || now >= SHOW_UNTIL) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // No clipboard access: the code stays on screen as selectable text.
    }
  }

  return (
    <aside
      aria-label="Sembo UK discount code"
      className={`rounded-2xl border-2 border-dashed border-[#0F172A]/20 bg-white p-3 text-left text-[#0F172A] sm:p-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <img src="/images/partners/sembo.png" alt="Sembo" width={300} height={100} loading="lazy" decoding="async" className="h-6 w-auto shrink-0" />
        <p className="min-w-0 flex-1 text-[15px] font-bold leading-snug">Booking in November? £30 off at Sembo UK</p>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-3 rounded-xl bg-[#F1F4F9] py-1.5 pl-3 pr-1.5">
        <span className="min-w-0">
          <span className="block text-[11px] font-medium text-[#0F172A]/60">Enter this code at checkout</span>
          <span className="block select-all text-base font-bold tracking-wide">{CODE}</span>
        </span>
        <button
          type="button"
          onClick={copy}
          data-umami-event="sembo_code_copy"
          data-umami-event-surface={surface}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-[#0F172A]/25 bg-white px-4 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0F172A]"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-[#0F172A]/75">
        £30 off a booking of £300 or more on sembo.co.uk. Book from 1 to 30 November 2026; travel on any date in November or
        December 2026. Prices are in British pounds (£); offer and terms are set by Sembo UK.
      </p>
    </aside>
  )
}
