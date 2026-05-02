import { Link } from 'react-router-dom'
import { Shield, TreePine, Leaf, Users, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import HeroImage from '../components/HeroImage'
import AffiliateCTA from '../components/AffiliateCTA'
import HubLink from '../components/HubLink'

const orgs = [
  {
    name: 'Metsähallitus (Parks & Wildlife Finland)',
    role: 'National Park Management',
    accent: 'text-aurora-green',
    icon: Shield,
    summary: "Manages 85% of Lapland's fell areas and all seven national parks above the Arctic Circle.",
    body: "Finland's state-owned enterprise that manages all national parks, hiking trails, wilderness huts, and protected areas in Lapland. They maintain trail infrastructure, visitor centres, and free outdoor education programmes.",
    url: 'https://www.metsa.fi/en/',
  },
  {
    name: 'Finnish Association for Nature Conservation (SLL)',
    role: 'Advocacy & Protection',
    accent: 'text-emerald-700',
    icon: Leaf,
    summary: "Finland's largest nature conservation organisation, founded 1938.",
    body: 'Founded in 1938, SLL works to protect Finnish nature through advocacy, campaigns, and environmental education. They focus on forest protection, climate action, and biodiversity.',
    url: 'https://www.sll.fi/en/',
  },
  {
    name: 'WWF Finland',
    role: 'Wildlife Recovery',
    accent: 'text-sky-700',
    icon: TreePine,
    summary: 'Saimaa ringed seal, arctic fox and forest reindeer recovery programmes.',
    body: 'WWF Finland runs species-recovery programmes including the Scandinavian arctic fox project that has lifted the Fennoscandian population from near-extinction since the 1990s.',
    url: 'https://wwf.fi/en/',
  },
  {
    name: 'Sámi Parliament',
    role: 'Indigenous stewardship',
    accent: 'text-vibe-pink',
    icon: Users,
    summary: 'Self-governance over Sámi cultural and environmental matters in northernmost Lapland.',
    body: "Sámi reindeer herding districts manage traditional grazing across the Sámi homeland, balancing ecology with the cultural-economic backbone of the region's indigenous people.",
    url: 'https://www.samediggi.fi/?lang=en',
  },
]

const principles = [
  {
    title: "Everyman's Right",
    body: "Finland's jokamiehenoikeudet lets anyone walk, ski, swim, forage berries and mushrooms, and camp briefly across forest land — even private land — without permission. The flip side is responsibility: leave no trace, respect homes and crops, fires only at marked sites.",
  },
  {
    title: 'No fire restrictions are seasonal',
    body: 'In summer dry spells the FMI publishes a metsäpalovaroitus / forest fire warning. When in effect, lighting any open fire — including marked fire pits — is forbidden. Always check before leaving a road.',
  },
  {
    title: 'Pack out everything',
    body: 'Wilderness huts (autiotupa) operate on trust: leave them cleaner than you found them, replace firewood, sign the guestbook. Trash in remote terrain compounds — there is no pickup.',
  },
  {
    title: 'Reindeer have right of way',
    body: 'Around 200,000 semi-domesticated reindeer roam Lapland — they are owned, not wild. On roads slow down; in the fells give them space. Around fences (poroaita), close gates behind you.',
  },
]

const CONSERVATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Conservation in Finnish Lapland — who protects the wilderness, and how',
  description: 'Metsähallitus manages 85% of fell areas and all seven national parks. SLL campaigns. WWF runs species recovery. Sámi Parliament holds indigenous stewardship. Plus the legal frame — Everyman\'s Right.',
  author: { '@type': 'Organization', name: 'LaplandNature editorial' },
  publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: 'https://laplandnature.com/conservation',
}

