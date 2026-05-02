import { Link } from 'react-router-dom'
import { ArrowRight, Moon, Camera, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import HeroImage from '../components/HeroImage'

const animals = [
  {
    name: 'Reindeer',
    latin: 'Rangifer tarandus',
    description:
      'Around 200,000 semi-domesticated reindeer roam Finnish Lapland, central to Sami herding culture for thousands of years. They graze freely across the fells and forests — you will encounter them roadside.',
    status: 'Common',
  },
  {
    name: 'Arctic Fox',
    latin: 'Vulpes lagopus',
    description:
      'One of the rarest mammals in Finland. The arctic fox survives in the harshest fell environments, fur turning white in winter for snow camouflage. Critically endangered in the Scandinavian population.',
    status: 'Critically Endangered',
  },
  {
    name: 'Brown Bear',
    latin: 'Ursus arctos',
    description:
      'Finland has one of the densest brown bear populations in Europe. In eastern and northern Lapland, bear-watching hides offer close encounters during summer nights when bears emerge from hibernation.',
    status: 'Near Threatened (Finland)',
  },
  {
    name: 'Wolverine',
    latin: 'Gulo gulo',
    description:
      'The wolverine is one of the most elusive predators in the boreal forest. Immensely strong for its size, it roams huge territories across the Lapland wilderness. Rarely seen but present throughout the region.',
    status: 'Endangered',
  },
  {
    name: 'Snowy Owl',
    latin: 'Bubo scandiacus',
    description:
      'An occasional visitor to the northernmost fells, the snowy owl hunts lemmings across the open tundra. Sightings depend on lemming population cycles and rarely happen south of Utsjoki.',
    status: 'Rare Visitor',
  },
  {
    name: 'Whooper Swan',
    latin: 'Cygnus cygnus',
    description:
      "Finland's national bird breeds across Lapland's wetlands and quiet lakes. Their bugling call carries kilometres across still summer evenings — a defining sound of the Lapland summer.",
    status: 'National Bird',
  },
]

const statusColor: Record<string, string> = {
  'Common': 'bg-emerald-500/10 text-emerald-700',
  'Critically Endangered': 'bg-rose-500/10 text-rose-700',
  'Near Threatened (Finland)': 'bg-amber-500/10 text-amber-700',
  'Endangered': 'bg-orange-500/10 text-orange-700',
  'Rare Visitor': 'bg-sky-500/10 text-sky-700',
  'National Bird': 'bg-indigo-500/10 text-indigo-700',
}

const W_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wildlife of Finnish Lapland — six iconic arctic species',
  description: 'Reindeer, brown bear, wolverine, arctic fox and more — the wildlife you can realistically encounter (or hope to glimpse) across Finnish Lapland\'s wilderness.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/wildlife',
}

