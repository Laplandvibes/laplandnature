import SEO from '../components/SEO'
import TermsContent from '../../../shared/Legal/TermsContent'
import { useLang } from '../i18n/useLang'
import { COPY } from '../locales/copy'

export default function Terms() {
  const lang = useLang()
  const c = COPY[lang].terms
  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath={lang === 'en' ? '/terms' : `/${lang}/terms`}
      />
      <TermsContent siteName="LaplandNature" lang={lang} />
    </>
  )
}
