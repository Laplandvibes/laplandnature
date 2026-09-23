import type { NewsletterPopupCopy, NewsletterPopupTheme } from '../shared/NewsletterPopup';

/**
 * laplandnature.com: uutiskirjepopupin oma väri ja teksti.
 *
 * Vesa 23.9.2026: "tekstit ja värimaailma sivustokohtaisiksi" → "kyllä, vie
 * kaikille". Kuva, lomake, nappi ja #LAPLAND-merkki pysyvät verkoston yhteisinä.
 * Väri = tämän sivuston oma pääväri, mitattu elävältä etusivulta 23.9.2026
 * (revontulenvihreä #10B981 ja metsänvihreä). Kontrasti tarkistettu: napin teksti ≥ 4,5:1,
 * kuvan rengas ≥ 3:1 korttia vasten.
 * Teksti = sivun oma aihe lukijan näkökulmasta, 12 kielellä natiivina.
 * 🔴 Ei hälytyksiä, ei lähetystahtia, ei "ensimmäisenä" (9.8.2026 lupauspurku):
 * uutiskirje lähtee vain kun on kerrottavaa. Otsikko tulee jaetusta komponentista.
 */
export const POPUP_THEME: NewsletterPopupTheme = {
  surface: '#0F172A',
  accent: '#10B981',
  cta: '#065F46',
  onCta: '#FFFFFF',
};

export const POPUP_COPY: NewsletterPopupCopy = {
  en: {
    description: 'Founder of LaplandVibes. National parks, the Northern Lights, autumn colours and wilderness wildlife. I tell you which park to head for in each season and which trails stay with you.',
  },
  fi: {
    description: 'LaplandVibesin perustaja. Kansallispuistot, revontulet, ruska ja erämaan eläimet. Kerron, mihin puistoon kannattaa lähteä milloinkin ja mitkä reitit jäävät mieleen.',
  },
  de: {
    description: 'Gründer von LaplandVibes. Nationalparks, Polarlichter, Herbstfarben und die Tiere der Wildnis. Ich zeige Ihnen, welcher Park sich wann lohnt und welche Wanderwege Ihnen in Erinnerung bleiben.',
  },
  ja: {
    description: 'LaplandVibes創業者。国立公園、オーロラ、紅葉、原野の動物たち。いつ、どの国立公園へ出かけるとよいか、心に残るトレイルはどれかをご案内します。',
  },
  es: {
    description: 'Fundador de LaplandVibes. Parques nacionales, auroras boreales, colores de otoño y fauna salvaje. Le cuento a qué parque vale la pena ir en cada época del año y qué senderos dejan huella.',
  },
  'pt-BR': {
    description: 'Fundador do LaplandVibes. Parques nacionais, aurora boreal, cores de outono e os animais selvagens. Conto qual parque vale a pena visitar em cada época e quais trilhas ficam na lembrança.',
  },
  'zh-CN': {
    description: 'LaplandVibes创始人。国家公园、极光、秋色，还有荒野中的动物。我来告诉你什么季节该去哪座公园，哪些步道会留在你的记忆里。',
  },
  ko: {
    description: 'LaplandVibes 창립자. 국립공원과 오로라, 가을 단풍, 황야의 야생동물. 언제 어느 공원으로 떠나면 좋은지 알려드리고, 오래 기억에 남는 트레일을 소개합니다.',
  },
  fr: {
    description: 'Fondateur de LaplandVibes. Parcs nationaux, aurores boréales, couleurs d\'automne du ruska et faune des étendues sauvages. Je vous indique vers quel parc partir selon la saison et quels sentiers restent en mémoire.',
  },
  it: {
    description: 'Fondatore di LaplandVibes. Parchi nazionali, aurora boreale, colori d\'autunno e fauna selvatica. Le indico in quale parco conviene andare in ogni periodo dell\'anno e quali sentieri non si dimenticano.',
  },
  nl: {
    description: 'Oprichter van LaplandVibes. Nationale parken, noorderlicht, herfstkleuren en de dieren van de wildernis. Ik vertel u welk park u in welk seizoen het best bezoekt en welke paden u bijblijven.',
  },
  sv: {
    description: 'Grundare av LaplandVibes. Nationalparker, norrsken, ruska och vildmarkens djur. Jag tipsar om vilken park som är värd resan under varje årstid och vilka leder du kommer att minnas.',
  },
};
