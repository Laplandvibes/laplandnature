import { Link } from 'react-router-dom'
import { Clock, BarChart3, MapPin, ArrowRight, Backpack, Tent, AlertTriangle, Sunrise } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import HeroImage from '../components/HeroImage'

type Difficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Demanding'

const trails: {
  name: string
  location: string
  distance: string
  duration: string
  difficulty: Difficulty
  description: string
  trailheadDest?: string
  trailheadSid?: string
}[] = [
  {
    name: 'Hetta–Pallas Trail',
    location: 'Pallas-Yllästunturi National Park',
    distance: '55 km',
    duration: '3–4 days',
    difficulty: 'Moderate',
    description:
      "Finland's most popular long-distance hiking trail, traversing the fell chain between Hetta and Pallas. Open-fell terrain with horizon views, well-maintained wilderness huts at staged intervals.",
    trailheadDest: 'Hetta, Finland',
    trailheadSid: 'trailhead_hetta',
  },
  {
    name: 'Karhunkierros (Bear Trail)',
    location: 'Oulanka National Park',
    distance: '82 km',
    duration: '4–6 days',
    difficulty: 'Challenging',
    description:
      'One of the most famous trails in Finland — winds through the Oulanka canyon past rapids and suspension bridges. Dramatic river gorges and old-growth forest mark the entire route.',
    trailheadDest: 'Ruka, Finland',
    trailheadSid: 'trailhead_oulanka',
  },
  {
    name: 'Saariselkä Day Trails',
    location: 'Urho Kekkonen National Park',
    distance: '5–20 km',
    duration: '2–8 hours',
    difficulty: 'Easy',
    description:
      'Well-marked day trails starting from Saariselkä village into the national park. The right introduction to fell hiking with options across all fitness levels and weather windows.',
    trailheadDest: 'Saariselkä, Finland',
    trailheadSid: 'trailhead_saariselka',
  },
  {
    name: 'Halti Summit Trail',
    location: 'Enontekiö',
    distance: '55 km (round trip)',
    duration: '3–5 days',
    difficulty: 'Demanding',
    description:
      "Trek to Finland's highest point at 1,324 m. Remote wilderness route through the Kilpisjärvi backcountry. The final summit section is unmarked and requires navigation skill in poor visibility.",
    trailheadDest: 'Kilpisjärvi, Finland',
    trailheadSid: 'trailhead_kilpisjarvi',
  },
  {
    name: 'Pyhäkuru Gorge Trail',
    location: 'Pyhä-Luosto National Park',
    distance: '5 km',
    duration: '2–3 hours',
    difficulty: 'Easy',
    description:
      'Short but striking trail through a deep gorge with ancient rock walls. A sacred site for the Sami people, with accessible boardwalk sections that suit families and mixed-pace groups.',
    trailheadDest: 'Pyhä, Finland',
    trailheadSid: 'trailhead_pyha',
  },
  {
    name: 'Lemmenjoki River Trail',
    location: 'Lemmenjoki National Park',
    distance: '20 km',
    duration: '1–2 days',
    difficulty: 'Moderate',
    description:
      "Follows the legendary gold-panning river through one of Europe's largest wilderness areas. Boat transport is available for part of the route. Rich gold-rush history visible at marked panning sites.",
    trailheadDest: 'Inari, Finland',
    trailheadSid: 'trailhead_lemmenjoki',
  },
]

const difficultyColor: Record<Difficulty, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Challenging: 'bg-orange-100 text-orange-700',
  Demanding: 'bg-rose-100 text-rose-700',
}

const HIKING_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Six hiking trails in Finnish Lapland — from 5 km to 82 km',
  description: 'Karhunkierros, Hetta–Pallas, Halti and three more — the trails worth planning a Lapland trip around, with distance, duration and difficulty for each.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/hiking-trails',
}

