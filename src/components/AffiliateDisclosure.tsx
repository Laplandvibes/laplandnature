import { Info } from 'lucide-react'

interface AffiliateDisclosureProps {
  lang?: 'fi' | 'en'
  className?: string
  variant?: 'compact' | 'full'
}

const TEXT = {
  fi: {
    compact: 'Sivu sisältää kumppanuuslinkkejä — saamme pienen provision varauksistasi ilman lisäkustannuksia.',
    full: 'Tämä sivu sisältää kumppanuuslinkkejä. Kun varaat näiden kautta, saamme pienen provision ilman lisäkustannuksia sinulle.',
  },
  en: {
    compact: 'Affiliate links — we earn a small commission at no extra cost when you book.',
    full: 'This page contains affiliate links. If you book through these links, LaplandNature may receive a commission at no extra cost to you.',
  },
}

export default function AffiliateDisclosure({
  lang = 'en',
  className = '',
  variant = 'full',
}: AffiliateDisclosureProps) {
  const text = TEXT[lang][variant]
  return (
    <p
      className={`flex items-center justify-center gap-2 text-xs text-deep-night/55 ${className}`}
      role="note"
    >
      <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{text}</span>
    </p>
  )
}
