import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Truck, Layers, Compass, PackageCheck } from 'lucide-react'
import { scandinavianOutdoorLink, SCANDINAVIAN_OUTDOOR } from '../config/scandinavianOutdoor'
import { trackAffiliateClick } from '../lib/analytics'
import AffiliateDisclosure from './AffiliateDisclosure'
import { useLang, type Lang } from '../i18n/useLang'

/**
 * Affiliate ad — Scandinavian Outdoor (Adtraction), Nordic outdoor retailer,
 * "Outdoor expert since 1970", 100% Finnish-owned (Turku).
 * Placement: /seasons (what to pack for four-season arctic weather) — DISTINCT page and
 * DISTINCT visual skin from the Halti gear ad on /hiking-trails, so the two gear ads are
 * distributed and never read as duplicates (premium_design_standard §6).
 *
 * Skinned in SCANDINAVIAN OUTDOOR's OWN brand (premium_design_standard §6): warm
 * cream/white card, their real maroon wordmark + maroon accent, maroon CTA — reads as an
 * authentic retailer partner placement.
 *
 * Offer hook (affiliate_ad_creative_process): EVERGREEN facts only — multi-brand outdoor
 * shop since 1970, and the EU-wide free delivery over €250 (always-true, not a
 * time-limited %). The global English store scandinavianoutdoor.com ships across the EU,
 * so this is safe for the 11-language audience. NO hardcoded sale-% (would go stale).
 *
 * Required affiliate attributes (LV spec): target="_blank" rel="sponsored nofollow
 * noopener" — NO `noreferrer`. Pure CSS/Tailwind animation, disabled under
 * prefers-reduced-motion.
 */

const SO_MAROON = '#7A1730'
const SO_MAROON_DEEP = '#5E1226'

