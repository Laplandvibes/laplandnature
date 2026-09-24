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
  scale: number
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
  const labels = block.items ?? []
  const rows = cfg.rows ?? []
  const scale = cfg.scale || Math.max(1, ...rows.flatMap((r) => [r.grazed, r.protected]))
  const pct = (n: number) => `${Math.max(4, Math.round((n / scale) * 100))}%`

  return (
    <figure className="nw-fence">
      {block.title && <p className="nw-fence-h">{block.title}</p>}
      {rows.map((r, i) => (
        <div className="nw-fence-row" key={i}>
          <p className="nw-fence-site">{labels[i]}</p>
          <div className="nw-fence-pair">
            <div className="nw-fence-side">
              <p className="nw-fence-label">{labels[2]}</p>
              <div className="nw-fence-track">
                <span className="nw-fence-bar nw-fence-grazed" style={{ width: pct(r.grazed) }} />
                <b className="nw-fence-num">{r.grazed}</b>
              </div>
            </div>
            <div className="nw-fence-side nw-fence-in">
              <p className="nw-fence-label">{labels[3 + i]}</p>
              <div className="nw-fence-track">
                <span className="nw-fence-bar nw-fence-protected" style={{ width: pct(r.protected) }} />
                <b className="nw-fence-num">{r.protected}</b>
              </div>
            </div>
          </div>
        </div>
      ))}
      <figcaption className="nw-fence-cap">
        <span className="nw-fence-unit">{labels[5]}</span>
        {block.text && <span className="nw-fence-note">{block.text}</span>}
      </figcaption>
    </figure>
  )
}
