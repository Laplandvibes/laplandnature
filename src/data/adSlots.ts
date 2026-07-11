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
import { DEFAULT_PREMIUM_SPOTS } from '../../../shared/PremiumSpotGrid'

export const AD_SLOTS: HomeAdSlotsConfig = {
  siteSlug: 'laplandnature',
  // [0] = pääkumppani (banneri heti heron alla), [1] = kakkospääkumppani (kortti)
  sponsors: [null, null],
  // 6 kohdekohtaista premium-paikkaa (Rovaniemi, Levi, Ylläs, Saariselkä, Kittilä, Inari)
  spots: DEFAULT_PREMIUM_SPOTS,
}
