/**
 * Seasonal image switch — summer 1 May–30 Sep, winter 1 Oct–30 Apr.
 *
 * Evaluated at module load in the VISITOR'S browser, so the imagery flips itself every year
 * with no rebuild and no manual swap. Same rule and the same dates as the rest of the network
 * (`laplandvibes/src/data/images.ts`, rolled out 2026-06-22) and as the seasonal share card
 * served from `/og.jpg`, so the front page and the WhatsApp preview change on the same date.
 *
 * 🔴 This site was deliberately left out of the 2026-06-22 rollout: its autumn ruska hero was
 * judged "gorgeous, year-round nature-brand-fine". Measured on 2026-09-06 that decision showed
 * up as a January share card full of golden birch, so the site now carries a winter hero too.
 *
 * 🔴 Use it for a PLACE, never for a PRODUCT. A card that promises northern lights or a husky
 * safari is a winter promise; turning its photo green on 1 May makes the card lie for five months.
 */
export const isSummerSeason = (): boolean => {
  const m = new Date().getMonth() + 1 // 1–12
  return m >= 5 && m <= 9
}

export const seasonal = <T,>(winter: T, summer: T): T => (isSummerSeason() ? summer : winter)
