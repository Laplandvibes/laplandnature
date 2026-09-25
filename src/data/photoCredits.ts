/**
 * Sivuston valokuvien tekijätiedot JA lisenssikuitti (25.9.2026).
 *
 * Vesa 25.9.2026: *"kuvat pitää vaihtaa aitoihin"*. Sivuston kuvat olivat
 * tekoälyn tekemiä (kesällä 2026 Drive-kansiosta tulleet 6336×2688-kuvat ja
 * 7.9. tehty talvihero). Järjestys CLAUDE.md:n mukaan: oma valokuva →
 * lisensoitu kuva oikeasta Lapin kohteesta → AI → CSS-liukuväri. Tekoälyn
 * alkuperäiset: `_reissu-2026-07/_ai-originals-backup/laplandnature/`.
 *
 * Kaksi lakirajaa, tarkistettu jokaisesta kuvasta erikseen:
 *   1. EI editorial-only. CC BY / CC BY-SA sallii kaupallisen käytön, ja
 *      affiliate-tulo tekee sivusta kaupallisen.
 *   2. EI viranomaisen hyväksynnän vaikutelmaa: ei logoja, kylttejä eikä
 *      tunnistettavia ihmisiä.
 *
 * 🔴 Avoimen lisenssin kuvia EI rajata tiedostossa. Tiedosto on alkuperäinen
 * teos pienennettynä ja WebP/AVIF-muotoon muunnettuna; rajaus tapahtuu vain
 * CSS:n object-coverilla. Rajattu tiedosto olisi muokattu teos.
 * Omat kuvat saa rajata.
 *
 * 🔴 Merkintä piirtyy `PhotoCredit`-komponentissa tiedostonimen perusteella,
 * ei kutsupaikassa: sama tiedosto voi olla usealla pinnalla (hero + kortti),
 * ja yhdestä unohtunut merkintä olisi lisenssirikkomus juuri sillä pinnalla.
 *
 * Kuitti (CLAUDE.md): lähde, tunniste, lisenssi, päivä, hinta.
 * Sama tiedosto ei saa olla toisella LV-sivustolla: tarkistettu GNU grepillä
 * jokaisesta sivustokansiosta ja kirjattu `_reissu-2026-07/KUVA-INVENTAARIO.md` §6b.
 */
export type PhotoCredit = {
  /** Tekijä siinä muodossa kuin hän on sen Commonsiin merkinnyt, tai "LaplandVibes" omissa kuvissa. */
  author: string
  license:
    | 'CC BY 2.0'
    | 'CC BY 3.0'
    | 'CC BY 4.0'
    | 'CC BY-SA 2.0'
    | 'CC BY-SA 3.0'
    | 'CC BY-SA 4.0'
    | 'CC0 1.0'
    | 'Public domain'
    | 'own'
    | 'partner'
  licenseUrl?: string
  /** Commonsin kuvasivu (kuvaus, tekijä ja lisenssi alkuperäisessä muodossa). Omissa kuvissa tyhjä. */
  sourceUrl?: string
  /** Kuitti: Commonsin tiedostonimi tai oman kuvan master-tiedosto. */
  sourceId: string
  /** Kuvauspäivä YYYY-MM(-DD) lähteen mukaan. */
  taken: string
  /** Paikka lähteen kuvauksen, GPS:n tai tunnistetun kyltin mukaan. */
  place: string
  /** Kuitti: milloin otettu käyttöön ja hinta. */
  receipt: string
}

/**
 * Avain = tiedoston perusnimi ilman polkua, kokoa (-800/-1200) ja päätettä,
 * esim. `hero-national-parks`. Täytetään kuvanvaihdon yhteydessä.
 */
