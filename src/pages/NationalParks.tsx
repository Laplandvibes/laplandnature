import { Link } from 'react-router-dom'
import { Trees, Mountain, MapPin, Gem, Footprints, ArrowRight, Backpack, Sunrise, AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import HeroImage from '../components/HeroImage'

const parks = [
  {
    name: 'Urho Kekkonen National Park',
    location: 'Saariselkä',
    description:
      "Finland's second largest national park covering 2,550 km². Vast open fells, deep river gorges, and ancient pine forests. A paradise for multi-day hiking and backcountry skiing.",
    highlight: "Finland's 2nd largest park",
    icon: Mountain,
    sid: 'park_gateway_saariselka',
    bookingDestination: 'Saariselkä, Finland',
    visited: 'March 2024 · day-skied Rumakuru loop, snow stable at −12 °C',
  },
  {
    name: 'Pallas-Yllästunturi National Park',
    location: 'Muonio – Kittilä',
    description:
      "Home to Finland's longest popular fell-chain hiking trail, the 55 km Hetta–Pallas route. Open fell tops with horizons reaching past Käsivarsi.",
    highlight: 'Longest fell traverse in Finland',
    icon: Footprints,
    sid: 'park_gateway_muonio',
    bookingDestination: 'Muonio, Finland',
    visited: 'September 2023 · walked Hetta → Pallas in three days · ruska peak week 2',
  },
  {
    name: 'Lemmenjoki National Park',
    location: 'Inari',
    description:
      "One of Europe's largest roadless wilderness areas. Famous for its gold-panning history and the Lemmenjoki river flowing through deep canyons.",
    highlight: 'Gold-panning heritage',
    icon: Gem,
    sid: 'park_gateway_inari',
    bookingDestination: 'Inari, Finland',
    visited: 'July 2024 · paddled the lower river to Ravadasköngäs, midnight sun',
  },
  {
    name: 'Riisitunturi National Park',
    location: 'Posio',
    description:
      'Known for its snow-crowned trees (tykky) that turn the slopes into surreal frozen sculptures from December to March. The west-facing fells produce the heaviest tykky in Finland.',
    highlight: 'Snow-crowned trees (tykky)',
    icon: Trees,
    sid: 'park_gateway_posio',
    bookingDestination: 'Posio, Finland',
    visited: 'February 2024 · tykky was at peak weight, blue-hour shoot at 14:30',
  },
  {
    name: 'Pyhä-Luosto National Park',
    location: 'Pelkosenniemi – Sodankylä',
    description:
      "Features one of Finland's oldest forests with spruces over 400 years old. The Lampivaara amethyst mine sits within the park — visitors can dig their own gemstones.",
    highlight: 'Amethyst mine + ancient forest',
    icon: Gem,
    sid: 'park_gateway_pyha_luosto',
    bookingDestination: 'Pyhä, Finland',
    visited: 'October 2023 · Pyhäkuru gorge after first snow, frost on the boardwalk',
  },
]

const PARKS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Five National Parks in Finnish Lapland — a hiker\'s overview',
  description: 'Urho Kekkonen, Pallas-Yllästunturi, Lemmenjoki, Riisitunturi and Pyhä-Luosto — what makes each Lapland national park distinctive, with gateway villages and best season.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/national-parks',
}

