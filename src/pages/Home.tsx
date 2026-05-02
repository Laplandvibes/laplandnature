import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Trees, Sparkles, Sun } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HeroImage from '../components/HeroImage'
import LaplandMap from '../components/LaplandMap'
import Newsletter from '../components/Newsletter'

const featured = [
  {
    href: '/national-parks',
    image: 'card-national-parks.webp',
    tag: 'Protected areas',
    tagBg: 'bg-emerald-500',
    title: 'National Parks',
    blurb: "Five parks spanning over 7,000 km² of protected wilderness — from Urho Kekkonen fells to Riisitunturi's snow-crowned trees.",
    cta: 'Explore National Parks',
  },
  {
    href: '/wildlife',
    image: 'card-wildlife.webp',
    tag: 'Wildlife',
    tagBg: 'bg-emerald-500',
    title: 'Wildlife Watching',
    blurb: 'Track brown bears with a 99% sighting rate from overnight hides, meet semi-wild reindeer herds, and spot wolverines.',
    cta: 'Explore Wildlife',
  },
  {
    href: '/northern-lights',
    image: 'card-northern-lights.webp',
    tag: 'Aurora',
    tagBg: 'bg-emerald-500',
    title: 'Northern Lights',
    blurb: 'Chase the aurora borealis across arctic skies from September to April. Utsjoki delivers aurora on 4 out of 5 clear nights.',
    cta: 'Explore Northern Lights',
  },
  {
    href: '/hiking-trails',
    image: 'card-hiking.webp',
    tag: 'Trails',
    tagBg: 'bg-emerald-500',
    title: 'Hiking Trails',
    blurb: "Walk Finland's most iconic trails — from the 82 km Karhunkierros suspension bridges to the 1,324 m Halti summit.",
    cta: 'Explore Hiking Trails',
  },
  {
    href: '/conservation',
    image: 'card-conservation.webp',
    tag: 'Stewardship',
    tagBg: 'bg-emerald-500',
    title: 'Conservation',
    blurb: 'Metsähallitus manages 85% of Lapland\'s fells and all seven national parks. Plus Everyman\'s Right — Finland\'s open-access law.',
    cta: 'Explore Conservation',
  },
  {
    href: '/seasons',
    image: 'card-midnight-sun.webp',
    tag: 'Summer',
    tagBg: 'bg-amber-500',
    title: 'Midnight Sun',
    blurb: 'Above the Arctic Circle the sun never sets in midsummer. In Utsjoki, midnight sun holds for 70+ consecutive days.',
    cta: 'Explore Seasons',
  },
]

const HOME_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Finnish Lapland — Arctic Wilderness',
    description:
      'Finnish Lapland: 100,367 km² of arctic wilderness above the Arctic Circle. Northern lights, national parks, wildlife, hiking trails and four distinct seasons.',
    touristType: ['Nature lovers', 'Hikers', 'Aurora chasers', 'Wildlife photographers'],
    url: 'https://laplandnature.com/',
    geo: { '@type': 'GeoCoordinates', latitude: 67.5, longitude: 26.0 },
    containsPlace: [
      { '@type': 'TouristAttraction', name: 'Urho Kekkonen National Park' },
      { '@type': 'TouristAttraction', name: 'Pallas-Yllästunturi National Park' },
      { '@type': 'TouristAttraction', name: 'Lemmenjoki National Park' },
      { '@type': 'TouristAttraction', name: 'Riisitunturi National Park' },
      { '@type': 'TouristAttraction', name: 'Pyhä-Luosto National Park' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://laplandnature.com/',
    name: 'LaplandNature',
    publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  },
]