export default function Conservation() {
  return (
    <>
      <SEO
        title="Conservation in Finnish Lapland: Who Protects the Wilderness | LaplandNature"
        description="Metsähallitus manages 85% of Lapland's fell areas and all seven national parks. Plus SLL, WWF Finland, Sámi Parliament — and the Everyman's Right legal frame that lets anyone access nature responsibly."
        canonicalPath="/conservation"
        keywords={['lapland conservation', 'metsahallitus', 'sll finland', 'everymans right finland', 'sami parliament', 'arctic fox finland', 'lapland national parks management']}
        jsonLd={CONSERVATION_JSONLD}
      />

      <HeroImage
        image="hero-conservation.webp"
        priority
        eyebrow="Pillar guide"
        title="Conservation"
        subtitle="Protecting arctic wilderness"
        description="Metsähallitus manages 85% of Lapland's fell areas and all seven national parks. Finland's Everyman's Right gives everyone free access to nature — responsibly."
      />

      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">Who's who</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deep-night tracking-wider mb-4">
              Conservation organisations
            </h2>
            <p className="text-deep-night/70 max-w-2xl mx-auto">
              The four bodies that decide how Lapland's wilderness is managed, protected, and used —
              from federal park management to Sámi self-governance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {orgs.map((o) => {
              const Icon = o.icon
              return (
                <article key={o.name} className="rounded-2xl border border-deep-night/10 bg-snow p-6 sm:p-7 hover:shadow-md hover:border-aurora-green/40 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-aurora-green/10 flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 ${o.accent}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${o.accent} mb-1`}>{o.role}</p>
                      <h3 className="font-heading text-2xl text-deep-night tracking-wide leading-tight">{o.name}</h3>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${o.accent} mb-3`}>{o.summary}</p>
                  <p className="text-deep-night/75 text-sm leading-relaxed mb-5">{o.body}</p>
                  <a
                    href={o.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-vibe-pink hover:text-pink-600 text-sm font-semibold"
                  >
                    Visit official site
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-deep-night/10 bg-gradient-to-br from-emerald-50 via-snow to-cyan-50 p-8 sm:p-12">
          <div className="text-center mb-10">
            <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">Visitor responsibility</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider">
              Four things to know before you go
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {principles.map((p, i) => (
              <div key={p.title} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-aurora-green text-snow flex items-center justify-center text-sm font-bold mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-xl text-deep-night tracking-wide mb-2">{p.title}</h3>
                  <p className="text-deep-night/75 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable visitor block — soft CTA + cross-links */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-aurora-green uppercase tracking-[0.25em] text-xs mb-3">Visit responsibly</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-night tracking-wider mb-4">
            Travel here on the side of the wilderness
          </h2>
          <p className="text-deep-night/75 leading-relaxed mb-7">
            Every booking we recommend goes to operators that contribute to local conservation —
            Sámi-owned reindeer farms, Metsähallitus-licensed wilderness huts, and small family
            outfitters who keep bears, wolves, and arctic foxes worth more alive than dead. The
            single biggest thing a visitor can do is sleep where the local economy needs them.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <AffiliateCTA
              partner="hotels"
              sid="conservation_local_stay"
              destination="Inari, Finland"
              className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-pink-600 text-snow font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Stay in a Sámi village
              <ArrowRight className="w-4 h-4" />
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="conservation_local_tour"
              destination="rovaniemi-l2653"
              className="inline-flex items-center justify-center gap-2 border border-deep-night/15 hover:border-vibe-pink/50 text-deep-night px-6 py-3 rounded-full transition-colors"
            >
              Local-led nature experiences
            </AffiliateCTA>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <Link to="/wildlife" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              Wildlife you can see →
            </Link>
            <Link to="/national-parks" className="px-4 py-2 rounded-full bg-aurora-green/10 text-aurora-green border border-aurora-green/25 hover:bg-aurora-green hover:text-snow transition-colors font-semibold">
              The five protected parks →
            </Link>
            <HubLink href="https://laplandvibes.com" placement="conservation_hub_cta" className="px-4 py-2 rounded-full bg-vibe-pink/10 text-vibe-pink border border-vibe-pink/25 hover:bg-vibe-pink hover:text-snow transition-colors font-semibold">
              Wider Lapland travel guide →
            </HubLink>
          </div>
        </div>
      </section>
    </>
  )
}