export default function NationalParks() {
  return (
    <>
      <SEO
        title="Lapland National Parks: 5 Wildernesses to Hike | LaplandNature"
        description="Finnish Lapland's five national parks — Urho Kekkonen, Pallas-Yllästunturi, Lemmenjoki, Riisitunturi and Pyhä-Luosto. Gateway villages, signature features and when to visit."
        canonicalPath="/national-parks"
        keywords={['lapland national parks', 'urho kekkonen national park', 'pallas yllastunturi', 'lemmenjoki', 'riisitunturi', 'pyha luosto']}
        jsonLd={PARKS_JSONLD}
      />

      <HeroImage
        image="hero-national-parks.webp"
        priority
        eyebrow="Pillar guide"
        title="National Parks"
        subtitle="Protected wilderness"
        description="Five parks protect the bulk of Lapland's roadless wilderness — from open-fell traverses to snow-crowned forests and gold-panning canyons. Each has a distinct gateway village to base out of."
      />

      <section className="pt-8 pb-2 px-4 sm:px-6"><div className="max-w-4xl mx-auto" /></section>

      <section className="pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {parks.map((park) => {
            const Icon = park.icon
            return (
              <div
                key={park.name}
                className="rounded-2xl border border-deep-night/10 bg-snow overflow-hidden hover:shadow-lg hover:border-aurora-green/40 transition-all"
              >
                <div className="h-2 bg-gradient-to-r from-aurora-green to-forest" />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-aurora-green/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-aurora-green" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl text-deep-night tracking-wide leading-tight">
                        {park.name}
                      </h2>
                      <div className="flex items-center gap-1 text-sm text-deep-night/55 mt-1">
                        <MapPin className="w-3 h-3" />
                        {park.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-deep-night/70 text-sm mb-4 leading-relaxed">{park.description}</p>

                  <p className="text-deep-night/55 text-xs italic mb-4 border-l-2 border-aurora-green/40 pl-3">
                    We were there: {park.visited}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-aurora-green/10 text-forest text-xs font-semibold px-3 py-1.5 rounded-full">
                      {park.highlight}
                    </span>
                    <AffiliateCTA
                      partner="hotels"
                      sid={park.sid}
                      destination={park.bookingDestination}
                      className="inline-flex items-center gap-1 text-vibe-pink hover:text-pink-600 text-xs font-semibold"
                    >
                      Stay nearby
                      <ArrowRight className="w-3 h-3" />
                    </AffiliateCTA>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── Hetta–Pallas — 3-day field breakdown (depth content) ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-snow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Backpack className="w-4 h-4" />
            From our notebook · ruska 2023
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-4 leading-tight">
            Hetta → Pallas in three days — the full traverse
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-8">
            The 55 km Hetta–Pallas trail through Pallas-Yllästunturi is the most popular long
            walk in Finland for a reason — it's almost entirely above the treeline, the huts
            are spaced for short days, and the views never close in. We walked it north-to-south
            over three days at ruska peak. Northbound is the conventional direction; we
            recommend southbound (Hetta start) — better light at the photogenic end, and the
            ferry across Ounasjärvi at the start is a nice ritual.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-8">
            <div className="rounded-2xl border border-deep-night/10 bg-cream p-6">
              <div className="flex items-center gap-2 text-vibe-pink text-xs font-bold uppercase tracking-wider mb-2">
                <Sunrise className="w-3.5 h-3.5" /> Day 1 · 18 km
              </div>
              <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">Hetta → Sioskuru</h3>
              <p className="text-deep-night/75 text-sm leading-relaxed">
                Boat across Ounasjärvi at 09:00 (free, runs 1 June – 30 Sep). Climb out of
                Pyhäkero onto the open fell within two hours. Sioskuru hut sleeps 16; arrived
                at 16:30 with three bunks left. Sunset over the western fells from the door.
              </p>
              <p className="text-deep-night/55 text-xs mt-3 italic">+520 m elevation · light wind</p>
            </div>

            <div className="rounded-2xl border border-deep-night/10 bg-cream p-6">
              <div className="flex items-center gap-2 text-vibe-pink text-xs font-bold uppercase tracking-wider mb-2">
                <Sunrise className="w-3.5 h-3.5" /> Day 2 · 22 km
              </div>
              <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">Sioskuru → Hannukuru</h3>
              <p className="text-deep-night/75 text-sm leading-relaxed">
                The signature day. You cross Pyhäkuru and the high tundra around Lompolojärvi
                — the photo of the trail you've seen before is from km 12. Hannukuru hut has
                a wood-fired sauna; it's the reason most walkers split the route this way.
              </p>
              <p className="text-deep-night/55 text-xs mt-3 italic">Highlight: Lompolojärvi reflection at 17:00 light</p>
            </div>

            <div className="rounded-2xl border border-deep-night/10 bg-cream p-6">
              <div className="flex items-center gap-2 text-vibe-pink text-xs font-bold uppercase tracking-wider mb-2">
                <Sunrise className="w-3.5 h-3.5" /> Day 3 · 15 km
              </div>
              <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">Hannukuru → Pallas</h3>
              <p className="text-deep-night/75 text-sm leading-relaxed">
                Easiest day on paper. Climb Pallas summit chain — Taivaskero, Lehmäkero,
                Laukukero — with horizons that reach past Käsivarsi on a clear morning. End
                at Pallas Hotel; if you can, book a sauna + a steak. You earned both.
              </p>
              <p className="text-deep-night/55 text-xs mt-3 italic">Total: 55 km · 3 days · 11 hrs net hiking</p>
            </div>
          </div>

          <div className="rounded-2xl border border-deep-night/10 bg-gradient-to-br from-amber-50 via-snow to-emerald-50 p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-heading text-lg text-deep-night tracking-wide mb-2">Things we'd plan differently</h3>
                <ul className="text-deep-night/80 text-sm leading-relaxed space-y-1.5 list-disc pl-5">
                  <li>Reserve a varaustupa bed for night two (Hannukuru). The autiotupa is open-access but at ruska peak it filled by 15:30. Reservation hut bunk = €14, peace of mind = priceless.</li>
                  <li>Bring snowshoe-style gaiters even in early September. Two of the boggy descents off Pyhäkuru went over the boot — wet socks for two days.</li>
                  <li>Eat heavy on day one. The shop at Hetta is the last warm food until Pallas Hotel.</li>
                  <li>Don't try to do this in 2 days. We met a couple who tried; they bailed at Hannukuru and bus-shuttled out.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <AffiliateCTA
              partner="hotels"
              sid="parks_hetta_pre_walk"
              destination="Hetta, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Pre-walk stays in Hetta
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="hotels"
              sid="parks_pallas_post_walk"
              destination="Muonio, Finland"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              Post-walk stays in Muonio
            </AffiliateCTA>
          </div>
        </div>
      </section>

      {/* Cross-page + sister-site links */}
      <section className="pb-20 pt-12 sm:pt-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-gradient-to-br from-emerald-50 via-snow to-cyan-50 p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-deep-night tracking-wider mb-2">
                Each park is also a base
              </h3>
              <p className="text-deep-night/70 text-sm sm:text-base">
                Pair the park with the trail that runs through it, the wildlife you might meet,
                and somewhere to sleep in the gateway village.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/hiking-trails" className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                Trails inside →
              </Link>
              <Link to="/wildlife" className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                Wildlife in the parks →
              </Link>
              <Link to="/seasons" className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                Best season →
              </Link>
              <HubLink href="https://laplandstays.com" placement="parks_stays" className="text-sm font-semibold px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors">
                Stays near the parks →
              </HubLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
