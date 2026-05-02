import { Link } from 'react-router-dom'
import { Moon, Sun, Flower2, Leaf, ArrowRight, Calendar, Camera, AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import HeroImage from '../components/HeroImage'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'

const seasons = [
  {
    name: 'Ruska',
    period: 'September – October',
    description:
      "Lapland erupts in vivid autumn colour as birch, aspen and blueberry bushes turn gold, red and orange. Fell tops shift through the spectrum in days, not weeks. Ruska is one of the defining natural events of the Finnish year — hikers travel from across the country to see it.",
    icon: Leaf,
    gradient: 'from-orange-500 to-red-600',
    bg: 'bg-orange-500/8',
    accent: 'text-orange-600',
  },
  {
    name: 'Kaamos',
    period: 'November – January',
    description:
      'The polar night descends on Lapland. In Utsjoki the sun does not rise for 51 days. But kaamos is not darkness — the snow reflects blue and purple twilight all afternoon, creating a soft luminous landscape. The aurora is at its most active during this window.',
    icon: Moon,
    gradient: 'from-indigo-600 to-purple-800',
    bg: 'bg-indigo-500/8',
    accent: 'text-indigo-600',
  },
  {
    name: 'Midnight Sun',
    period: 'June – July',
    description:
      'Above the Arctic Circle the sun never sets in midsummer. In northernmost Lapland the midnight sun holds for over 70 consecutive days. Endless daylight transforms hiking, fishing and paddling — you can start at 11 PM and watch the light slide along the fells until breakfast.',
    icon: Sun,
    gradient: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-400/8',
    accent: 'text-amber-600',
  },
  {
    name: 'Spring snow',
    period: 'April – May',
    description:
      'The light returns in force — brilliant sunshine reflecting off vast snowfields. Days grow rapidly longer and temperatures rise above freezing. The best time for cross-country skiing, snowmobiling and ice fishing: snow is still plentiful but conditions are mild and the days run long.',
    icon: Flower2,
    gradient: 'from-emerald-400 to-cyan-500',
    bg: 'bg-emerald-400/8',
    accent: 'text-emerald-600',
  },
]

const SEASONS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Four seasons of Finnish Lapland — ruska, kaamos, midnight sun, spring',
  description: 'Each season above the Arctic Circle is a distinct world: ruska autumn colour, kaamos polar night, midnight sun summer, and spring snow.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/seasons',
}

