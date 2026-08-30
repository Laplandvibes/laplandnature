import { PawPrint } from 'lucide-react'
import type { AdSpec } from '../AdUnit'

// Bear Kuusamo — Karhu-Kuusamo Oy. PAID PARTNER PLACEMENT (flat fee, part of the
// 890 € partner package), NOT an affiliate/commission link. The oldest and
// northernmost bear-watching operation in the Ruka–Kuusamo region. Direct link
// to bearkuusamo.com with UTM so the partner's own GA4 attributes the campaign
// (June-2027 referral report). Content follows Niina Lehikoinen's approved
// corrections: "over 20 years", never "in Lapland" (only "on the edge of
// Lapland"), no em-dash, no "taiga". Logos:
//   light card  → /images/partners/bearkuusamo.png       (black wordmark)
//   dark card   → /images/partners/bearkuusamo-white.png (white wordmark, logoDark)
// Copy covers ALL 12 network languages (Vesa 2026-07-30: a PAID partner ad must
// be visible on every locale — the fi/en/sv gate is for LV Media's own house
// ads, not for a partner who paid for reach). Terms follow the approved article
// translations: never "in Lapland" (only edge-of-Lapland phrasing per language),
// "over twenty years", no em-dash, no "taiga".
const bearkuusamo: AdSpec = {
  key: 'bearkuusamo',
  brand: 'Bear Kuusamo',
  logo: '/images/partners/bearkuusamo.png',
  logoDark: '/images/partners/bearkuusamo-white.png',
  // Routed through go.laplandvibes.com (network:'direct' partner route) so the
  // click lands in the D1 click log -> Command Center, exactly like affiliate
  // clicks. The Worker 302s to bearkuusamo.com and appends the UTM itself, so
  // the partner's own GA4 still attributes the campaign. Safe for SEO: this ad
  // link is rel="sponsored nofollow" anyway — the dofollow value the partner
  // bought lives in the ARTICLE links, which stay direct and must NOT be routed.
  // `dest` lands the visitor on bearkuusamo.com's matching language version
  // (Niina 2026-07-30: links must lead to the correct language, not the EN
  // front page). The Worker only honours dest when it startsWith the partner
  // base, so this stays within bearkuusamo.com by construction.
  linkFor: (sid, lang) => {
    const base = `https://go.laplandvibes.com/go/bearkuusamo?sid=${encodeURIComponent(sid)}`
    // Languages that exist on bearkuusamo.com (their language switcher). Ads
    // only show on fi/en/sv, so in practice this adds dest for /fi/ — but keep
    // the full list so a wider ad rollout later needs no edit here.
    const bearLangs = ['fi', 'de', 'fr', 'es', 'it', 'nl']
    const l = (lang ?? '').slice(0, 2)
    return bearLangs.includes(l)
      ? `${base}&dest=${encodeURIComponent(`https://bearkuusamo.com/${l}/`)}`
      : base
  },
  accent: '#007E2E',
  accentDark: '#0A5C2A',
  icon: PawPrint,
  copy: {
    fi: {
      eyebrow: 'Eettistä karhunkatselua',
      headline: 'Yö karhukojulla, aivan Lapin rajalla',
      sub: 'Kuusamon alkuperäinen karhuopas, yli kaksikymmentä vuotta itärajan metsissä. Katsele villejä ruskeakarhuja, ahmoja ja merikotkia kuvauskojusta.',
      trust: ['Yli 20 vuotta', '7 kuvauskojua', 'Ilta- ja yöretket'],
      cta: 'Varaa yösi',
      poweredBy: 'Bear Kuusamo',
      readMore: 'Lue esittely',
      imageAlt: 'Emokarhu ja kaksi pentua kesäyön vastavalossa Kuusamon rajametsissä. Kuva: Piritta Paija / Bear Kuusamo',
    },
    en: {
      eyebrow: 'Ethical bear watching in Finland',
      headline: 'A night in a bear hide, on the edge of Lapland',
      sub: "Kuusamo's original bear guides, over twenty years in the eastern border forests. Watch wild brown bears, wolverine and sea eagles from a photography hide.",
      trust: ['Over 20 years guiding', '7 photography hides', 'Evening & overnight tours'],
      cta: 'Plan your night',
      poweredBy: 'Bear Kuusamo',
      readMore: 'Read the feature',
      imageAlt: 'A mother brown bear and two cubs in the backlight of a summer night in the border forests near Kuusamo. Photo: Piritta Paija / Bear Kuusamo',
    },
    sv: {
      eyebrow: 'Etisk björnskådning i Finland',
      headline: 'En natt i ett björngömsle, vid Lapplands gräns',
      sub: 'Kuusamos ursprungliga björnguider, över tjugo år i gränsskogarna i öster. Se vilda brunbjörnar, järv och havsörnar från ett fotogömsle.',
      trust: ['Över 20 års erfarenhet', '7 fotogömslen', 'Kvälls- och natturer'],
      cta: 'Boka din natt',
      poweredBy: 'Bear Kuusamo',
      readMore: 'Läs artikeln',
      imageAlt: 'En björnhona med två ungar i motljus en sommarnatt i gränsskogarna nära Kuusamo. Foto: Piritta Paija / Bear Kuusamo',
    },
    de: {
      eyebrow: 'Ethische Bärenbeobachtung',
      headline: 'Eine Nacht im Bärenversteck, am Rand Lapplands',
      sub: 'Kuusamos ursprüngliche Bärenführer, über zwanzig Jahre in den Wäldern an der Ostgrenze. Beobachte wilde Braunbären, Vielfraße und Seeadler aus einem Fotoversteck.',
      trust: ['Über 20 Jahre', '7 Fotoverstecke', 'Abend- und Nachttouren'],
      cta: 'Plane deine Nacht',
      poweredBy: 'Bear Kuusamo',
      readMore: 'Artikel lesen',
      imageAlt: 'Eine Bärenmutter mit zwei Jungen im Gegenlicht einer Sommernacht in den Grenzwäldern bei Kuusamo. Foto: Piritta Paija / Bear Kuusamo',
    },
    fr: {
      eyebrow: 'Observation éthique des ours',
      headline: 'Une nuit dans un affût à ours, en lisière de Laponie',
      sub: "Les guides ours originels de Kuusamo, plus de vingt ans dans les forêts de la frontière est. Observez ours bruns sauvages, gloutons et pygargues depuis un affût photo.",
      trust: ['Plus de 20 ans', '7 affûts photo', 'Sorties du soir et de nuit'],
      cta: 'Planifiez votre nuit',
      poweredBy: 'Bear Kuusamo',
      readMore: "Lire l'article",
      imageAlt: "Une ourse brune et deux oursons à contre-jour par une nuit d'été dans les forêts frontalières près de Kuusamo. Photo : Piritta Paija / Bear Kuusamo",
    },
    es: {
      eyebrow: 'Avistamiento ético de osos',
      headline: 'Una noche en un escondite de osos, al borde de Laponia',
      sub: 'Los guías de osos originales de Kuusamo, más de veinte años en los bosques de la frontera oriental. Observa osos pardos salvajes, glotones y pigargos desde un escondite fotográfico.',
      trust: ['Más de 20 años', '7 escondites fotográficos', 'Salidas de tarde y nocturnas'],
      cta: 'Planifica tu noche',
      poweredBy: 'Bear Kuusamo',
      readMore: 'Leer el artículo',
      imageAlt: 'Una osa parda con dos crías a contraluz en una noche de verano en los bosques fronterizos cerca de Kuusamo. Foto: Piritta Paija / Bear Kuusamo',
    },
    it: {
      eyebrow: 'Osservazione etica degli orsi',
      headline: 'Una notte in un capanno degli orsi, ai margini della Lapponia',
      sub: "Le guide originali di Kuusamo, oltre vent'anni nelle foreste del confine orientale. Osservi orsi bruni selvatici, ghiottoni e aquile di mare da un capanno fotografico.",
      trust: ['Oltre 20 anni', '7 capanni fotografici', 'Uscite serali e notturne'],
      cta: 'Pianifichi la Sua notte',
      poweredBy: 'Bear Kuusamo',
      readMore: "Leggi l'articolo",
      imageAlt: "Un'orsa bruna con due cuccioli in controluce in una notte d'estate nelle foreste di confine vicino a Kuusamo. Foto: Piritta Paija / Bear Kuusamo",
    },
    nl: {
      eyebrow: 'Ethisch beren spotten',
      headline: 'Een nacht in een berenhut, aan de rand van Lapland',
      sub: 'De oorspronkelijke berengidsen van Kuusamo, ruim twintig jaar in de bossen aan de oostgrens. Bekijk wilde bruine beren, veelvraten en zeearenden vanuit een fotohut.',
      trust: ['Ruim 20 jaar', '7 fotohutten', 'Avond- en nachttochten'],
      cta: 'Plan je nacht',
      poweredBy: 'Bear Kuusamo',
      readMore: 'Lees het artikel',
      imageAlt: 'Een berenmoeder met twee jongen in tegenlicht op een zomernacht in de grensbossen bij Kuusamo. Foto: Piritta Paija / Bear Kuusamo',
    },
    ja: {
      eyebrow: '倫理的なクマ観察',
      headline: 'クマのブラインドで過ごす一夜、ラップランドの縁で',
      sub: 'クーサモで最も歴史あるクマ観察ガイド。東の国境の森で20年以上。フォトブラインドから野生のヒグマ、クズリ、オジロワシを観察できます。',
      trust: ['20年以上の実績', '撮影用ブラインド7棟', '夕方と夜のツアー'],
      cta: '夜を予約する',
      poweredBy: 'Bear Kuusamo',
      readMore: '記事を読む',
      imageAlt: 'クーサモ近郊の国境の森、夏の夜の逆光の中の母グマと2頭の子グマ。写真：Piritta Paija / Bear Kuusamo',
    },
    ko: {
      eyebrow: '윤리적인 곰 관찰',
      headline: '곰 은신처에서의 하룻밤, 라플란드 가장자리에서',
      sub: '쿠사모에서 가장 오래된 곰 관찰 가이드. 동쪽 국경의 숲에서 20년 이상. 사진 은신처에서 야생 불곰, 울버린, 흰꼬리수리를 관찰하세요.',
      trust: ['20년 이상의 경험', '사진 은신처 7곳', '저녁·야간 투어'],
      cta: '하룻밤 계획하기',
      poweredBy: 'Bear Kuusamo',
      readMore: '기사 읽기',
      imageAlt: '쿠사모 인근 국경 숲, 여름밤 역광 속의 어미 불곰과 새끼 두 마리. 사진: Piritta Paija / Bear Kuusamo',
    },
    'pt-BR': {
      eyebrow: 'Observação ética de ursos',
      headline: 'Uma noite em um esconderijo de ursos, na borda da Lapônia',
      sub: 'Os guias de ursos originais de Kuusamo, mais de vinte anos nas florestas da fronteira leste. Observe ursos-pardos selvagens, carcajus e águias-rabalvas de um esconderijo fotográfico.',
      trust: ['Mais de 20 anos', '7 esconderijos fotográficos', 'Passeios à tarde e à noite'],
      cta: 'Planeje sua noite',
      poweredBy: 'Bear Kuusamo',
      readMore: 'Leia o artigo',
      imageAlt: 'Uma ursa-parda com dois filhotes em contraluz numa noite de verão nas florestas de fronteira perto de Kuusamo. Foto: Piritta Paija / Bear Kuusamo',
    },
    'zh-CN': {
      eyebrow: '合乎伦理的观熊',
      headline: '在熊隐蔽屋度过一夜，拉普兰边缘',
      sub: '库萨莫历史最悠久的观熊向导，在东部边境森林已超过二十年。从摄影隐蔽屋观察野生棕熊、貂熊和白尾海雕。',
      trust: ['超过20年经验', '7间摄影隐蔽屋', '傍晚与夜间行程'],
      cta: '规划你的观熊之夜',
      poweredBy: 'Bear Kuusamo',
      readMore: '阅读专题',
      imageAlt: '库萨莫附近边境森林，夏夜逆光中的母熊与两只幼崽。摄影：Piritta Paija / Bear Kuusamo',
    },
  },
}

export default bearkuusamo
