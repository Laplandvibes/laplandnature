/**
 * Jutun omat upotukset — laplandnature.com.
 *
 * `FenceFigure` on Kilpisjärvi-jutun oma kuva, ei yleinen lukulaatikko
 * (11-artikkelin-viimeistely §3: "neljä laattaa ei ole grafiikkaa"). Se piirtää
 * juuri sen mitä koe teki: kaksi tutkimusaluetta, ja kummallakin aidan kaksi
 * puolta. Luvut ovat mitattuja kukkavierailuja, ja niiden paikka kuvassa on se
 * koeala jolla ne laskettiin — sama periaate kuin RiverLadderissa (hubi 7.9.).
 *
 * §3b:n mukaisesti: yksi aksenttiväri koko objektissa (metsänvihreä = aidattu),
 * laidunnettu puoli neutraalilla musteella, selitteet 15 px ja 85 % peitolla,
 * ei liikettä eikä gradienttia. Luvut leipäkirjasimella — Bebas on versaali-
 * kirjasin eikä sisällä CJK-merkkejä (§2).
 *
 * Luvut ja koealojen suhteet tulevat meta.jsonin `embeds`-lohkosta (kieliriippumaton
 * data), kielikohtaiset selitteet artikkelin `items`-listasta. Portti
 * scripts/news-prerender.mjs vertaa `items`-listan rakenteen ja luvut englantiin.
 */
import type { NewsBlock } from './types'
import { useLang } from '../i18n/useLang'

interface FenceRow {
  /** Kukkavierailut laidunnetulla koealalla. */
  grazed: number
  /** Kukkavierailut aidatulla (tai aidatulla + ravinnelisätyllä) koealalla. */
  protected: number
}

interface FenceConfig {
  type: 'fence'
  rows: FenceRow[]
  /** Suurin arvo, johon palkkien leveys suhteutetaan. */
  scale?: number
  /**
   * 5.10.2026 (Viiankiaapa-juttu): rivit ovat eri mittaluokkaa (aapasuo ~1 000 ha, letto 78 ha),
   * joten yhteinen asteikko painaisi alemman rivin palkit näkymättömiksi. Jokainen rivi omaan maksimiinsa;
   * rivien välistä vertailua ei silloin tehdä palkin pituudella, vaan luvut kertovat sen.
   */
  rowScale?: boolean
  /** Ei aitaa: oikean puolen katkoviiva (= aita Kilpisjärven kokeessa) jätetään pois. */
  plain?: boolean
}

/**
 * items-listan järjestys (sama kaikissa 12 kielessä, portti tarkistaa):
 *   0  ylemmän rivin koealan nimi
 *   1  alemman rivin koealan nimi
 *   2  "porojen laiduntama"
 *   3  ylemmän rivin suojatun koealan käsittely
 *   4  alemman rivin suojatun koealan käsittely
 *   5  mitä luvut ovat
 */
export function FenceFigure({ config, block }: { config: Record<string, unknown>; block: Extract<NewsBlock, { t: 'embed' }> }) {
  const cfg = config as unknown as FenceConfig
  const lang = useLang()
  const labels = block.items ?? []
  const rows = cfg.rows ?? []
  const scale = cfg.scale || Math.max(1, ...rows.flatMap((r) => [r.grazed, r.protected]))
  // Nolla on nolla: 4 %:n minimipalkki näyttäisi olemassa olevalta määrältä (Viiankiaavan korvaavilla alueilla
  // ei ole lainkaan erinomaisessa tilassa olevaa aapasuota). Nollalle ei piirretä palkkia lainkaan, ettei rivin
  // väli siirrä lukua sisennetyksi.
  const pct = (n: number, max: number) => (n <= 0 ? '0%' : `${Math.max(4, Math.round((n / max) * 100))}%`)
  // Tuhaterotin lukijan kielellä (1 000 / 1,000 / 1.000); alle tuhannen luvut ennallaan.
  const fmt = (n: number) => new Intl.NumberFormat(lang).format(n)

  return (
    <figure className={`nw-fence${cfg.plain ? ' nw-fence--plain' : ''}`}>
      {block.title && <p className="nw-fence-h">{block.title}</p>}
      {rows.map((r, i) => {
        const max = cfg.rowScale ? Math.max(1, r.grazed, r.protected) : scale
        return (
          <div className="nw-fence-row" key={i}>
            <p className="nw-fence-site">{labels[i]}</p>
            <div className="nw-fence-pair">
              <div className="nw-fence-side">
                <p className="nw-fence-label">{labels[2]}</p>
                <div className="nw-fence-track">
                  {r.grazed > 0 && <span className="nw-fence-bar nw-fence-grazed" style={{ width: pct(r.grazed, max) }} />}
                  <b className="nw-fence-num">{fmt(r.grazed)}</b>
                </div>
              </div>
              <div className="nw-fence-side nw-fence-in">
                <p className="nw-fence-label">{labels[3 + i]}</p>
                <div className="nw-fence-track">
                  {r.protected > 0 && <span className="nw-fence-bar nw-fence-protected" style={{ width: pct(r.protected, max) }} />}
                  <b className="nw-fence-num">{fmt(r.protected)}</b>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <figcaption className="nw-fence-cap">
        <span className="nw-fence-unit">{labels[5]}</span>
        {block.text && <span className="nw-fence-note">{block.text}</span>}
      </figcaption>
    </figure>
  )
}
