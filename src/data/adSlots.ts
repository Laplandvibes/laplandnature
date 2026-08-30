/**
 * Etusivun mainospaikkojen config (LV Media -inventaari) — laplandnature.com
 *
 * Myyntiprosessi:
 *   1. Kumppani ostaa paikan (LV Media -portaali → lv_bookings)
 *   2. Agentti täyttää paikan Partner-objektilla tähän tiedostoon
 *   3. `npm run build` + deploy → kortti/banneri ilmestyy sivulle
 *
 * Tyhjät paikat (null) renderöivät "Haluatko mainoksesi tähän?" -house-adin,
 * joka linkittää LV Media -portaaliin (/media/site/laplandnature).
 */
import type { HomeAdSlotsConfig } from '../shared/HomeAdSlots'
import type { Partner } from '../shared/PartnerSlot'
import { DEFAULT_PREMIUM_SPOTS } from '../shared/PremiumSpotGrid'

/**
 * Bear Kuusamo etusivun kortissa A (Vesa 2026-07-27).
 *
 * MIKSI: kun molemmat kortit olivat tyhjiä, etusivu näytti kaksi identtistä
 * "Haluatko mainoksesi tähän?" -korttia allekkain — mobiilissa se lukee
 * renderöintivirheenä, ei myyntipaikkana. Yksi oikea kumppani + yksi vapaa
 * paikka näyttää toimivalta ja luo niukkuutta. Bear = showcase-asiakas, jolle
 * annetaan tietoisesti yli vakiotuotteen (ks. muisti bear_kuusamo_partner_ad_article).
 *
 * Linkki menee Workerin kautta (`go/bearkuusamo?sid=`) koska tämä on MAINOS:
 * klikki kirjautuu D1:een ja näkyy Command Centerissä. Artikkelilinkit sen
 * sijaan ovat suoria + dofollow — älä reititä niitä Workerin kautta.
 *
 * Copy on Niinan hyväksymää tekstiä (shared/ads/advertisers/bearkuusamo.ts
 * headline per kieli) — älä keksi uutta kumppanicopya tähän.
 */