export default function HikingTrails() {
  return (
    <>
      <SEO
        title="Lapland Hiking Trails: From 5 km Day Hikes to 82 km Karhunkierros | LaplandNature"
        description="Six hiking trails in Finnish Lapland — Hetta-Pallas (55 km), Karhunkierros (82 km), Halti summit (55 km), and three shorter routes. Distance, duration, difficulty and trailhead bases."
        canonicalPath="/hiking-trails"
        keywords={['lapland hiking', 'karhunkierros', 'hetta pallas trail', 'halti finland', 'lemmenjoki hike', 'pyhakuru gorge']}
        jsonLd={HIKING_JSONLD}
      />

      <HeroImage
        image="hero-hiking.webp"
        priority
        eyebrow="Pillar guide"
        title="Hiking Trails"
        subtitle="Of Lapland"
        description="From easy day hikes to multi-day wilderness expeditions. Lapland's trails take you through ancient forests, across open fells, along wild rivers, and to Finland's highest summit."
      />

      <section className="pt-8 pb-2 px-4 sm:px-6"><div className="max-w-4xl mx-auto" /></section>

      {/* ─── Karhunkierros — 4-day field breakdown (depth content) ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-b border-deep-night/8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Backpack className="w-4 h-4" />
            From our notebook · ruska 2024
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-4 leading-tight">
            Karhunkierros in 4 days — what we packed, what we skipped, what we learned
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-8">
            We walked the full 82 km Bear Trail south-to-north over four days in late September,
            ruska peak. Below is what actually happened — distances, hut decisions, pack weight,
            and the calls we'd make differently next time. Treat this as a planning baseline,
            not gospel — weather and your fitness shift everything.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
            <div className="rounded-2xl border border-deep-night/10 bg-snow p-6">
              <div className="flex items-center gap-2 text-vibe-pink text-xs font-bold uppercase tracking-wider mb-2">
                <Sunrise className="w-3.5 h-3.5" /> Day 1 · 22 km
              </div>
              <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">Hautajärvi → Aventojoki</h3>
              <p className="text-deep-night/75 text-sm leading-relaxed">
                Easiest day on paper, brutal in practice — 22 km is long when packs are still
                heavy. Aventojoki hut had four open bunks at 17:00, full by 19:00. Worth pushing
                past lunch to claim a slot.
              </p>
              <p className="text-deep-night/55 text-xs mt-3 italic">Pack at start: 14.2 kg dry · 16.0 kg with water</p>
            </div>

            <div className="rounded-2xl border border-deep-night/10 bg-snow p-6">
              <div className="flex items-center gap-2 text-vibe-pink text-xs font-bold uppercase tracking-wider mb-2">
                <Sunrise className="w-3.5 h-3.5" /> Day 2 · 18 km
              </div>
              <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">Aventojoki → Jussinkämppä</h3>
              <p className="text-deep-night/75 text-sm leading-relaxed">
                The signature day. Suspension bridges over Kitkajoki rapids; Oulanka canyon
                viewpoint after the first 8 km is the photo every Finnish hiker has. Stop. The
                light at 14:00 in late September is unrepeatable.
              </p>
              <p className="text-deep-night/55 text-xs mt-3 italic">Highlight: Jyrävä waterfall · ~25 m drop, accessible from boardwalk</p>
            </div>

            <div className="rounded-2xl border border-deep-night/10 bg-snow p-6">
              <div className="flex items-center gap-2 text-vibe-pink text-xs font-bold uppercase tracking-wider mb-2">
                <Sunrise className="w-3.5 h-3.5" /> Day 3 · 21 km
              </div>
              <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">Jussinkämppä → Taivalköngäs</h3>
              <p className="text-deep-night/75 text-sm leading-relaxed">
                Long undulating forest day — fewer dramatic features, more rhythm. Taivalköngäs
                rapids at the end are the loudest point on the trail. We slept in the autiotupa;
                it filled at 16:30. Bring earplugs — the rapids run all night.
              </p>
              <p className="text-deep-night/55 text-xs mt-3 italic">First sub-zero night · −2 °C, light frost on the boardwalks at dawn</p>
            </div>

            <div className="rounded-2xl border border-deep-night/10 bg-snow p-6">
              <div className="flex items-center gap-2 text-vibe-pink text-xs font-bold uppercase tracking-wider mb-2">
                <Sunrise className="w-3.5 h-3.5" /> Day 4 · 21 km
              </div>
              <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">Taivalköngäs → Ruka</h3>
              <p className="text-deep-night/75 text-sm leading-relaxed">
                Easier terrain, ankles already sore. The last 6 km drag — leave early. Ruka shower
                at 14:30 felt like a religious experience. Don't book the southbound bus the same
                evening; you'll want a hotel night before transit.
              </p>
              <p className="text-deep-night/55 text-xs mt-3 italic">Total elapsed: 82 km · 4 days · 12 hours net hiking time</p>
            </div>
          </div>

          <div className="rounded-2xl border border-deep-night/10 bg-gradient-to-br from-amber-50 via-snow to-emerald-50 p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-heading text-lg text-deep-night tracking-wide mb-2">What we'd do differently</h3>
                <ul className="text-deep-night/80 text-sm leading-relaxed space-y-1.5 list-disc pl-5">
                  <li>Start a day earlier and split day 1 — drop one Pieni Karhunkierros loop section if pack is heavy.</li>
                  <li>Reserve the Oulanka Visitor Centre overnight as a backup if any open hut hits capacity. We were lucky; the queue is real in ruska peak.</li>
                  <li>Pack one more pair of dry socks. Boardwalks turn ice-slick at −2 °C.</li>
                  <li>Skip the lightweight stove fuel — every wilderness hut had wood-stove + dry firewood. Saved 400 g for the next walk.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <AffiliateCTA
              partner="hotels"
              sid="trip_report_ruka_post_walk"
              destination="Ruka, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <Tent className="w-4 h-4" />
              Stays in Ruka after the trail
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="trip_report_oulanka_guided"
              destination="rovaniemi-l2653"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              Guided Oulanka day-walk options
            </AffiliateCTA>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">The full trail list</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-3">
            Six trails worth planning a trip around
          </h2>
          <p className="text-deep-night/65 mb-8">
            From the 5 km Pyhäkuru gorge boardwalk to the 82 km Karhunkierros above. Each links a
            trailhead village you'll want to stay near.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 sm:gap-6">
          {trails.map((trail) => (
            <article
              key={trail.name}
              className="rounded-2xl border border-deep-night/10 bg-snow p-6 hover:border-aurora-green/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-heading text-2xl text-deep-night tracking-wide">{trail.name}</h2>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${difficultyColor[trail.difficulty]}`}>
                  {trail.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-1 text-deep-night/55 text-sm mb-3">
                <MapPin className="w-3.5 h-3.5" />
                {trail.location}
              </div>

              <p className="text-deep-night/75 text-sm leading-relaxed mb-5">{trail.description}</p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 items-center text-sm">
                <div className="flex items-center gap-1.5 text-aurora-green font-semibold">
                  <BarChart3 className="w-4 h-4" />
                  {trail.distance}
                </div>
                <div className="flex items-center gap-1.5 text-deep-night/65">
                  <Clock className="w-4 h-4" />
                  {trail.duration}
                </div>
                {trail.trailheadDest && trail.trailheadSid && (
                  <AffiliateCTA
                    partner="hotels"
                    sid={trail.trailheadSid}
                    destination={trail.trailheadDest}
                    className="ml-auto inline-flex items-center gap-1 text-vibe-pink hover:text-pink-600 text-xs font-semibold"
                  >
                    Trailhead stays
                    <ArrowRight className="w-3 h-3" />
                  </AffiliateCTA>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Cross-links: pair the hike with stays + activity ─── */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-snow p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-deep-night tracking-wider mb-2">
                Plan the rest of the trip
              </h3>
              <p className="text-deep-night/70 text-sm sm:text-base">
                A trail without a base is a logistics problem. Pair the walk with a place to sleep,
                a way to get there, and the seasonal context.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/seasons" className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                When to walk →
              </Link>
              <Link to="/national-parks" className="text-sm font-semibold px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors">
                The parks →
              </Link>
              <HubLink href="https://laplandstays.com" placement="hiking_stays" className="text-sm font-semibold px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors">
                Stays & cabins →
              </HubLink>
              <HubLink href="https://laplandtransport.com" placement="hiking_transport" className="text-sm font-semibold px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors">
                Transport to Lapland →
              </HubLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
