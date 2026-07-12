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

  return (
    <SharedNotFound
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
