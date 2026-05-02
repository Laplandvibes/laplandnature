import { Link } from 'react-router-dom'
import { MapPin, Calendar, Lightbulb, ArrowRight, Moon, Activity, Camera } from 'lucide-react'
import SEO from '../components/SEO'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'
import HeroImage from '../components/HeroImage'

const spots = [
  {
    name: 'Inari',
    sid: 'aurora_spot_inari',
    destination: 'Inari, Finland',
    description: 'Sami heartland on the shores of Lake Inari. Minimal light pollution, vast open skies, and a clear horizon to the north.',
  },
  {
    name: 'Utsjoki',
    sid: 'aurora_spot_utsjoki',
    destination: 'Utsjoki, Finland',
    description: "Finland's northernmost municipality, bordering Norway. Unobstructed northern horizon and 51 days without sunrise during kaamos.",
  },
  {
    name: 'Kilpisjärvi',
    sid: 'aurora_spot_kilpisjarvi',
    destination: 'Kilpisjärvi, Finland',
    description: 'Where Finland, Sweden and Norway meet. High-altitude fells provide panoramic aurora views above the Arctic Ocean cloud line.',
  },
  {
    name: 'Enontekiö',
    sid: 'aurora_spot_enontekio',
    destination: 'Enontekiö, Finland',
    description: 'Remote wilderness area with some of the darkest skies in continental Europe — Bortle 1 measurements logged in winter 2023.',
  },
]

const tips = [
  'Check the Finnish Meteorological Institute aurora forecast (auroras-now / KP-index) before heading out.',
  'Best viewing is between 9 PM and 2 AM local time on clear nights.',
  'Move 5–10 km away from town centres to drop light pollution to Bortle 2 or lower.',
  'Layer up — temperatures often hit −30 °C during peak season; thermos of warm drink mandatory.',
  'A tripod and 5–15 second exposure at ISO 800–3200 (f/2.8) captures aurora your eye misses.',
]

const NL_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Northern Lights in Finnish Lapland: where, when and how to see them',
  description: 'A practical guide to seeing the aurora borealis in Finnish Lapland — best viewing spots, season timing, and viewing tips from experienced local observers.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/northern-lights',
}

