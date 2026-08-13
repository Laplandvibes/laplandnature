import SharedNotFound from '../../../shared/NotFound'
import { useLang, useLocalePath } from '../i18n/useLang'
import { COPY } from '../locales/copy'

// LaplandNature renders on a cream/light editorial background (see index.css:
// "Snow page bg, deep-night body text") — not the network's default deep-night,
// so this uses the shared 404's light variant to keep the text legible.
export default function NotFound() {
  const lang = useLang()
  const to = useLocalePath()
  const c = COPY[lang].nav

  // landmark={false} because this site's app layout already renders the
  // page's <main>. Without it the 404 route shipped two nested landmarks --
  // measured from the rendered DOM 2026-08-13, invisible to grep.
  return (
    <SharedNotFound
      landmark={false}
      lang={lang}
      siteName="LaplandNature"
      homeHref={to('/')}
      variant="light"
      links={[
        { href: to('/northern-lights'), label: c.northernLights },
        { href: to('/national-parks'), label: c.nationalParks },
        { href: to('/wildlife'), label: c.wildlife },
      ]}
    />
  )
}
