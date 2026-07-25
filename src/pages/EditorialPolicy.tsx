import SEO from '../components/SEO'
import { useLang } from '../i18n/useLang'
import { COPY } from '../locales/copy'

export default function EditorialPolicy() {
  const lang = useLang()
  const c = COPY[lang].editorial
  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath="/editorial-policy"
      />
      <div className="min-h-screen bg-cream pt-28 sm:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl sm:text-6xl text-deep-night tracking-wider leading-tight mb-3">
            {c.h1}
          </h1>
          <p className="text-deep-night/55 text-sm mb-10">{c.lastUpdated}</p>

          <div className="space-y-8 text-deep-night/80 leading-relaxed">
            {c.sections.map((s) => (
              <section key={s.h2}>
                <h2 className="font-heading text-2xl text-deep-night tracking-wide mb-3">{s.h2}</h2>
                <p>{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
