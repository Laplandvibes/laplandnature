import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Bell, Trees, Compass, PawPrint, AlertCircle } from 'lucide-react'
import { trackNewsletterSignup } from '../lib/analytics'

const ENDPOINT = '/api/newsletter'
const SOURCE = 'laplandnature'

// Per LV rule: ONE newsletter across the whole network. Position as
// #LaplandVibes, not as a per-site sub-brand. Source tag differentiates the
// referring site for analytics — the reader sees the master newsletter.
const benefits: { icon: typeof Bell; title: string; body: string }[] = [
  {
    icon: Bell,
    title: 'When the aurora actually shows',
    body: "We watch the FMI forecast every clear night from September to March. When KP lines up with clear skies, we drop you a heads-up so you can see the night — not just the forecast.",
  },
  {
    icon: Trees,
    title: 'When the trails are worth it',
    body: 'Ruska peak forecasts. Hut-trek booking days. Snow-cover for spring skiing. From the people who actually walked the trail that week.',
  },
  {
    icon: PawPrint,
    title: 'When the wildlife emerges',
    body: 'Bear-watching hides reopen mid-May. Reindeer round-ups in autumn. Arctic fox sightings nobody else flags. We pass them on as they happen.',
  },
  {
    icon: Compass,
    title: 'Where we’d go this weekend',
    body: 'The dark-sky spot we’d drive to tonight. The river before gold-panners crowd in. The fell our Sámi neighbours just photographed.',
  },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setError(null)
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: SOURCE }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`)
      }
      trackNewsletterSignup(data?.alreadySubscribed ? `${SOURCE}-already` : SOURCE)
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Error
          ? `Could not subscribe (${err.message}). Try again or email info@laplandvibes.com.`
          : 'Could not subscribe. Try again or email info@laplandvibes.com.',
      )
    }
  }

  return (
    <section
      id="newsletter"
      className="py-20 sm:py-24 px-4 sm:px-6"
      style={{ background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/85 font-semibold mb-3">
            The <span className="font-heading tracking-wider">#LAPLANDVIBES</span> newsletter
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-wide mb-4">
            We mostly walk Lapland.<br className="hidden sm:block" /> Then we write what we learn.
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            One short email when the aurora window opens, the hides reopen, or a hut-trek you’d
            actually book hits the calendar. Written from Finland, in English. Roughly once a month —
            never on a schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <div
                key={b.title}
                className="bg-white/12 backdrop-blur-sm border border-white/25 rounded-2xl p-5 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-white font-bold text-base mb-1.5">{b.title}</p>
                <p className="text-white/85 text-sm leading-relaxed">{b.body}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center max-w-xl mx-auto">
          {status === 'done' ? (
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-6 py-4 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <p className="text-base font-medium">Got you. We’ll see you under the aurora.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 rounded-xl text-deep-night bg-white placeholder:text-deep-night/50 focus:outline-none focus:ring-2 focus:ring-white/70 border border-white/40"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-4 bg-white font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ color: '#DB2777' }}
              >
                {status === 'loading' ? 'Sending…' : 'Send me Lapland'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {error && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-4 py-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <p className="text-white/75 text-xs mt-5">
            One email when there’s something to say. Unsubscribe with one click — no questions.{' '}
            <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
