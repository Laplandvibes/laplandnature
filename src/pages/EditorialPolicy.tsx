import SEO from '../components/SEO'

export default function EditorialPolicy() {
  return (
    <>
      <SEO
        title="Editorial Policy — LaplandNature"
        description="How LaplandNature researches, writes and verifies its Lapland nature guides. Our independence policy and how we handle affiliate income."
        canonicalPath="/editorial-policy"
      />
      <div className="min-h-screen bg-cream pt-28 sm:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl sm:text-6xl text-deep-night tracking-wider leading-tight mb-3">
            Editorial Policy
          </h1>
          <p className="text-deep-night/55 text-sm mb-10">Last updated: April 2026</p>

          <div className="space-y-8 text-deep-night/80 leading-relaxed">
            <section>
              <h2 className="font-heading text-2xl text-deep-night tracking-wide mb-3">Who writes this site</h2>
              <p>
                LaplandNature is part of the LaplandVibes ecosystem, independently maintained by
                Lapeso Oy in Finnish Lapland. Content is written and reviewed by people who live
                and travel in the region year-round — not generated from a desk in another country.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-deep-night tracking-wide mb-3">How we choose what to recommend</h2>
              <p>
                Park gateways, trailheads and aurora-viewing villages are recommended on the basis
                of dark-sky data, hut-network coverage, road access in winter, and our own visits.
                We do not accept payment in exchange for inclusion. If a region or operator pays us
                directly we say so on the page.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-deep-night tracking-wide mb-3">Affiliate income</h2>
              <p>
                Some links on this site route through go.laplandvibes.com and earn us a small
                commission when you book at no extra cost to you. Affiliate revenue covers hosting
                and writing time. It never decides which destinations or operators we feature, and
                it does not change recommendations on a page.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-deep-night tracking-wide mb-3">Corrections</h2>
              <p>
                If you find a factual error — distance, opening dates, fauna status, anything —
                tell us at <a href="mailto:info@laplandvibes.com" className="text-vibe-pink hover:underline">info@laplandvibes.com</a>.
                We correct quickly and note the change on the page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