export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
  'hero-home': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Landscape_towards_Pallastunturi_in_Muonio%2C_Lapland%2C_Finland%2C_2021_June.jpg', sourceId: 'Landscape towards Pallastunturi in Muonio, Lapland, Finland, 2021 June.jpg (sha1 307bd40f47671fd60b9607667c1ef1eba1ca74b3, 5000x2539)', taken: '2021-06-14', place: 'Pallastunturi, Muonio', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-home-autumn': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_view_towards_Paistunturi_Wilderness_Area_and_Ailikas%2C_Utsjoki%2C_Lapland%2C_Finland%2C_2021_September.jpg', sourceId: 'Aerial view towards Paistunturi Wilderness Area and Ailikas, Utsjoki, Lapland, Finland, 2021 September.jpg (sha1 cf1c393515ccf04017cbd6aa4a0b9871f63fade9, 3600x2342)', taken: '2021-09-19', place: 'Paistunturin erämaa, Utsjoki', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-home-winter': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pallastunturi_mountain_range_from_the_east%2C_Kittil%C3%A4%2C_Finland%2C_2019_January.jpg', sourceId: 'Pallastunturi mountain range from the east, Kittilä, Finland, 2019 January.jpg (sha1 e5166ad4c14ecdd20ebd84dc783e25969729fbb2, 6500x1700)', taken: '2019-01-19', place: 'Pallastunturi, Kittilä', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-national-parks': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Landscape_from_Kultakero%2C_Pyh%C3%A4tunturi%2C_Pelkosenniemi%2C_Lapland%2C_Finland%2C_2021_September_-_2.jpg', sourceId: 'Landscape from Kultakero, Pyhätunturi, Pelkosenniemi, Lapland, Finland, 2021 September - 2.jpg (sha1 3e7edf0977b8662a23abfdc9969e4d7ba68ce764, 4200x2800)', taken: '2021-09-17', place: 'Kultakero, Pyhä-Luosto', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-northern-lights': { author: 'Mountain-Goat-57', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:2014-Aurora-KIlpisj%C3%A4rvi-Schweiger-2-new.jpg', sourceId: '2014-Aurora-KIlpisjärvi-Schweiger-2-new.jpg (sha1 ed2da50e502fd70f0626627ea1b21afed1429d4f, 4252x2835)', taken: '2014-01-21', place: 'Kilpisjärvi', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-wildlife': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Reindeer_on_the_shoulder_of_Saana_in_Enonteki%C3%B6%2C_Lapland%2C_Finland%2C_2026_August.jpg', sourceId: 'Reindeer on the shoulder of Saana in Enontekiö, Lapland, Finland, 2026 August.jpg (sha1 6702579e373d6cd53b362f21303fd6891d3e78ca, 3600x2400)', taken: '2026-08-04', place: 'Saana, Kilpisjärvi', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-hiking': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Duckboards_on_the_foothill_of_Saana%2C_Enonteki%C3%B6%2C_Lapland%2C_Finland_in_2026_August.jpg', sourceId: 'Duckboards on the foothill of Saana, Enontekiö, Lapland, Finland in 2026 August.jpg (sha1 4059d14c6cab0c14600323d11e5012cb2c618c50, 5000x3333)', taken: '2026-08-04', place: 'Saana, Kilpisjärvi', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-seasons': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Autumn_landscape_towards_Taivaskero_and_Pyh%C3%A4kero%2C_Muonio%2C_Lapland%2C_Finland%2C_2023_September.jpg', sourceId: 'Autumn landscape towards Taivaskero and Pyhäkero, Muonio, Lapland, Finland, 2023 September.jpg (sha1 3da131b99620b7f6b95d7ef26cd2d808a61aeb98, 6900x3610)', taken: '2023-09-14', place: 'Pallas, Muonio', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-conservation': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dead_and_alive_pinetrees_of_Kivitunturi%2C_Savukoski%2C_Lapland%2C_Finland%2C_2021_June.jpg', sourceId: 'Dead and alive pinetrees of Kivitunturi, Savukoski, Lapland, Finland, 2021 June.jpg (sha1 8aa9016e3492ea4047088c65688b7a3dd58c55cf, 5000x3333)', taken: '2021-06-16', place: 'Kivitunturi, Savukoski', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'hero-freshwater': { author: 'LaplandVibes', license: 'own', sourceId: 'Juuso Lahtela, IMG_5249 (Drive: Juuson kuvat, Kemijärvi), rajaus 0,300 4032×1900', taken: '2026-09-21', place: 'Kemijärvi', receipt: 'Oma kuva, käyttöoikeus Vesa 23.9.2026 (lv_permanent_rules §37), otettu käyttöön 26.9.2026, 0 €' },
  'card-national-parks': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Landscape_from_Kultakero%2C_Pyh%C3%A4tunturi%2C_Pelkosenniemi%2C_Lapland%2C_Finland%2C_2021_September_-_2.jpg', sourceId: 'Landscape from Kultakero, Pyhätunturi, Pelkosenniemi, Lapland, Finland, 2021 September - 2.jpg (sha1 3e7edf0977b8662a23abfdc9969e4d7ba68ce764, 4200x2800)', taken: '2021-09-17', place: 'Kultakero, Pyhä-Luosto', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'card-northern-lights': { author: 'Daniele57C', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Aurora_ad_Inari_-_1.jpg', sourceId: 'Aurora ad Inari - 1.jpg (sha1 9fd796387a0ccc34245087fd7b2a5c5b9941b652, 4024x6048)', taken: '2025-03-14', place: 'Inari', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'card-wildlife': { author: 'Ninara', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kuusamo%2C_Finland_-_Bears3.jpg', sourceId: 'Kuusamo, Finland - Bears3.jpg (sha1 4235fafea18af7ca6bde5677acd6ea8576852587, 5820x3880)', taken: '2023-07-28', place: 'Kuusamo', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'card-hiking': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Oulanka_Canyon_in_Oulanka_National_Park%2C_Salla%2C_Lapland%2C_Finland%2C_2021_June.jpg', sourceId: 'Oulanka Canyon in Oulanka National Park, Salla, Lapland, Finland, 2021 June.jpg (sha1 29fea56176d20bf563d74a1fb0e5fd9f748214de, 3402x3600)', taken: '2021-06-19', place: 'Oulangan kanjoni, Salla', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'card-conservation': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rocky_boreal_forest_landscape_on_Kivitunturi%2C_Savukoski%2C_Lapland%2C_Finland%2C_2021_June.jpg', sourceId: 'Rocky boreal forest landscape on Kivitunturi, Savukoski, Lapland, Finland, 2021 June.jpg (sha1 126beaa5bb7517fac3f57e6ab9507e1eef96dc50, 5000x3309)', taken: '2021-06-16', place: 'Kivitunturi, Savukoski', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'card-midnight-sun': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Midnight_landscape_from_Oratunturi_towards_west%2C_Sodankyl%C3%A4%2C_Lapland%2C_Finland%2C_2019_June.jpg', sourceId: 'Midnight landscape from Oratunturi towards west, Sodankylä, Lapland, Finland, 2019 June.jpg (sha1 c292561d2f5cefee6dd3635660f00bb9e522e0c8, 6000x2277)', taken: '2019-06-15', place: 'Oratunturi, Sodankylä', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'card-freshwater': { author: 'LaplandVibes', license: 'own', sourceId: 'Juuso Lahtela, IMG_5249 (Drive: Juuson kuvat, Kemijärvi), rajaus 0,150 4032×2520', taken: '2026-09-21', place: 'Kemijärvi', receipt: 'Oma kuva, käyttöoikeus Vesa 23.9.2026 (lv_permanent_rules §37), otettu käyttöön 26.9.2026, 0 €' },
  'season-ruska': { author: 'LaplandVibes', license: 'own', sourceId: 'Juuso Lahtela, IMG_5231 (Drive: Juuson kuvat, Kemijärvi), rajaus 0,1750 3024×1701', taken: '2026-09-21', place: 'Kemijärvi', receipt: 'Oma kuva, käyttöoikeus Vesa 23.9.2026 (lv_permanent_rules §37), otettu käyttöön 26.9.2026, 0 €' },
  'season-kaamos': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Getting_dark_after_sunset_at_Pallastunturi_in_Muonio%2C_Finland%2C_2019_January.jpg', sourceId: 'Getting dark after sunset at Pallastunturi in Muonio, Finland, 2019 January.jpg (sha1 0f7b15c927181b83e318f8d88551b8572f7e4eaa, 3500x1596)', taken: '2019-01-20', place: 'Pallastunturi, Muonio', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'season-midnight-sun': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Midnight_landscape_from_Oratunturi_towards_west%2C_Sodankyl%C3%A4%2C_Lapland%2C_Finland%2C_2019_June.jpg', sourceId: 'Midnight landscape from Oratunturi towards west, Sodankylä, Lapland, Finland, 2019 June.jpg (sha1 c292561d2f5cefee6dd3635660f00bb9e522e0c8, 6000x2277)', taken: '2019-06-15', place: 'Oratunturi, Sodankylä', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'season-spring': { author: 'Manfred Werner - Tsui', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kattaj%C3%A4rvi_Inari_Suomi_-_Finland_2013-03_014.jpg', sourceId: 'Kattajärvi Inari Suomi - Finland 2013-03 014.jpg (sha1 d0c51cdd9dae0ce599aae4dc868047dc83164df3, 3500x2333)', taken: '2013-03-12', place: 'Kattajärvi, Inari', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta). Korvasi Saana 2012 March -kuvan, joka on jo laplandweddingsin käytössä' },
  'freshwater-lakes': { author: 'Inaricity', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:A_view_from_Ukko.jpg', sourceId: 'A view from Ukko.jpg (sha1 4db261d4b66357c0f31bcad5ea5a3afa427bb8f7, 4000x2250)', taken: '2017-09-12', place: 'Inarijärvi', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'freshwater-mires': { author: 'LaplandVibes', license: 'own', sourceId: 'Juuso Lahtela, IMG_5244 (Drive: Juuson kuvat, Kemijärvi), rajaus 0,1600 3024×1890', taken: '2026-09-21', place: 'Kemijärvi', receipt: 'Oma kuva, käyttöoikeus Vesa 23.9.2026 (lv_permanent_rules §37), otettu käyttöön 26.9.2026, 0 €' },
  'freshwater-forests': { author: 'Ximonic (Simo Räsänen)', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alajoki_towards_north_in_Inari%2C_Lapland%2C_Finland%2C_2017_November.jpg', sourceId: 'Alajoki towards north in Inari, Lapland, Finland, 2017 November.jpg (sha1 01a57f3cc6df33710b581c05d8230a4f7e76a064, 3000x2000)', taken: '2017-11-14', place: 'Alajoki, Inari', receipt: 'Wikimedia Commons, otettu käyttöön 26.9.2026, 0 €, vain pienennys (ei rajausta)' },
  'freshwater-rivers': { author: 'LaplandVibes', license: 'own', sourceId: '20260721_172809.jpg (Vesan heinäkuun 2026 reissu)', taken: '2026-07-21', place: 'Tornionjoki, Korpikoski, Pello', receipt: 'Oma kuva, käytössä 30.8.2026 alkaen (b474556), 0 €' },
  'bear-kuusamo-tree': { author: 'Piritta Paija / Bear Kuusamo', license: 'partner', sourceId: 'Bear Kuusamon toimittama kuva (kumppanimateriaali)', taken: '', place: 'Kuusamo', receipt: 'Kumppanin oma tiedosto, käytössä kumppaniartikkelissa 7/2026' },
}

/** `/images/hero-home-1200.avif?v=abc` → `hero-home` */
export function creditKey(src: string): string {
  const file = src.split('?')[0].split('/').pop() ?? ''
  return file.replace(/\.(avif|webp|jpe?g|png)$/i, '').replace(/-(800|1200|1600)$/, '')
}

export function creditFor(src: string): PhotoCredit | undefined {
  return PHOTO_CREDITS[creditKey(src)]
}
