import { Info } from 'lucide-react'

type Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl'

interface AffiliateDisclosureProps {
  lang?: Lang
  className?: string
  variant?: 'compact' | 'full'
}

const TEXT: Record<Lang, { compact: string; full: string }> = {
  en: {
    compact: 'Affiliate links — we earn a small commission at no extra cost when you book.',
    full: 'This page contains affiliate links. If you book through these links, LaplandNature may receive a commission at no extra cost to you.',
  },
  fi: {
    compact: 'Sivu sisältää kumppanuuslinkkejä — saamme pienen provision varauksistasi ilman lisäkustannuksia.',
    full: 'Tämä sivu sisältää kumppanuuslinkkejä. Kun varaat näiden kautta, saamme pienen provision ilman lisäkustannuksia sinulle.',
  },
  de: {
    compact: 'Partnerlinks — wir erhalten eine kleine Provision bei Buchungen ohne Mehrkosten für Sie.',
    full: 'Diese Seite enthält Partnerlinks. Wenn Sie darüber buchen, erhält LaplandNature möglicherweise eine Provision ohne Mehrkosten für Sie.',
  },
  ja: {
    compact: 'アフィリエイトリンク — ご予約いただくと追加費用なしで少額の手数料を受け取ります。',
    full: 'このページにはアフィリエイトリンクが含まれます。リンク経由でご予約いただいた場合、追加費用なしで LaplandNature に手数料が支払われることがあります。',
  },
  es: {
    compact: 'Enlaces de afiliación — recibimos una pequeña comisión sin coste adicional cuando reserva.',
    full: 'Esta página contiene enlaces de afiliación. Si reserva a través de ellos, LaplandNature puede recibir una comisión sin coste adicional para usted.',
  },
  'pt-BR': {
    compact: 'Links de afiliados — recebemos uma pequena comissão sem custo adicional quando você reserva.',
    full: 'Esta página contém links de afiliados. Se você reservar por meio deles, a LaplandNature poderá receber uma comissão sem custo adicional para você.',
  },
  'zh-CN': {
    compact: '联盟链接 — 您预订时我们会收到少量佣金，不会增加您的费用。',
    full: '本页面包含联盟链接。如果您通过这些链接预订，LaplandNature 可能会收到佣金，不会增加您的费用。',
  },
  ko: {
    compact: '제휴 링크 — 귀하가 예약하시면 추가 비용 없이 LaplandVibes는 약간의 수수료를 받습니다.',
    full: '이 사이트의 일부 링크는 제휴 링크입니다. 귀하가 결제하면 LaplandVibes는 약간의 수수료를 받습니다. 추가 비용은 없습니다.',
  },
  fr: {
    compact: "Liens d'affiliation — nous touchons une petite commission sans frais supplémentaires pour vous.",
    full: "Certains liens de ce site sont des liens d'affiliation. Si vous effectuez un achat, LaplandVibes touchera une petite commission. Sans coût supplémentaire pour vous.",
  },
  it: {
    compact: 'Link di affiliazione — riceviamo una piccola commissione senza costi aggiuntivi per Lei quando prenota.',
    full: 'Alcuni link su questo sito sono link di affiliazione. Se acquista, LaplandVibes riceverà una piccola commissione. Senza costi aggiuntivi per Lei.',
  },
  nl: {
    compact: 'Affiliate-links — wij ontvangen een kleine commissie zonder extra kosten voor u wanneer u boekt.',
    full: 'Sommige links op deze site zijn affiliate-links. Als u een aankoop doet, ontvangt LaplandVibes een kleine commissie. Zonder extra kosten voor u.',
  },
}

export default function AffiliateDisclosure({
  lang = 'en',
  className = '',
  variant = 'full',
}: AffiliateDisclosureProps) {
  const entry = TEXT[lang] ?? TEXT.en
  const text = entry[variant]
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