const bearKuusamo: Partner = {
  name: 'Bear Kuusamo',
  tagline: 'Yö karhukojulla, aivan Lapin rajalla',
  taglineEn: 'A night in a bear hide, on the edge of Lapland',
  taglineSv: 'En natt i ett björngömsle, vid Lapplands gräns',
  url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a',
  // FI-lokaalissa klikki ohjataan bearkuusamo.comin suomenkieliseen versioon
  // (Niina/Bear 2026-07-30). Worker lukee dest-parametrin; muut kielet → url.
  urlFi: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a&dest=https%3A%2F%2Fbearkuusamo.com%2Ffi%2F',
  imageSrc: '/images/hero-bear-kuusamo.webp',
  // Kumppanin logo kortin kuvan oikeaan yläkulmaan (Vesa 2026-07-29). Tumma
  // versio, koska PartnerSlot piirtää sen valkoiselle chipille valokuvan päälle.
  // Sama tiedosto jota AdUnit käyttää Eläimistö-sivun mainoksessa.
  logoSrc: '/images/partners/bearkuusamo.png',
  // CTA on pakollinen myydylle paikalle: ilman sitä viereinen tyhjä
  // "Varaa mainospaikka" -house-ad näyttää houkuttelevammalta kuin maksava
  // asiakas (Vesa 2026-07-27). Tekstit ovat Niinan hyväksymiä.
  ctaLabel: 'Varaa yösi',
  ctaLabelEn: 'Plan your night',
  ctaLabelSv: 'Boka din natt',
  accent: '#007E2E', // Bear Kuusamon brändivihreä
  // Pidempi kuvaus näkyy vain desktopissa (sm+). Sama hyväksytty teksti kuin
  // AdUnitin `sub` shared/ads/advertisers/bearkuusamo.ts:ssä.
  description:
    'Kuusamon alkuperäinen karhuopas, yli kaksikymmentä vuotta itärajan metsissä. Katsele villejä ruskeakarhuja, ahmoja ja merikotkia kuvauskojusta.',
  descriptionEn:
    "Kuusamo's original bear guides, over twenty years in the eastern border forests. Watch wild brown bears, wolverine and sea eagles from a photography hide.",
  descriptionSv:
    'Kuusamos ursprungliga björnguider, över tjugo år i gränsskogarna i öster. Se vilda brunbjörnar, järv och havsörnar från ett fotogömsle.',
  // Linkki myytyyn esittelyartikkeliin LaplandVibes-blogissa (Vesa 2026-07-27).
  // Hubin EN-versio on juuressa, muut kielet etuliitteen takana.
  articleUrl: 'https://laplandvibes.com/fi/blog/bear-kuusamo/',
  articleUrlEn: 'https://laplandvibes.com/blog/bear-kuusamo/',
  articleUrlSv: 'https://laplandvibes.com/sv/blog/bear-kuusamo/',
  articleLabel: 'Lue esittely',
  articleLabelEn: 'Read the feature',
  articleLabelSv: 'Läs artikeln',
  // 🔴 Myyty kortti näkyy KAIKILLA 12 kielellä (Vesa 2026-07-30, Bear-palaute):
  // loput 9 kieltä tässä. Tekstit = AdUnit-speksin hyväksytty copy per kieli;
  // url = Worker-reitti dest-ohjauksella kumppanin omaan kieliversioon
  // (de/fr/es/it/nl; ja/ko/pt/zh → EN-juuri ilman destiä); articleUrl = hubin
  // blogi kieliprefiksillä (huom. hubin lyhyet /kr/ /cn/ /br/).
  i18n: {
    de: {
      tagline: 'Eine Nacht im Bärenversteck, am Rand Lapplands',
      description: 'Kuusamos ursprüngliche Bärenführer, über zwanzig Jahre in den Wäldern an der Ostgrenze. Beobachte wilde Braunbären, Vielfraße und Seeadler aus einem Fotoversteck.',
      cta: 'Planen Sie Ihre Nacht',
      articleLabel: 'Artikel lesen',
      articleUrl: 'https://laplandvibes.com/de/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a&dest=https%3A%2F%2Fbearkuusamo.com%2Fde%2F',
    },
    fr: {
      tagline: 'Une nuit dans un affût à ours, en lisière de Laponie',
      description: "Les guides ours originels de Kuusamo, plus de vingt ans dans les forêts de la frontière est. Observez ours bruns sauvages, gloutons et pygargues depuis un affût photo.",
      cta: 'Planifiez votre nuit',
      articleLabel: "Lire l'article",
      articleUrl: 'https://laplandvibes.com/fr/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a&dest=https%3A%2F%2Fbearkuusamo.com%2Ffr%2F',
    },
    es: {
      tagline: 'Una noche en un escondite de osos, al borde de Laponia',
      description: 'Los guías de osos originales de Kuusamo, más de veinte años en los bosques de la frontera oriental. Observa osos pardos salvajes, glotones y pigargos desde un escondite fotográfico.',
      cta: 'Planifica tu noche',
      articleLabel: 'Leer el artículo',
      articleUrl: 'https://laplandvibes.com/es/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a&dest=https%3A%2F%2Fbearkuusamo.com%2Fes%2F',
    },
    it: {
      tagline: 'Una notte in un capanno degli orsi, ai margini della Lapponia',
      description: "Le guide originali di Kuusamo, oltre vent'anni nelle foreste del confine orientale. Osserva orsi bruni selvatici, ghiottoni e aquile di mare da un capanno fotografico.",
      cta: 'Pianifica la tua notte',
      articleLabel: "Leggi l'articolo",
      articleUrl: 'https://laplandvibes.com/it/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a&dest=https%3A%2F%2Fbearkuusamo.com%2Fit%2F',
    },
    nl: {
      tagline: 'Een nacht in een berenhut, aan de rand van Lapland',
      description: 'De oorspronkelijke berengidsen van Kuusamo, ruim twintig jaar in de bossen aan de oostgrens. Bekijk wilde bruine beren, veelvraten en zeearenden vanuit een fotohut.',
      cta: 'Plan je nacht',
      articleLabel: 'Lees het artikel',
      articleUrl: 'https://laplandvibes.com/nl/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a&dest=https%3A%2F%2Fbearkuusamo.com%2Fnl%2F',
    },
    ja: {
      tagline: 'クマのブラインドで過ごす一夜、ラップランドの縁で',
      description: 'クーサモで最も歴史あるクマ観察ガイド。東の国境の森で20年以上。フォトブラインドから野生のヒグマ、クズリ、オジロワシを観察できます。',
      cta: '夜を予約する',
      articleLabel: '記事を読む',
      articleUrl: 'https://laplandvibes.com/ja/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a',
    },
    ko: {
      tagline: '곰 은신처에서의 하룻밤, 라플란드 가장자리에서',
      description: '쿠사모에서 가장 오래된 곰 관찰 가이드. 동쪽 국경의 숲에서 20년 이상. 사진 은신처에서 야생 불곰, 울버린, 흰꼬리수리를 관찰하세요.',
      cta: '하룻밤 계획하기',
      articleLabel: '기사 읽기',
      articleUrl: 'https://laplandvibes.com/kr/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a',
    },
    pt: {
      tagline: 'Uma noite em um esconderijo de ursos, na borda da Lapônia',
      description: 'Os guias de ursos originais de Kuusamo, mais de vinte anos nas florestas da fronteira leste. Observe ursos-pardos selvagens, carcajus e águias-rabalvas de um esconderijo fotográfico.',
      cta: 'Planeje sua noite',
      articleLabel: 'Leia o artigo',
      articleUrl: 'https://laplandvibes.com/br/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a',
    },
    zh: {
      tagline: '在熊隐蔽屋度过一夜，拉普兰边缘',
      description: '库萨莫历史最悠久的观熊向导，在东部边境森林已超过二十年。从摄影隐蔽屋观察野生棕熊、貂熊和白尾海雕。',
      cta: '规划你的观熊之夜',
      articleLabel: '阅读专题',
      articleUrl: 'https://laplandvibes.com/cn/blog/bear-kuusamo/',
      url: 'https://go.laplandvibes.com/go/bearkuusamo?sid=home_card_a',
    },
  },
}

export const AD_SLOTS: HomeAdSlotsConfig = {
  siteSlug: 'laplandnature',
  // [0] = pääkumppani (banneri heti heron alla), [1] = kakkospääkumppani (kortti)
  sponsors: [null, null],
  // Etusivun kortit: [0]=A (vasen), [1]=B (oikea). `cards` ohittaa `sponsors`in
  // HomeAdSlotsissa mutta EI vaikuta MainPartnerBanneriin (se lukee mainPartner
  // ?? sponsors[0]) → pääkumppanipaikka jää edelleen myytäväksi.
  cards: [bearKuusamo, null],
  // 6 kohdekohtaista premium-paikkaa (Rovaniemi, Levi, Ylläs, Saariselkä, Kittilä, Inari)
  spots: DEFAULT_PREMIUM_SPOTS,
}
