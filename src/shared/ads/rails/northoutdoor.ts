import { Snowflake } from 'lucide-react'
import type { RailPartner } from '../ProductRail'

// North Outdoor — Adtraction. Copy follows the COPY RULES in ProductRail.tsx:
// one-clause headline, one-sentence sub, and nothing claimed that the feed
// or the advertiser's own page does not support. Finnish and English only —
// the rail renders nothing in a locale it has no copy for, which is the
// honest outcome for a Finland-market shop.
const northoutdoor: RailPartner = {
  key: 'northoutdoor',
  categoryUrl: "https://northoutdoor.com/",
  accent: '#2C4A6E',
  accentDark: '#9BBBDD',
  icon: Snowflake,
  copy: {
    fi: {
      eyebrow: "North Outdoor",
      headline: "Merinovillaa suoraan iholle",
      sub: "Aluskerrastoja, neuleita ja mekkoja merinovillasta, 225–260 g painoina.",
      from: 'alk.',
      ctaAll: "Katso koko valikoima",
      note: "Hinnat tarkistettu {date}. Ajantasainen hinta ja koot näkyvät North Outdoorin sivulla.",
    },
    en: {
      eyebrow: "North Outdoor",
      headline: "Merino wool next to the skin",
      sub: "Base layers, knits and dresses in 225–260 g merino.",
      from: 'from',
      ctaAll: "See the full range",
      note: "Prices checked {date}. Current price and sizes are shown on North Outdoor’s own page.",
    },
  },
}

export default northoutdoor