export default function NorthernLights() {
  return (
    <>
      <SEO
        title="Northern Lights in Lapland: Where & When to See Them | LaplandNature"
        description="Where to see the northern lights in Finnish Lapland — Inari, Utsjoki, Kilpisjärvi and Enontekiö. Aurora season runs September to March, with darkest skies during the kaamos polar night."
        canonicalPath="/northern-lights"
        keywords={['northern lights lapland', 'aurora borealis finland', 'aurora viewing inari', 'kilpisjarvi aurora', 'lapland aurora season']}
        jsonLd={NL_JSONLD}
      />

      <HeroImage
        image="hero-northern-lights.webp"
        priority
        eyebrow="Pillar guide"
        title="Northern Lights"
        subtitle="Aurora borealis"
        description="Utsjoki delivers aurora on 4 out of 5 clear nights during peak season. Best viewed September to mid-April, with March as the peak month."
      />

      <section className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-aurora-green/10 border border-aurora-green/25 rounded-full px-4 py-2.5">
            <Calendar className="w-4 h-4 text-aurora-green" />
            <span className="text-deep-night/80 text-sm">
              Best season: <span className="font-semibold text-aurora-green">September → March</span> · darkest during kaamos (Nov–Jan)
            </span>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-3 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-vibe-pink" />
            Best viewing spots
          </h2>
          <p className="text-deep-night/65 max-w-2xl mb-10">
            Latitude alone doesn't make a good aurora spot — what matters is dark skies, an open
            northern horizon, and a place to sleep so you can wait for the cloud to break.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {spots.map((spot) => (
              <div
                key={spot.name}
                className="rounded-2xl border border-deep-night/10 bg-snow p-6 hover:border-aurora-green/40 hover:shadow-md transition-all"
              >
                <h3 className="font-heading text-2xl text-deep-night tracking-wide mb-2">{spot.name}</h3>
                <p className="text-deep-night/70 leading-relaxed mb-5">{spot.description}</p>
                <AffiliateCTA
                  partner="hotels"
                  sid={spot.sid}
                  destination={spot.destination}
                  className="inline-flex items-center gap-1.5 text-vibe-pink hover:text-pink-600 text-sm font-semibold"
                >
                  Find stays in {spot.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </AffiliateCTA>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-deep-night/10 bg-gradient-to-br from-emerald-50 via-snow to-cyan-50 p-8 sm:p-10">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-6 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-vibe-pink" />
            Aurora viewing tips
          </h2>

          <ol className="space-y-4">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-aurora-green text-snow flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-deep-night/80 leading-relaxed pt-0.5">{tip}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── A single Inari aurora night — depth content ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-deep-night/8 bg-gradient-to-br from-deep-night via-deep-night to-emerald-950 text-snow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-aurora-green text-xs uppercase tracking-[0.25em] mb-3">
            <Moon className="w-4 h-4" />
            One night · Inari · 2 March 2024
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wider mb-4 leading-tight">
            What an actual aurora night looks like
          </h2>
          <p className="text-snow/80 leading-relaxed mb-8 text-lg">
            Forecasts will tell you "good chance tonight". They won't tell you that you'll wait three
            hours for the sky to clear, that the first show will be a flat green band you almost
            miss, and that the second one — at 01:48 — will rip across the entire arctic dome.
            Here's how a representative night plays out for us.
          </p>

          <ol className="space-y-5 mb-10">
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">19:30</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">FMI forecast check</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Auroras-now: KP 4–5 forecast. NOAA OVATION shows the auroral oval already touching
                  Tromsø. Inari sky forecast: 60% clear after midnight. Decision: drive out.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">21:00</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">Drive 8 km west of Inari village</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Light pollution drops fast outside town. We pick a small lake clearing on the
                  Kaamanen road — open horizon to north and east. −18 °C, calm.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">22:40</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">First band — almost missed it</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Faint green arc on the northern horizon. Easy to dismiss as cloud reflection. The
                  camera (15 s, ISO 1600, f/2.8) showed it clearly — naked-eye threshold sits behind
                  what your phone records. This is normal. Wait.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">00:15</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">Cloud lifts. Quiet 40 minutes.</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Stars sharp. Aurora retreats. This is the moment most car-bound visitors give up
                  and drive back. Don't. The active phase often follows the lull. Hot drink. Patience.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-vibe-pink tracking-wider">01:48</span>
              <div className="border-l-2 border-vibe-pink/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1 text-vibe-pink">Substorm</p>
                <p className="text-snow/85 text-sm leading-relaxed">
                  The arc explodes. Curtains move horizon-to-zenith in seconds; pink and purple at
                  the lower edge — that's the rare colour, only in stronger storms. Lasts 14 minutes.
                  Camera barely keeps up. Naked eye sees structure clearly. This is the night you
                  drove for.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-16 text-right font-heading text-xl text-aurora-green tracking-wider">02:30</span>
              <div className="border-l-2 border-aurora-green/40 pl-4">
                <p className="font-heading text-lg tracking-wide mb-1">Drive home. Hot sauna.</p>
                <p className="text-snow/75 text-sm leading-relaxed">
                  Total active aurora time: ~25 minutes across two bursts. Total wait: 4 hours. You
                  cannot compress this. Coming back without a sauna afterwards is a mistake.
                </p>
              </div>
            </li>
          </ol>

          <div className="rounded-2xl border border-snow/15 bg-snow/5 backdrop-blur-sm p-6 sm:p-8">
            <div className="grid sm:grid-cols-3 gap-5 sm:gap-8 text-sm">
              <div>
                <Activity className="w-5 h-5 text-aurora-green mb-2" />
                <p className="font-heading text-base tracking-wide mb-1">Forecast tools</p>
                <p className="text-snow/70 leading-relaxed">FMI Auroras-now (KP), NOAA OVATION (oval), windy.com (cloud cover) — open all three.</p>
              </div>
              <div>
                <Camera className="w-5 h-5 text-aurora-green mb-2" />
                <p className="font-heading text-base tracking-wide mb-1">Camera baseline</p>
                <p className="text-snow/70 leading-relaxed">15 s · ISO 1600 · f/2.8 · manual focus on a distant light. Tripod mandatory.</p>
              </div>
              <div>
                <Moon className="w-5 h-5 text-aurora-green mb-2" />
                <p className="font-heading text-base tracking-wide mb-1">What kills the night</p>
                <p className="text-snow/70 leading-relaxed">Full moon (washes out colours). Cloud past 1500 m. Wind chill below −25 °C without proper gear.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-12 sm:pt-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            Want a guide who knows the cloud breaks?
          </h2>
          <p className="text-deep-night/70 mb-7 max-w-xl mx-auto">
            Aurora hunts run nightly from Rovaniemi, Saariselkä and Levi. Local guides chase the
            forecast and reposition when the sky clouds — far higher hit rate than going alone.
          </p>
          <AffiliateCTA
            partner="activities"
            sid="aurora_tour_cta"
            destination="rovaniemi-l2653"
            className="inline-flex items-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            Browse aurora tours
            <ArrowRight className="w-4 h-4" />
          </AffiliateCTA>

          {/* Internal cross-page links — connect aurora to seasons + parks + Inari hotels */}
          <div className="mt-12 pt-8 border-t border-deep-night/8 flex flex-wrap justify-center gap-2 text-sm">
            <Link to="/seasons" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              Why kaamos is the best aurora window →
            </Link>
            <Link to="/national-parks" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              Parks with darkest skies →
            </Link>
            <HubLink href="https://laplandstays.com" placement="aurora_stays" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              Glass-igloo aurora cabins →
            </HubLink>
          </div>
        </div>
      </section>
    </>
  )
}