export default function PackingAd({
  sid = 'seasons_what_to_pack',
  className = '',
}: {
  sid?: string
  className?: string
}) {
  const lang = useLang()
  const href = scandinavianOutdoorLink(sid)

  const rootRef = useRef<HTMLElement | null>(null)
  const [armed, setArmed] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setRevealed(true)
      return
    }
    setArmed(true)
  }, [])

  useEffect(() => {
    if (!armed || revealed) return
    const el = rootRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    const t = window.setTimeout(() => setRevealed(true), 2500)
    return () => {
      io.disconnect()
      window.clearTimeout(t)
    }
  }, [armed, revealed])

  const animState = !armed ? 'off' : revealed ? 'in' : 'pending'
  const pick = (m: Record<Lang, string>) => m[lang]

  const adLabel = pick({
    en: 'Ad', fi: 'Mainos', de: 'Anzeige', ja: '広告', es: 'Anuncio',
    'pt-BR': 'Anúncio', 'zh-CN': '广告', ko: '광고', fr: 'Annonce',
    it: 'Annuncio', nl: 'Advertentie',
  })

  const eyebrow = pick({
    en: 'What to pack',
    fi: 'Mitä pakata mukaan',
    de: 'Was einpacken',
    ja: '持ち物リスト',
    es: 'Qué llevar',
    'pt-BR': 'O que levar',
    'zh-CN': '装备清单',
    ko: '무엇을 챙길까',
    fr: 'Que mettre dans le sac',
    it: 'Cosa mettere in valigia',
    nl: 'Wat mee te nemen',
  })

  // Functional, factual hook for a practical site (human_copy_rule). Each season needs
  // different kit — the retailer angle. No em-dash, no poetry; the "since 1970" keeps a
  // word after it.
  const headline = pick({
    en: 'Each Lapland season asks for different kit. Scandinavian Outdoor has stocked it since 1970.',
    fi: 'Jokainen Lapin vuodenaika vaatii eri varusteet. Scandinavian Outdoor on myynyt niitä vuodesta 1970.',
    de: 'Jede Lappland-Saison verlangt andere Ausrüstung. Scandinavian Outdoor führt sie seit 1970.',
    ja: 'ラップランドの季節ごとに必要な装備は変わります。Scandinavian Outdoor は1970年からそれを揃えてきました。',
    es: 'Cada estación en Laponia pide un equipo distinto. Scandinavian Outdoor lo tiene desde 1970.',
    'pt-BR': 'Cada estação na Lapônia pede um equipamento diferente. A Scandinavian Outdoor o tem desde 1970.',
    'zh-CN': '拉普兰每个季节需要的装备都不同。Scandinavian Outdoor 自 1970 年起就备齐了这些。',
    ko: '라플란드는 계절마다 필요한 장비가 다릅니다. Scandinavian Outdoor는 1970년부터 그 장비를 갖춰 왔습니다.',
    fr: 'Chaque saison en Laponie demande un autre équipement. Scandinavian Outdoor le propose depuis 1970.',
    it: 'Ogni stagione in Lapponia richiede attrezzatura diversa. Scandinavian Outdoor la propone dal 1970.',
    nl: 'Elk seizoen in Lapland vraagt om andere uitrusting. Scandinavian Outdoor heeft het al sinds 1970.',
  })

  const sub = pick({
    en: 'A Nordic outdoor shop carrying Fjällräven, Haglöfs, Rab, Salomon and Lowa — layers for ruska, a −30 °C shell for kaamos, light kit for the midnight sun. One order covers the whole trip.',
    fi: 'Pohjoismainen ulkoilukauppa, valikoimassa Fjällräven, Haglöfs, Rab, Salomon ja Lowa — kerrokset ruskaan, −30 °C:n kuoritakki kaamokseen, kevyt varustus keskiyön aurinkoon. Yksi tilaus kattaa koko reissun.',
    de: 'Ein nordischer Outdoor-Shop mit Fjällräven, Haglöfs, Rab, Salomon und Lowa — Lagen für die Ruska, eine −30-°C-Shell für die Kaamos, leichte Ausrüstung für die Mitternachtssonne. Eine Bestellung deckt die ganze Reise.',
    ja: 'Fjällräven、Haglöfs、Rab、Salomon、Lowa を扱う北欧のアウトドアショップ。ルスカ向けのレイヤー、カーモス用の −30 °C シェル、白夜の軽装まで。ひとつの注文で旅全体をカバーできます。',
    es: 'Una tienda outdoor nórdica con Fjällräven, Haglöfs, Rab, Salomon y Lowa — capas para la ruska, una chaqueta de −30 °C para el kaamos, equipo ligero para el sol de medianoche. Un pedido cubre todo el viaje.',
    'pt-BR': 'Uma loja outdoor nórdica com Fjällräven, Haglöfs, Rab, Salomon e Lowa — camadas para a ruska, uma casaca de −30 °C para o kaamos, equipamento leve para o sol da meia-noite. Um pedido cobre a viagem toda.',
    'zh-CN': '一家北欧户外店,品牌涵盖 Fjällräven、Haglöfs、Rab、Salomon 和 Lowa——应对秋色季的内层、抗 −30 °C 极夜的冲锋衣、午夜阳光下的轻装。一次下单就能备齐整趟旅程。',
    ko: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa를 갖춘 북유럽 아웃도어 매장 — 루스카를 위한 레이어, 카모스를 위한 −30 °C 셸, 백야를 위한 가벼운 장비까지. 한 번의 주문으로 여행 전체를 준비할 수 있습니다.',
    fr: 'Une boutique outdoor nordique avec Fjällräven, Haglöfs, Rab, Salomon et Lowa — des couches pour la ruska, une veste −30 °C pour le kaamos, du matériel léger pour le soleil de minuit. Une commande couvre tout le voyage.',
    it: 'Un negozio outdoor nordico con Fjällräven, Haglöfs, Rab, Salomon e Lowa — strati per la ruska, una giacca da −30 °C per il kaamos, attrezzatura leggera per il sole di mezzanotte. Un ordine copre tutto il viaggio.',
    nl: 'Een Noordse outdoorwinkel met Fjällräven, Haglöfs, Rab, Salomon en Lowa — lagen voor de ruska, een −30 °C-shell voor de kaamos, lichte uitrusting voor de middernachtzon. Eén bestelling dekt de hele reis.',
  })

  const trust: { icon: typeof Truck; label: string }[] = [
    {
      icon: Compass,
      label: pick({
        en: 'Nordic outdoor expert since 1970',
        fi: 'Pohjoismainen ulkoiluasiantuntija vuodesta 1970',
        de: 'Nordischer Outdoor-Experte seit 1970',
        ja: '1970年からの北欧アウトドア専門店',
        es: 'Experto outdoor nórdico desde 1970',
        'pt-BR': 'Especialista outdoor nórdico desde 1970',
        'zh-CN': '北欧户外专家,始于 1970 年',
        ko: '1970년부터 이어온 북유럽 아웃도어 전문점',
        fr: 'Spécialiste outdoor nordique depuis 1970',
        it: 'Esperto outdoor nordico dal 1970',
        nl: 'Noordse outdoorexpert sinds 1970',
      }),
    },
    {
      icon: Layers,
      label: pick({
        en: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
        fi: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
        de: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
        ja: 'Fjällräven・Haglöfs・Rab・Salomon・Lowa',
        es: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
        'pt-BR': 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
        'zh-CN': 'Fjällräven、Haglöfs、Rab、Salomon、Lowa',
        ko: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
        fr: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
        it: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
        nl: 'Fjällräven, Haglöfs, Rab, Salomon, Lowa',
      }),
    },
    {
      icon: Truck,
      label: pick({
        en: 'Free EU delivery over €250',
        fi: 'Ilmainen EU-toimitus yli 250 €',
        de: 'Kostenlose EU-Lieferung ab 250 €',
        ja: 'EU内 250 € 以上で送料無料',
        es: 'Envío gratis en la UE desde 250 €',
        'pt-BR': 'Entrega grátis na UE acima de 250 €',
        'zh-CN': '欧盟内满 250 € 免运费',
        ko: 'EU 250 € 이상 무료 배송',
        fr: 'Livraison UE offerte dès 250 €',
        it: 'Spedizione UE gratis oltre 250 €',
        nl: 'Gratis EU-levering vanaf € 250',
      }),
    },
  ]

  const cta = pick({
    en: 'Shop the gear', fi: 'Tutustu varusteisiin', de: 'Ausrüstung ansehen',
    ja: '装備を見る', es: 'Ver el equipo', 'pt-BR': 'Ver o equipamento',
    'zh-CN': '选购装备', ko: '장비 둘러보기', fr: 'Voir l’équipement',
    it: 'Scopri l’attrezzatura', nl: 'Bekijk de uitrusting',
  })

  const poweredBy = pick({
    en: 'Sold by Scandinavian Outdoor', fi: 'Myynti: Scandinavian Outdoor',
    de: 'Verkauf durch Scandinavian Outdoor', ja: '販売：Scandinavian Outdoor',
    es: 'Vendido por Scandinavian Outdoor', 'pt-BR': 'Vendido pela Scandinavian Outdoor',
    'zh-CN': '由 Scandinavian Outdoor 销售', ko: 'Scandinavian Outdoor 판매',
    fr: 'Vendu par Scandinavian Outdoor', it: 'Venduto da Scandinavian Outdoor',
    nl: 'Verkocht door Scandinavian Outdoor',
  })

  // Evergreen chip — the always-true free-EU-delivery threshold (not a sale %).
  const chip = pick({
    en: 'One order for the whole trip',
    fi: 'Yksi tilaus koko reissulle',
    de: 'Eine Bestellung für die ganze Reise',
    ja: '旅まるごと、ひとつの注文で',
    es: 'Un pedido para todo el viaje',
    'pt-BR': 'Um pedido para a viagem toda',
    'zh-CN': '一次下单,备齐整趟旅程',
    ko: '여행 전체를 한 번의 주문으로',
    fr: 'Une commande pour tout le voyage',
    it: 'Un ordine per tutto il viaggio',
    nl: 'Eén bestelling voor de hele reis',
  })

  return (
    <section
      ref={rootRef}
      data-anim={animState}
      className={`ln-so-ad group/ad relative overflow-hidden rounded-3xl bg-[#FBF7F4] text-stone-900 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.5)] ring-1 ring-stone-900/10 ${className}`}
      style={{ borderTop: `4px solid ${SO_MAROON}` }}
      aria-label={headline}
    >
      <style>{`
        .ln-so-ad[data-anim='pending'] .ln-rise { opacity: 0; transform: translateY(14px); }
        .ln-so-ad[data-anim='in'] .ln-rise {
          opacity: 1; transform: none;
          transition: opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1);
        }
        .ln-so-ad[data-anim='in'] .ln-rise-1 { transition-delay: .05s; }
        .ln-so-ad[data-anim='in'] .ln-rise-2 { transition-delay: .13s; }
        .ln-so-ad[data-anim='in'] .ln-rise-3 { transition-delay: .21s; }

        .ln-so-ad[data-anim='pending'] .ln-stage { opacity: 0; transform: scale(.96); }
        .ln-so-ad[data-anim='in'] .ln-stage {
          opacity: 1; transform: scale(1);
          transition: opacity .7s ease, transform .9s cubic-bezier(.22,.61,.36,1);
        }

        .ln-so-ad .ln-shimmer {
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.5) 50%, transparent 70%);
          transform: translateX(-120%);
          opacity: 0;
        }
        .ln-so-ad[data-anim='in'] .ln-shimmer {
          opacity: 1;
          animation: ln-so-shimmer 7s ease-in-out 1.1s infinite;
        }
        @keyframes ln-so-shimmer {
          0% { transform: translateX(-120%); }
          24%,100% { transform: translateX(120%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ln-so-ad .ln-rise,
          .ln-so-ad .ln-stage { opacity: 1 !important; transform: none !important; transition: none !important; }
          .ln-so-ad .ln-shimmer { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      {/* Soft maroon wash, top-right — the retailer accent on the warm card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(122,23,48,0.14), transparent)' }}
      />

      <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── Copy column ─────────────────────────────────────────────── */}
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="ln-rise ln-rise-1 mb-5 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <span
                className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ backgroundColor: 'rgba(122,23,48,0.12)', color: SO_MAROON_DEEP }}
              >
                {adLabel}
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SO_MAROON_DEEP }}>
                {eyebrow}
              </p>
            </div>
            <img
              src={SCANDINAVIAN_OUTDOOR.logo}
              alt="Scandinavian Outdoor"
              width={132}
              height={44}
              loading="lazy"
              decoding="async"
              className="h-8 w-auto shrink-0 sm:h-10"
            />
          </div>

          <h2 className="ln-rise ln-rise-1 mb-3 max-w-xl text-2xl font-bold leading-tight text-stone-900 sm:text-3xl [text-wrap:balance]">
            {headline}
          </h2>
          <p className="ln-rise ln-rise-2 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
            {sub}
          </p>

          <ul className="ln-rise ln-rise-2 mt-5 flex flex-col gap-2.5">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm text-stone-700">
                <t.icon className="h-4 w-4 shrink-0" style={{ color: SO_MAROON }} aria-hidden="true" />
                <span>{t.label}</span>
              </li>
            ))}
          </ul>

          <div
            className="ln-rise ln-rise-3 mt-6 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold text-white"
            style={{ backgroundColor: SO_MAROON }}
          >
            <PackageCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{chip}</span>
          </div>

          <div className="ln-rise ln-rise-3 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              onClick={() => trackAffiliateClick(SCANDINAVIAN_OUTDOOR.slug, `packing:${sid}`, href)}
              className="group/cta inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-4 font-semibold text-white no-underline shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: SO_MAROON, boxShadow: `0 14px 30px -12px ${SO_MAROON}99` }}
            >
              {cta}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <p className="text-[11px] uppercase tracking-[0.12em] text-stone-400">{poweredBy}</p>
          </div>

          <AffiliateDisclosure lang={lang} variant="compact" className="mt-6 !justify-start !text-stone-500" />
        </div>

        {/* ── Brand illustration stage (logo + maroon gradient, no fake product photos) ── */}
        <div
          aria-hidden="true"
          className="relative min-h-[15rem] overflow-hidden lg:min-h-full"
          style={{ background: `linear-gradient(155deg, ${SO_MAROON} 0%, ${SO_MAROON_DEEP} 100%)` }}
        >
          <div
            className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.10), transparent)' }}
          />
          <div className="ln-stage relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
            <div className="relative overflow-hidden rounded-2xl bg-white px-7 py-6 shadow-[0_18px_45px_-18px_rgba(0,0,0,0.55)]">
              <img
                src={SCANDINAVIAN_OUTDOOR.logo}
                alt=""
                width={300}
                height={100}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto sm:h-14"
              />
              <div className="ln-shimmer pointer-events-none absolute inset-0" />
            </div>
            <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Since 1970
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
