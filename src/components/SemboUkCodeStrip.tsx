import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * Sembon alennuskoodi olemassa olevan Sembo-napin alla, sille markkinalle, jonne napin klikki menee.
 *
 * - en: Sembo UK, koodi ADTRACTIONUK. Lähde: Adtractionin posti info@:iin 27.10.2026 ("Sembo UK - November code!",
 *   unitedkingdom@adtraction.com) + Adtractionin tarjousrajapinta 23.11.2026 (offerId 2124605571): £30 alennus,
 *   vähintään £300, varaus 1.–30.11.2026, matka milloin tahansa marras- tai joulukuussa 2026. Worker vie englannin-
 *   kieliset majoitusklikit sembo.co.uk:hon 17.10.2026 alkaen.
 * - fi: Sembo FI, koodi ADTRACTIONFI. Lähde: Adtractionin posti 23.11.2026 ("Vain 30.11. asti: Sembon -30 € koodi!",
 *   finland@adtraction.com: "Nosta vielä tarjous esille kanavassasi") + tarjousrajapinta 23.11.2026 (offerId 2125060777):
 *   30 € alennus, vähintään 300 €, varaus 1.–30.11.2026, matka milloin tahansa marras- tai joulukuussa 2026. fi_FI-klikit
 *   menevät sembo.fi:hin.
 *
 * Sembo SE ja Sembo DE: tarjousrajapinta 23.11.2026 "No offers or coupons found" ⇒ ei nauhaa. Muut kielet menevät Trip.comiin.
 * Nauhalla ei ole omaa nappia: se on napin alla, jota lukija on painamassa, ja nappi avaa jo oikean Sembon.
 *
 * Näkyvyys päätetään renderöinnissä (kumpikaan pää ei vaadi julkaisua): en 1.11.2026 00.00–1.12.2026 00.00 UK:n aikaa
 * (GMT marraskuussa), fi 1.11.2026–1.12.2026 00.00 Suomen aikaa. Literaalivärit, jotta nauha toimii tummalla ja vaalealla.
 * Ulkoasu kuten KampanjaNauha 19.11.2026 (Vesa: "ei näytä firm"): yhtenäinen reuna, ei katkoviivaa (ei täytettävä kuponki).
 */
interface Tarjous {
  koodi: string
  alku: number
  loppu: number
  aria: string
  otsikko: string
  koodiLappu: string
  kopioi: string
  kopioitu: string
  ehdot: string
}

const TARJOUKSET: Record<string, Tarjous> = {
  en: {
    koodi: 'ADTRACTIONUK',
    alku: Date.UTC(2026, 10, 1),
    loppu: Date.UTC(2026, 11, 1),
    aria: 'Sembo UK discount code',
    otsikko: 'Booking in November? £30 off at Sembo UK',
    koodiLappu: 'Enter this code at checkout',
    kopioi: 'Copy',
    kopioitu: 'Copied',
    ehdot:
      '£30 off a booking of £300 or more on sembo.co.uk. Book from 1 to 30 November 2026; travel on any date in November or ' +
      'December 2026. Prices are in British pounds (£); offer and terms are set by Sembo UK.',
  },
  fi: {
    koodi: 'ADTRACTIONFI',
    alku: Date.UTC(2026, 9, 31, 22), // 1.11.2026 klo 00.00 Suomen aikaa
    loppu: Date.UTC(2026, 10, 30, 22), // 1.12.2026 klo 00.00 Suomen aikaa
    aria: 'Sembon alennuskoodi',
    otsikko: 'Majoitus marras- tai joulukuulle? Sembolta 30 € alennusta',
    koodiLappu: 'Syötä koodi varausta tehdessäsi',
    kopioi: 'Kopioi',
    kopioitu: 'Kopioitu',
    ehdot:
      'Alennus on 30 €, kun varauksen arvo on vähintään 300 €. Varaa sembo.fi-sivustolla viimeistään 30.11.2026 ' +
      'ja matkusta marras–joulukuussa 2026. Tarjouksesta ja sen ehdoista vastaa Sembo.',
  },
}

/** Voimassa oleva tarjous lukijan kielellä tai undefined. Testejä varten `now`. */
export function semboTarjous(lang: string | undefined, now: number = Date.now()): Tarjous | undefined {
  const t = TARJOUKSET[(lang || '').toLowerCase().split('-')[0]]
  return t && now >= t.alku && now < t.loppu ? t : undefined
}

export default function SemboUkCodeStrip({ lang, surface, className = '' }: { lang: string; surface: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const [now] = useState(() => Date.now())
  const t = semboTarjous(lang, now)
  if (!t) return null
  const kieli = (lang || '').toLowerCase().split('-')[0]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t.koodi)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ei leikepöytää: koodi jää näkyviin valittavana tekstinä.
    }
  }

  return (
    <aside
      aria-label={t.aria}
      data-sembo-koodi={kieli}
      className={`rounded-2xl border border-[#0F172A]/15 bg-white p-4 text-left text-[#0F172A] shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_12px_rgba(15,23,42,0.04)] ${className}`}
    >
      <div className="flex items-center gap-3">
        <img src="/images/partners/sembo.png" alt="Sembo" width={300} height={100} loading="lazy" decoding="async" className="h-6 w-auto shrink-0" />
        <p className="min-w-0 flex-1 text-base font-bold leading-snug [text-wrap:balance]">{t.otsikko}</p>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-[#F1F4F9] py-1.5 pl-3 pr-1.5 sm:max-w-md">
        <span className="min-w-0">
          <span className="block text-sm font-medium text-[#0F172A]/75">{t.koodiLappu}</span>
          <span className="block select-all text-base font-bold tracking-wide">{t.koodi}</span>
        </span>
        <button
          type="button"
          onClick={copy}
          data-umami-event="sembo_code_copy"
          data-umami-event-surface={surface}
          data-umami-event-lang={kieli}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-[#0F172A]/25 bg-white px-4 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0F172A]"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          <span aria-live="polite">{copied ? t.kopioitu : t.kopioi}</span>
        </button>
      </div>
      {/* Ehdot ovat kokonaisia virkkeitä, joten ne ovat leipätekstiä: 16 px ja muste vähintään /75 (§33, gate:kuvateksti). */}
      <p className="mt-2.5 text-base leading-relaxed text-[#0F172A]/75 [text-wrap:pretty]">{t.ehdot}</p>
    </aside>
  )
}
