import SEO from '../components/SEO'
import CookieContent from '../../../shared/Legal/CookieContent'
import { useLang } from '../i18n/useLang'
import { COPY } from '../locales/copy'

export default function CookiePolicy() {
  const lang = useLang()
  const c = COPY[lang].cookie
  return (
    <>
      <SEO
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalPath={lang === 'en' ? '/cookie-policy' : `/${lang}/cookie-policy`}
      />
      <CookieContent siteName="LaplandNature" lang={lang} />
    </>
  )
}
