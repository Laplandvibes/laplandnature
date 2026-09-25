import { creditFor } from '../data/photoCredits'
import { useLang } from '../i18n/useLang'

const LABEL: Record<string, string> = {
  en: 'Photo', fi: 'Kuva', de: 'Foto', ja: '写真', es: 'Foto', 'pt-BR': 'Foto',
  'zh-CN': '照片', ko: '사진', fr: 'Photo', it: 'Foto', nl: 'Foto', sv: 'Foto',
}

/**
 * Kuvaajamerkintä kuvan oikeaan alakulmaan (Vesa 25.9.2026: *"kuva tekstit aina
 * pienemmällä ja oikea alareuna"*). Luetaan tiedostonimestä `photoCredits.ts`:stä,
 * joten jokainen pinta joka näyttää saman tiedoston saa saman merkinnän.
 *
 * CC BY / BY-SA vaatii tekijän, lisenssin nimen ja linkin lisenssiin. Omat kuvat
 * saavat pelkän "Kuva: LaplandVibes" -merkinnän ilman linkkejä.
 *
 * Kontrasti: valkoinen black/55-pohjalla on puhtaan valkoisen kuvan päälläkin
 * 4,8:1, koska pohja on kiinteä eikä kuvan varassa. `lv-tap` antaa pienille
 * linkeille 44 px:n osuma-alueen alle 1024 px:n. `rel` ilman `noreferrer`
 * (verkoston sääntö).
 */
export default function PhotoCredit({ src, className = '', plain = false }: { src: string; className?: string; plain?: boolean }) {
  const lang = useLang()
  const credit = creditFor(src)
  if (!credit) return null
  const label = LABEL[lang] ?? LABEL.en
  const box = `absolute bottom-0 right-0 z-10 max-w-full rounded-tl bg-black/55 px-1.5 py-[2px] text-[9px] sm:text-[10px] leading-tight text-white ${className}`
  // `plain`: the image sits inside a link (a whole card is an <a>), and an <a> inside an <a>
  // is invalid. The mark stays on the image as text; the links live in <PhotoCreditsList>.
  if (plain || credit.license === 'own' || !credit.sourceUrl) {
    const lic = credit.license === 'own' || credit.license === 'partner' ? '' : `, ${credit.license}`
    return <span className={box}>{label}: {credit.author}{lic}</span>
  }
  return (
    <span className={box}>
      {label}:{' '}
      <a href={credit.sourceUrl} target="_blank" rel="noopener" className="lv-tap underline decoration-white/50 underline-offset-2 hover:decoration-white">
        {credit.author}
      </a>
      {credit.licenseUrl && (
        <>
          {', '}
          <a href={credit.licenseUrl} target="_blank" rel="license noopener" className="lv-tap underline decoration-white/50 underline-offset-2 hover:decoration-white">
            {credit.license}
          </a>
        </>
      )}
    </span>
  )
}

const LIST_H: Record<string, string> = {
  en: 'Photos on this page', fi: 'Tämän sivun kuvat', de: 'Fotos auf dieser Seite', ja: 'このページの写真',
  es: 'Fotos de esta página', 'pt-BR': 'Fotos desta página', 'zh-CN': '本页照片', ko: '이 페이지의 사진',
  fr: 'Photos de cette page', it: 'Foto di questa pagina', nl: "Foto's op deze pagina", sv: 'Foton på sidan',
}

/**
 * Kuvaluettelo sivun lopussa: tekijä, lähde ja lisenssi linkkeinä niille kuville, joiden
 * merkintä piirtyy kortissa pelkkänä tekstinä (`plain`). Näyttää vain avoimen lisenssin kuvat.
 */
export function PhotoCreditsList({ srcs }: { srcs: string[] }) {
  const lang = useLang()
  const seen = new Set<string>()
  const rows = srcs
    .map((s) => ({ s, c: creditFor(s) }))
    .filter((r) => r.c && r.c.license !== 'own' && r.c.license !== 'partner' && r.c.sourceUrl && !seen.has(r.c.sourceId) && seen.add(r.c.sourceId))
  if (rows.length === 0) return null
  return (
    <section className="px-4 sm:px-6 py-8 border-t border-deep-night/10">
      <div className="max-w-6xl mx-auto text-sm text-deep-night/75">
        <h2 className="font-body font-semibold text-deep-night mb-2 text-sm">{LIST_H[lang] ?? LIST_H.en}</h2>
        <ul className="space-y-1">
          {rows.map(({ c }) => (
            <li key={c!.sourceId}>
              {c!.place} ({c!.taken.slice(0, 4)}):{' '}
              <a href={c!.sourceUrl} target="_blank" rel="noopener" className="underline underline-offset-2">{c!.author}</a>
              {c!.licenseUrl && (
                <>
                  {', '}
                  <a href={c!.licenseUrl} target="_blank" rel="license noopener" className="underline underline-offset-2">{c!.license}</a>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
