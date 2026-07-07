import SEO from '../components/SEO'
import PrivacyContent from '../../../shared/Legal/PrivacyContent'
import { useLang } from '../i18n/useLang'
import { COPY } from '../locales/copy'

export default function PrivacyPolicy() {
  const lang = useLang()
  const c = COPY[lang].privacy
  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath={lang === 'en' ? '/privacy' : `/${lang}/privacy`}
      />
      <PrivacyContent siteName="LaplandNature" lang={lang} />
    </>
  )
}