export default function Wildlife() {
  return (
    <>
      <SEO
        title="Lapland Wildlife: Reindeer, Bears, Wolverine & More | LaplandNature"
        description="Six iconic arctic species you can encounter in Finnish Lapland — from 200,000 semi-domesticated reindeer to the critically endangered arctic fox and the elusive wolverine."
        canonicalPath="/wildlife"
        keywords={['lapland wildlife', 'finnish lapland animals', 'lapland reindeer', 'lapland bear watching', 'arctic fox finland', 'wolverine lapland']}
        jsonLd={W_JSONLD}
      />

      <HeroImage
        image="hero-wildlife.webp"
        priority
        eyebrow="Pillar guide"
        title="Wildlife Watching"
        subtitle="Arctic animals"
        description="Track brown bears with a 99% sighting rate from overnight hides, meet semi-wild reindeer herds, and spot elusive wolverines — with verified operators and real data."
      />

      <section className="pt-8 pb-2 px-4 sm:px-6"><div className="max-w-4xl mx-auto" /></section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {animals.map((animal) => (
            <article
              key={animal.name}
              className="rounded-2xl border border-deep-night/10 bg-snow p-6 hover:border-aurora-green/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-heading text-2xl text-deep-night tracking-wide">{animal.name}</h2>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${statusColor[animal.status] ?? 'bg-deep-night/10 text-deep-night/70'}`}>
                  {animal.status}
                </span>
              </div>
              <p className="text-deep-night/55 text-sm italic mb-3">{animal.latin}</p>
              <p className="text-deep-night/75 text-sm leading-relaxed">{animal.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Bear-watching hides — depth section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-snow">
        <div className="max-w-4xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">Bear hides · Kuusamo–Suomussalmi</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-5">
            Brown-bear watching, honestly
          </h2>
          <div className="prose prose-deep-night max-w-none text-deep-night/80 leading-relaxed space-y-4">
            <p>
              Eastern Finland — Kuusamo, Suomussalmi, Lieksa — has Europe's densest brown-bear
              population per square kilometre. Three or four operators run small overnight hides
              from late April to early September, and the maths is simple: stay one night, and the
              statistical sighting rate sits around 90%. Stay two nights and you're at 99%+.
            </p>
            <p>
              The hide is a heated wooden room with one-way photography slots and a bunk. You
              arrive at 17:00, you don't leave until 07:00. The bait — usually salmon at a
              traditional feeding spot — keeps bears coming back for years; some individuals
              have been photographed across a decade. Cubs in May–June. Lone males through summer.
              Wolves cross the same clearing in September if you're lucky.
            </p>
            <p>
              The cost runs €280–€450 per person per night, including transport, dinner, the bunk,
              and a guide who explains what you're seeing through earphones. Book 6+ months ahead
              for July weekends.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <AffiliateCTA
              partner="activities"
              sid="wildlife_bear_hide"
              destination="rovaniemi-l2653"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Browse bear-watching hides
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="hotels"
              sid="wildlife_kuusamo_base"
              destination="Kuusamo, Finland"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              Pre-night stays in Kuusamo
            </AffiliateCTA>
          </div>
        </div>
      </section>

      {/* ─── A bear-hide night, hour by hour — depth content ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-deep-night via-deep-night to-emerald-950 text-snow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Moon className="w-4 h-4" />
            One night · Suomussalmi · 14 June 2024
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wider mb-4 leading-tight">
            What an actual bear-hide night looks like
          </h2>
          <p className="text-snow/80 leading-relaxed mb-8 text-lg">
            People imagine the hide as a 14-hour wait that ends in either silence or a bear-walks-by
            moment. The truth is messier — bears come and go, you doze, you miss a sighting, the
            silence becomes its own thing. Here's the actual rhythm of one night in mid-June with
            three other photographers in a 4-bunk hide.
          </p>

          <ol className="space-y-5 mb-10">
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">17:15</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">Arrival, briefing, sign the waiver</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Drive 8 km off the main road, last 2 km on a forest track. Guide explains the
                  rules: no perfume, no flash, talk only at whisper, never open the hide door
                  after 19:00. Salmon already laid out at the clearing. Sandwiches and thermos in
                  the bunk room.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">19:40</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">First arrival — a young male</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Three-year-old male emerges from the spruce on the left edge. Stays 11
                  minutes, eats one salmon, leaves. The guide whispers ID — he's been here twice
                  this week. The light at 19:40 in June is the best of the night; midnight sun
                  is still hours away.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">21:30</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">Quiet hour. Wolves call.</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Nothing on the clearing. Two wolves howl from the swamp east of us — never
                  seen, just heard. Guide says it's been a noisy summer for wolves; the pack
                  ranges 60+ km. We stay watching anyway.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-vibe-pink tracking-wider">23:55</span>
              <div className="border-l-2 border-vibe-pink/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1 text-vibe-pink">Mother + two cubs</p>
                <p className="text-snow/85 text-sm leading-relaxed">
                  The night you came for. She approaches slowly — checks the air, double-takes
                  toward the hide, decides we're not a threat. Cubs scramble onto her back twice
                  while she eats. Stays 38 minutes. Light is golden-low because of the midnight
                  sun. The cameras barely click — nobody wants to flinch.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">02:30</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">Dozing in the bunks</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Two of us in the bunks, two on watch. Switch every 90 min. The midnight sun
                  means there is no real darkness — the hide window stays usable.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">04:50</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">A different male — 8 minutes</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Old scarred male — guide IDs him as a regular for nine summers. Eats two
                  salmon, sniffs the air, walks out. The morning chorus of cranes from the
                  swamp is its own show.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">07:00</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">Out of the hide. Drive back. Sauna.</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Total visible bear time: roughly 57 minutes across four arrivals. Total
                  silence: ~13 hours. The silence was, oddly, a third of why it was worth doing.
                </p>
              </div>
            </li>
          </ol>

          <div className="rounded-2xl border border-snow/15 bg-snow/5 backdrop-blur-sm p-6 sm:p-8">
            <div className="grid sm:grid-cols-3 gap-5 sm:gap-8 text-sm">
              <div>
                <Camera className="w-5 h-5 text-aurora-green mb-2" />
                <p className="font-heading text-base tracking-wide mb-1">What worked</p>
                <p className="text-snow/70 leading-relaxed">600 mm tele on a tripod through the slot. Silent shutter on (mirrorless). 1/250 s, ISO 1600, f/4.</p>
              </div>
              <div>
                <AlertCircle className="w-5 h-5 text-aurora-green mb-2" />
                <p className="font-heading text-base tracking-wide mb-1">What we'd do differently</p>
                <p className="text-snow/70 leading-relaxed">Two consecutive nights, not one. Different bears, different light. Same cost per night, doubled chance of cubs.</p>
              </div>
              <div>
                <Moon className="w-5 h-5 text-aurora-green mb-2" />
                <p className="font-heading text-base tracking-wide mb-1">Best months</p>
                <p className="text-snow/70 leading-relaxed">Late May–early June (cubs). Late July (lone males, easy weather). September (wolves cross + autumn light).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-12 sm:pt-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center rounded-3xl border border-deep-night/10 bg-gradient-to-br from-amber-50 via-snow to-emerald-50 p-8 sm:p-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            Want a higher chance of a real encounter?
          </h2>
          <p className="text-deep-night/70 mb-7 max-w-xl mx-auto">
            Reindeer-farm visits and ranger-led tracking trips run May through September across
            Lapland's eastern and northern wilderness corridors.
          </p>
          <AffiliateCTA
            partner="activities"
            sid="wildlife_tour_cta"
            destination="rovaniemi-l2653"
            className="inline-flex items-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            Browse wildlife experiences
            <ArrowRight className="w-4 h-4" />
          </AffiliateCTA>

          {/* Cross-page + sister-site links */}
          <div className="mt-10 pt-7 border-t border-deep-night/10 flex flex-wrap justify-center gap-2 text-sm">
            <Link to="/conservation" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              Who protects Lapland wildlife →
            </Link>
            <Link to="/national-parks" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              Parks where wildlife lives →
            </Link>
            <HubLink href="https://laplandhuskysafaris.com" placement="wildlife_husky" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              Husky safaris →
            </HubLink>
          </div>
        </div>
      </section>
    </>
  )
}
