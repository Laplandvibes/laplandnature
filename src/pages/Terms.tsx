import SEO from '../components/SEO'
import TermsContent from '../../../shared/Legal/TermsContent'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Use — LaplandNature"
        description="Terms governing use of LaplandNature.com — content licensing, affiliate disclosures, and editorial standards. Operated by Lapeso Oy in Finland."
        canonicalPath="/terms"
      />
      <TermsContent siteName="LaplandNature" />
    </>
  )
}
