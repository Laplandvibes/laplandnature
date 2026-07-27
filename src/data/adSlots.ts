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
import type { HomeAdSlotsConfig } from '../../../shared/HomeAdSlots'
import type { Partner } from '../../../shared/PartnerSlot'
import { DEFAULT_PREMIUM_SPOTS } from '../../../shared/PremiumSpotGrid'

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
  imageSrc: '/images/hero-bear-kuusamo.webp',
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