export default function Home() {
  return (
    <>
      <SEO
        title="Lapland Nature: Arctic Wilderness, Aurora & National Parks | LaplandNature"
        description="Finnish Lapland's arctic wilderness — five national parks, 200+ aurora-viewing nights, the kaamos polar night and hiking trails from 5 km to 82 km. Plan your wilderness trip."
        canonicalPath="/"
        keywords={['lapland nature', 'finnish lapland wilderness', 'arctic circle finland', 'lapland national parks', 'lapland northern lights', 'lapland hiking trails']}
        jsonLd={HOME_JSONLD}
      />

      {/* ─── Hero — full-bleed aerial autumn river photo (LCP) ─── */}
      <HeroImage
        image="hero-home.webp"
        size="xl"
        priority
        eyebrow="Above the Arctic Circle"
        title="Untouched arctic"
        subtitle="wilderness"
        description="Finnish Lapland — 100,367 km² of national parks, fells, ancient forests and the longest aurora season in Europe."
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/northern-lights"
            className="inline-flex items-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            Plan your aurora trip
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/national-parks"
            className="inline-flex items-center gap-2 text-snow/95 hover:text-snow bg-deep-night/30 hover:bg-deep-night/40 border border-snow/30 hover:border-snow/60 backdrop-blur-sm px-7 py-3.5 rounded-full transition-colors"
          >
            Explore the parks
          </Link>
        </div>
      </HeroImage>

      {/* ─── Editorial statement band — seamless transition out of the hero.
           Top starts at deep-night (matches hero's now fully-dark bottom edge),
           fades into Finland-blue mid-band, back to deep-night at the foot —
           so the seam between hero photo and this band is invisible. */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #0F172A 0%, #07254e 18%, #002F6C 50%, #07254e 82%, #0F172A 100%)',
        }}
      >
        {/* Aurora-glow accent — slid 80px down so it sits inside the dark band,
            not on the seam, and reads as decoration not a divider line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 h-px"
          style={{
            top: '80px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.55) 25%, rgba(167,139,250,0.55) 50%, rgba(236,72,153,0.55) 75%, transparent 100%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="text-aurora-green uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold mb-4">
              Above the Arctic Circle · below the noise
            </p>
            <p className="font-heading text-3xl sm:text-5xl md:text-6xl text-snow tracking-wider leading-[1.05]">
              Finland's wildest country sits at <span className="text-aurora-green">66°–69° North</span>.
              Five national parks, four-season light, and the longest aurora window in Europe.
            </p>
          </div>

          {/* Stats reimagined — icon + value + descriptive line */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-snow/10 rounded-2xl overflow-hidden border border-snow/15">
            {[
              { icon: Compass, value: '37%', primary: 'of Finland', body: 'sits north of the Arctic Circle' },
              { icon: Trees, value: '40+', primary: 'protected zones', body: 'national parks, strict reserves, Natura 2000' },
              { icon: Sun, value: '70', primary: 'midnight-sun days', body: 'Utsjoki, June through August' },
              { icon: Sparkles, value: '200+', primary: 'aurora nights', body: 'observed annually above 67°N' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.primary}
                  className="bg-finland-blue/95 backdrop-blur-sm p-6 sm:p-7 flex flex-col gap-3 items-center text-center sm:items-start sm:text-left"
                >
                  <Icon className="w-5 h-5 text-aurora-green" />
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl text-snow tracking-wider leading-none">
                      {s.value}
                    </div>
                    <div className="font-heading text-aurora-green text-base sm:text-lg tracking-wide mt-1.5">
                      {s.primary}
                    </div>
                    <div className="text-snow/65 text-xs sm:text-sm leading-snug mt-1.5">
                      {s.body}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom aurora accent — same offset from edge as top, reads as paired
            decoration rather than a divider */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 h-px"
          style={{
            bottom: '80px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(236,72,153,0.45) 25%, rgba(16,185,129,0.45) 50%, rgba(167,139,250,0.45) 75%, transparent 100%)',
          }}
        />
      </section>

      {/* ─── Featured cards — 6-up photo grid (LV pattern) ─── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">Six ways in</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-deep-night tracking-wider mb-4">
              Featured Lapland Experiences
            </h2>
            {/* Decorative trio rule */}
            <div className="flex items-center justify-center gap-2 mb-5" aria-hidden="true">
              <span className="h-px w-10 bg-aurora-green/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-green" />
              <span className="h-px w-10 bg-aurora-green/50" />
            </div>
            <p className="text-deep-night/65 text-base sm:text-lg max-w-2xl mx-auto">
              From bear-watching hides at the Russian border to frozen-waterfall canyons,
              midnight-sun canoeing, and the kaamos sky over Utsjoki — six guides we keep
              coming back to.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((f) => (
              <Link
                key={f.href}
                to={f.href}
                className="group rounded-2xl overflow-hidden border border-deep-night/10 bg-snow hover:shadow-xl hover:border-aurora-green/40 transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={`/images/${f.image}`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={1280}
                    height={800}
                  />
                  <span className={`absolute top-3 left-3 ${f.tagBg} text-snow text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md`}>
                    {f.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-2xl text-deep-night tracking-wide mb-3">{f.title}</h3>
                  <p className="text-deep-night/70 text-sm leading-relaxed mb-5 flex-1">{f.blurb}</p>
                  <span className="block w-full text-center bg-finland-blue text-snow font-semibold text-sm px-5 py-3 rounded-lg group-hover:bg-vibe-pink transition-colors">
                    {f.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Map of Finnish Lapland — pinned national parks, aurora spots, trailheads, wildlife sites ─── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-snow border-y border-deep-night/8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">The map</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-deep-night tracking-wider mb-4">
              Where to find it
            </h2>
            <p className="text-deep-night/65 text-base sm:text-lg max-w-2xl mx-auto">
              16 places we keep coming back to — five national parks, four aurora-viewing villages,
              four trailheads, and three wildlife corridors. Click a pin for the short version.
            </p>
          </div>
          <LaplandMap />
          <p className="text-deep-night/50 text-xs text-center mt-4">
            Map: OpenStreetMap. Pins are our editorial picks — not a Metsähallitus index.
          </p>
        </div>
      </section>

      {/* ─── Wide CTA — book a base + an experience ─── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-50 via-cream to-cyan-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            Ready to plan your wilderness trip?
          </h2>
          <p className="text-deep-night/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Pick a base near the parks and the aurora belt, then layer in guided experiences
            — wildlife watching, gold-panning, multi-day hut treks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateCTA
              partner="hotels"
              sid="home_cta_base"
              destination="Saariselkä, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Find a wilderness base
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="home_cta_activity"
              destination="rovaniemi-l2653"
              className="inline-flex items-center justify-center gap-2 bg-aurora-green hover:bg-emerald-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Browse guided experiences
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
          </div>
        </div>
      </section>

      {/* ─── Newsletter — full LV pattern with benefit grid + signup form ─── */}
      <Newsletter />
    </>
  )
}
