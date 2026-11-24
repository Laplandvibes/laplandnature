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
 *
 * Asettelu 24.11.2026 (Vesa puhelimella: "ei ole yhtään mietitty missä mikäkin lukee? miksi sembo logo pitää olla noin
 * lähellä jolloin otsikko näyttää rumalta"): logo ja määräaika omalla rivillään, alennus otsikkona koko leveydellä,
 * koodi isona omassa laatikossaan, ohje yhtenä lyhyenä rivinä lopussa. Leveä kortti (konttikysely @3xl, vähintään 768 px)
 * asettaa koodilaatikon otsikon viereen; kapeassa kaikki allekkain. Konttikysely eikä näytön leveys, koska sama kortti
 * on hubissa 1080 px leveä ja staysissa max-w-xl. Sitova väli (U+00A0) pitää "300 euron" yhdessä; "marras- tai" vältetään, koska selain katkaisee yhdysmerkin jälkeen sitovasta välistä huolimatta (mitattu 1024 px). Alle 320 px:n kortissa (appin hotellikortti 262 px) Kopioi-nappi siirtyy koodin alle ja määräaikamerkki logon alle, muuten nappi peitti koodin lopun. Otsikko 28 px alle 384 px:n kortissa, jotta se mahtuu yhdelle riville 360 px:n puhelimella.
 */
interface Tarjous {
  koodi: string
  alku: number
  loppu: number
  aria: string
  merkki: string
  otsikko: string
  ehto: string
  koodiLappu: string
  kopioi: string
  kopioitu: string
  ohje: string
}

const TARJOUKSET: Record<string, Tarjous> = {
  en: {
    koodi: 'ADTRACTIONUK',
    alku: Date.UTC(2026, 10, 1),
    loppu: Date.UTC(2026, 11, 1),
    aria: 'Sembo UK discount code',
    merkki: 'Book by 30 November',
    otsikko: '£30 off your stay',
    ehto: 'On bookings of £300 or more for travel before the end of 2026.',
    koodiLappu: 'Discount code',
    kopioi: 'Copy',
    kopioitu: 'Copied',
    ohje: 'Enter the code at checkout. Prices are in pounds (£).',
  },
  fi: {
    koodi: 'ADTRACTIONFI',
    alku: Date.UTC(2026, 9, 31, 22), // 1.11.2026 klo 00.00 Suomen aikaa
    loppu: Date.UTC(2026, 10, 30, 22), // 1.12.2026 klo 00.00 Suomen aikaa
    aria: 'Sembon alennuskoodi',
    merkki: 'Varaa 30.11. mennessä',
    otsikko: '–30 € majoituksesta',
    ehto: 'Koskee vähintään 300 euron varausta, kun matkustat vielä tänä vuonna.',
    koodiLappu: 'Alennuskoodi',
    kopioi: 'Kopioi',
    kopioitu: 'Kopioitu',
    ohje: 'Syötä koodi varausta tehdessäsi. Ehdoista vastaa Sembo.',
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
      className={`@container rounded-2xl border border-[#0F172A]/15 bg-white text-left text-[#0F172A] shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_12px_rgba(15,23,42,0.04)] ${className}`}
    >
      <div className="p-4 @md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <img src="/images/partners/sembo.png" alt="Sembo" width={300} height={100} loading="lazy" decoding="async" className="h-6 w-auto shrink-0" />
          <span className="whitespace-nowrap rounded-full bg-[#F1F4F9] px-3 py-1 text-sm font-semibold text-[#0F172A]">{t.merkki}</span>
        </div>
        <div className="mt-4 @3xl:flex @3xl:items-center @3xl:justify-between @3xl:gap-8">
          <div className="min-w-0">
            <p className="font-heading text-[1.75rem] leading-[1.05] tracking-wide text-[#0F172A] [text-wrap:balance] @sm:text-[2rem] @md:text-[2.25rem]">{t.otsikko}</p>
            <p className="mt-1.5 text-base leading-snug text-[#0F172A]/75 [text-wrap:pretty]">{t.ehto}</p>
          </div>
          <div className="mt-4 flex flex-col gap-2.5 rounded-xl bg-[#F1F4F9] p-3 pl-4 @xs:flex-row @xs:items-center @xs:justify-between @xs:gap-3 @xs:py-2 @xs:pr-2 @3xl:mt-0 @3xl:w-80 @3xl:shrink-0">
            <span className="min-w-0">
              <span className="block whitespace-nowrap text-sm font-medium text-[#0F172A]/75">{t.koodiLappu}</span>
              <span className="block select-all whitespace-nowrap text-lg font-bold tracking-wider">{t.koodi}</span>
            </span>
            <button
              type="button"
              onClick={copy}
              data-umami-event="sembo_code_copy"
              data-umami-event-surface={surface}
              data-umami-event-lang={kieli}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#0F172A]/25 bg-white px-4 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0F172A]"
            >
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              <span aria-live="polite">{copied ? t.kopioitu : t.kopioi}</span>
            </button>
          </div>
        </div>
        {/* Kokonaisia virkkeitä ⇒ leipätekstiä: 16 px ja muste vähintään /75 (§33, gate:kuvateksti). */}
        <p className="mt-3 text-base leading-snug text-[#0F172A]/75 [text-wrap:pretty]">{t.ohje}</p>
      </div>
    </aside>
  )
}