export default function Seasons() {
  return (
    <>
      <SEO
        title="Four Seasons of Lapland: Ruska, Kaamos, Midnight Sun, Spring | LaplandNature"
        description="Each season above the Arctic Circle is a different world — ruska autumn colour, kaamos polar night, midnight sun, and the spring snow window. When to come, and what to expect."
        canonicalPath="/seasons"
        keywords={['lapland seasons', 'kaamos polar night', 'ruska autumn lapland', 'midnight sun finland', 'lapland spring snow']}
        jsonLd={SEASONS_JSONLD}
      />

      <HeroImage
        image="hero-seasons.webp"
        priority
        eyebrow="Pillar guide"
        title="Four Seasons"
        subtitle="Of Lapland"
        description="Each season above the Arctic Circle brings a completely different world — endless summer light, blue twilight of polar night, and two short transition seasons that compress all of southern Finland's spring and autumn into a few intense weeks."
      />

      <section className="pt-8 pb-2 px-4 sm:px-6"><div className="max-w-4xl mx-auto" /></section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
          {seasons.map((season) => {
            const Icon = season.icon
            return (
              <article
                key={season.name}
                className="rounded-2xl border border-deep-night/10 bg-snow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`h-2 bg-gradient-to-r ${season.gradient}`} />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${season.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${season.accent}`} />
                    </div>
                    <div>
                      <h2 className="font-heading text-3xl text-deep-night tracking-wide">{season.name}</h2>
                      <p className={`text-sm font-semibold ${season.accent}`}>{season.period}</p>
                    </div>
                  </div>
                  <p className="text-deep-night/75 leading-relaxed">{season.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ─── Ruska week-by-week — depth content ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-snow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Calendar className="w-4 h-4" />
            Ruska 2024 · week by week
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-4 leading-tight">
            How ruska peak actually moves across Lapland
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-8">
            Ruska is not one event. It's a wave that sweeps from north to south across roughly
            three weeks every September. If you arrive on the wrong week — or in the wrong
            latitude — you'll see either bare birch or still-green moss. Below is what we logged
            in 2024 driving from Utsjoki down to Riisitunturi.
          </p>

          <div className="space-y-4 mb-8">
            <div className="rounded-2xl border border-deep-night/10 bg-cream p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="sm:w-44 shrink-0">
                <div className="font-heading text-vibe-pink text-lg tracking-wider">Week 1 · Sep 2–8</div>
                <div className="text-deep-night/55 text-sm">Utsjoki + Kilpisjärvi (69°N+)</div>
              </div>
              <div className="text-deep-night/80 text-sm leading-relaxed flex-1">
                Northernmost fells go first. Birch already 60% turned by Sep 5; lingonberry
                bushes deep red. Camp temps −2 °C overnight. Photography window: 14:00–17:00,
                light angle low.
              </div>
            </div>
            <div className="rounded-2xl border border-deep-night/10 bg-cream p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="sm:w-44 shrink-0">
                <div className="font-heading text-vibe-pink text-lg tracking-wider">Week 2 · Sep 9–15</div>
                <div className="text-deep-night/55 text-sm">Inari + Saariselkä (68–69°N)</div>
              </div>
              <div className="text-deep-night/80 text-sm leading-relaxed flex-1">
                <strong>Peak.</strong> Urho Kekkonen NP at full saturation Sep 11. Best week of
                the year for the Saariselkä → Kiilopää loop. Heavy day-walker traffic on the
                weekend; midweek empty trails.
              </div>
            </div>
            <div className="rounded-2xl border border-deep-night/10 bg-cream p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="sm:w-44 shrink-0">
                <div className="font-heading text-vibe-pink text-lg tracking-wider">Week 3 · Sep 16–22</div>
                <div className="text-deep-night/55 text-sm">Pallas + Levi + Pyhä (67–68°N)</div>
              </div>
              <div className="text-deep-night/80 text-sm leading-relaxed flex-1">
                <strong>Peak shifts south.</strong> Hetta–Pallas trail in full ruska around Sep
                17–19 (we walked it then — see <Link to="/national-parks" className="text-vibe-pink hover:underline">our 3-day breakdown</Link>). Pyhä-Luosto a few
                days later. First snowfall possible above 600 m by week's end.
              </div>
            </div>
            <div className="rounded-2xl border border-deep-night/10 bg-cream p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="sm:w-44 shrink-0">
                <div className="font-heading text-vibe-pink text-lg tracking-wider">Week 4 · Sep 23–29</div>
                <div className="text-deep-night/55 text-sm">Riisitunturi + Oulanka (66°N)</div>
              </div>
              <div className="text-deep-night/80 text-sm leading-relaxed flex-1">
                Last hurrah. Riisitunturi photogenic for one final week before leaves drop.
                Karhunkierros (Bear Trail) at peak — still some warm afternoons, frost dawn,
                empty huts midweek (we walked it Sep 24–27, our notes are on the
                <Link to="/hiking-trails" className="text-vibe-pink hover:underline"> hiking trails page</Link>).
              </div>
            </div>
            <div className="rounded-2xl border border-deep-night/10 bg-cream p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="sm:w-44 shrink-0">
                <div className="font-heading text-vibe-pink text-lg tracking-wider">Week 5 · Sep 30+</div>
                <div className="text-deep-night/55 text-sm">All of Lapland</div>
              </div>
              <div className="text-deep-night/80 text-sm leading-relaxed flex-1">
                It's over. Bare birch, slick boardwalks, snow at altitude. The aurora season
                opens — see <Link to="/northern-lights" className="text-vibe-pink hover:underline">our aurora night in Inari</Link> for what's
                possible from here.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-deep-night/10 bg-gradient-to-br from-amber-50 via-snow to-emerald-50 p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-heading text-lg text-deep-night tracking-wide mb-2">Booking advice</h3>
                <ul className="text-deep-night/80 text-sm leading-relaxed space-y-1.5 list-disc pl-5">
                  <li>Book accommodation 6+ months ahead for week 2 (Saariselkä) and week 3 (Hetta/Pallas) — these are the most contested ruska weeks in Finland.</li>
                  <li>If your dates are fixed, pick the latitude — don't chase peak. Week 1 in Utsjoki and week 4 in Riisitunturi are nearly as photogenic with much more breathing room.</li>
                  <li>Day-walk traffic peaks Saturday. Walk midweek. Drive on the weekend.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-deep-night/10 bg-snow p-6 flex items-start gap-4">
            <Camera className="w-5 h-5 text-aurora-green mt-0.5 shrink-0" />
            <div>
              <p className="font-heading text-base text-deep-night tracking-wide mb-2">A note on photography light</p>
              <p className="text-deep-night/75 text-sm leading-relaxed">
                In September the sun stays low for hours. The "ruska photo" window most people
                imagine — saturated red+gold, soft directional light — runs roughly 14:00 to
                17:30 each day. By 18:30 you're in heavy shadow. Plan your hike turnaround
                accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Season-aware CTAs + cross-links */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-snow p-8 sm:p-10">
          <h3 className="font-heading text-2xl sm:text-3xl text-deep-night tracking-wider mb-3">
            Match the season to the trip
          </h3>
          <p className="text-deep-night/70 mb-7">
            Aurora chasing belongs to kaamos. Bear-watching belongs to summer. Hetta–Pallas at
            ruska peak is the best photographs you'll take in your life. Pick the season, then the
            trip — not the other way round.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <AffiliateCTA
              partner="hotels-seasonal"
              sid="seasons_book_seasonal"
              destination="Saariselkä, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Find a seasonal base
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="seasons_browse_activity"
              destination="rovaniemi-l2653"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              Season-matched experiences
            </AffiliateCTA>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <Link to="/northern-lights" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              Aurora season →
            </Link>
            <Link to="/hiking-trails" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              Ruska hiking →
            </Link>
            <Link to="/wildlife" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              Summer wildlife →
            </Link>
            <HubLink href="https://laplandsnowmobile.com" placement="seasons_snowmobile" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              Spring snowmobile →
            </HubLink>
            <HubLink href="https://laplandskiresorts.com" placement="seasons_skiresorts" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              Cross-country skiing →
            </HubLink>
          </div>
        </div>
      </section>
    </>
  )
}
