import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Droplets, Flag, Mountain, Snowflake } from 'lucide-react'
import { haltiLink, HALTI } from '../config/halti'
import { trackAffiliateClick } from '../lib/analytics'
import AffiliateDisclosure from './AffiliateDisclosure'
import { useLang, type Lang } from '../i18n/useLang'

/**
 * Affiliate ad — Halti (Adtraction), Finnish outdoor brand since 1976.
 * Placement: /hiking-trails (technical shells + winter footwear for real trail days)
 * — DISTINCT page from the Scandinavian Outdoor "what to pack" ad on /seasons, so the
 * two gear ads are distributed, never stacked (premium_design_standard §6).
 *
 * Skinned in HALTI's OWN brand (premium_design_standard §6): crisp white card, Halti's
 * real black wordmark, their signature volt/lime accent, bold black CTA — reads as an
 * authentic Halti partner placement, sitting cleanly as a framed unit on the light page.
 *
 * Offer hook (affiliate_ad_creative_process): EVERGREEN brand facts only — Finnish since
 * 1976, DrymaxX waterproof-breathable, built for real arctic weather. NO hardcoded sale-%
 * (would go stale = fake data). halti.com ships internationally (English), so this is
 * safe for the 11-language audience.
 *
 * Required affiliate attributes (LV spec): target="_blank" rel="sponsored nofollow
 * noopener" — NO `noreferrer`. Pure CSS/Tailwind animation, disabled under
 * prefers-reduced-motion.
 */

const HALTI_VOLT = '#C4D600'
const HALTI_INK = '#0B0B0C'

export default function OutdoorGearAd({
  sid = 'hiking_trail_gear',
  className = '',
}: {
  sid?: string
  className?: string
}) {
  const lang = useLang()
  const href = haltiLink(sid)

  // One-shot scroll reveal — content is always visible pre-JS / reduced-motion; the
  // animation only layers on once armed, with a safety timer so it never sticks hidden.
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
    en: 'Gear for the trail',
    fi: 'Varusteet polulle',
    de: 'Ausrüstung für den Trail',
    ja: 'トレイルのためのギア',
    es: 'Equipo para la ruta',
    'pt-BR': 'Equipamento para a trilha',
    'zh-CN': '徒步装备',
    ko: '트레일을 위한 장비',
    fr: 'Équipement pour le sentier',
    it: 'Attrezzatura per il sentiero',
    nl: 'Uitrusting voor het pad',
  })

  // Functional, factual hook (human_copy_rule: practical site → matter-of-fact, no
  // poetry, no em-dash). The brand-since line is a second sentence so 1976 keeps a word
  // after it (no orphan year).
  const headline = pick({
    en: 'A wet shell ends a hike fast. Halti has built waterproof gear for Finnish weather since 1976.',
    fi: 'Märkä takki katkaisee vaelluksen nopeasti. Halti on tehnyt vedenpitäviä varusteita Suomen säähän vuodesta 1976.',
    de: 'Eine nasse Jacke beendet eine Wanderung schnell. Halti baut wasserdichte Ausrüstung für finnisches Wetter, schon seit 1976.',
    ja: '濡れたシェルは山行をすぐ台無しにします。Halti は1976年からフィンランドの天候に合う防水ギアを作ってきました。',
    es: 'Una chaqueta mojada acaba una ruta enseguida. Halti fabrica equipo impermeable para el clima finlandés desde 1976.',
    'pt-BR': 'Uma casaca molhada acaba com a caminhada rápido. A Halti faz equipamento impermeável para o clima finlandês desde 1976.',
    'zh-CN': '冲锋衣一旦湿透,徒步很快就结束了。Halti 自 1976 年起就为芬兰的天气打造防水装备。',
    ko: '젖은 셸은 산행을 금세 끝냅니다. Halti는 1976년부터 핀란드 날씨에 맞는 방수 장비를 만들어 왔습니다.',
    fr: 'Une veste trempée met fin à une rando très vite. Halti fabrique de l’équipement imperméable pour le climat finlandais depuis 1976.',
    it: 'Una giacca bagnata chiude un’escursione in fretta. Halti produce attrezzatura impermeabile per il clima finlandese dal 1976.',
    nl: 'Een natte jas maakt een tocht snel kapot. Halti maakt sinds 1976 waterdichte uitrusting voor het Finse weer.',
  })

  const sub = pick({
    en: 'Shell jackets, insulated layers and winter boots built around the DrymaxX waterproof-breathable membrane. The kit Finns actually wear on the fells, from a day on Karhunkierros to a week in the wilderness huts.',
    fi: 'Kuoritakkeja, lämpövuorattuja kerroksia ja talvisaappaita DrymaxX-kalvon ympärille rakennettuna: vedenpitävä ja hengittävä. Tätä suomalaiset oikeasti pitävät tuntureilla, Karhunkierroksen päivästä erämaan autiotupaviikkoon.',
    de: 'Shelljacken, isolierende Lagen und Winterstiefel rund um die wasserdicht-atmungsaktive DrymaxX-Membran. Die Ausrüstung, die Finnen wirklich auf den Fjälls tragen, vom Tag auf dem Karhunkierros bis zur Woche in den Wildnishütten.',
    ja: 'シェルジャケット、保温レイヤー、ウィンターブーツを、防水透湿の DrymaxX メンブレンを軸に。カルフンキエッロスの日帰りから山小屋で過ごす一週間まで、フィンランド人が実際にフィエルで着る装備です。',
    es: 'Chaquetas shell, capas térmicas y botas de invierno construidas en torno a la membrana DrymaxX, impermeable y transpirable. El equipo que los finlandeses llevan de verdad en las fjälls, de un día en el Karhunkierros a una semana en las cabañas de la naturaleza.',
    'pt-BR': 'Casacos shell, camadas térmicas e botas de inverno construídos em torno da membrana DrymaxX, impermeável e respirável. O kit que os finlandeses realmente vestem nas fjälls, de um dia no Karhunkierros a uma semana nas cabanas da natureza.',
    'zh-CN': '冲锋衣、保暖内层和冬靴,都围绕防水透气的 DrymaxX 面料打造。这是芬兰人真正穿上山的装备,从卡尔胡恩基耶罗斯的一日徒步到荒野木屋里的一周。',
    ko: '방수·투습 DrymaxX 멤브레인을 중심으로 만든 셸 재킷, 보온 레이어, 겨울 부츠. 카르훈키에로스 당일 산행부터 야생 오두막에서 보내는 일주일까지, 핀란드 사람들이 실제로 산에서 입는 장비입니다.',
    fr: 'Vestes shell, couches isolantes et bottes d’hiver conçues autour de la membrane DrymaxX, imperméable et respirante. L’équipement que les Finlandais portent vraiment sur les fjälls, d’une journée sur le Karhunkierros à une semaine dans les refuges.',
    it: 'Giacche shell, strati termici e stivali invernali costruiti attorno alla membrana DrymaxX, impermeabile e traspirante. L’attrezzatura che i finlandesi indossano davvero sulle fjäll, da una giornata sul Karhunkierros a una settimana nei rifugi.',
    nl: 'Shelljassen, isolerende lagen en winterlaarzen rond het waterdicht-ademende DrymaxX-membraan. De uitrusting die Finnen echt dragen op de fjells, van een dag op de Karhunkierros tot een week in de wildernishutten.',
  })

  const trust: { icon: typeof Flag; label: string }[] = [
    {
      icon: Flag,
      label: pick({
        en: 'Finnish outdoor brand since 1976',
        fi: 'Suomalainen ulkoilumerkki vuodesta 1976',
        de: 'Finnische Outdoor-Marke seit 1976',
        ja: '1976年創業のフィンランド・アウトドアブランド',
        es: 'Marca outdoor finlandesa desde 1976',
        'pt-BR': 'Marca outdoor finlandesa desde 1976',
        'zh-CN': '芬兰户外品牌,始于 1976 年',
        ko: '1976년부터 이어온 핀란드 아웃도어 브랜드',
        fr: 'Marque outdoor finlandaise depuis 1976',
        it: 'Marchio outdoor finlandese dal 1976',
        nl: 'Fins outdoormerk sinds 1976',
      }),
    },
    {
      icon: Droplets,
      label: pick({
        en: 'DrymaxX waterproof & breathable',
        fi: 'DrymaxX vedenpitävä ja hengittävä',
        de: 'DrymaxX wasserdicht & atmungsaktiv',
        ja: 'DrymaxX 防水・透湿',
        es: 'DrymaxX impermeable y transpirable',
        'pt-BR': 'DrymaxX impermeável e respirável',
        'zh-CN': 'DrymaxX 防水透气',
        ko: 'DrymaxX 방수·투습',
        fr: 'DrymaxX imperméable et respirant',
        it: 'DrymaxX impermeabile e traspirante',
        nl: 'DrymaxX waterdicht & ademend',
      }),
    },
    {
      icon: Mountain,
      label: pick({
        en: 'Shells, layers & winter footwear',
        fi: 'Kuoritakit, kerrokset ja talvijalkineet',
        de: 'Shells, Lagen & Winterschuhe',
        ja: 'シェル・レイヤー・冬靴',
        es: 'Shells, capas y calzado de invierno',
        'pt-BR': 'Shells, camadas e calçado de inverno',
        'zh-CN': '冲锋衣、内层与冬靴',
        ko: '셸·레이어·겨울 신발',
        fr: 'Shells, couches et chaussures d’hiver',
        it: 'Shell, strati e calzature invernali',
        nl: 'Shells, lagen & winterschoenen',
      }),
    },
  ]

  // Evergreen positioning chip (NOT a sale/%, never stale).
  const chip = pick({
    en: 'Built for real arctic weather',
    fi: 'Tehty aitoon arktiseen säähän',
    de: 'Für echtes arktisches Wetter gemacht',
    ja: '本物の極北の天候のために',
    es: 'Hecho para el clima ártico de verdad',
    'pt-BR': 'Feito para o clima ártico de verdade',
    'zh-CN': '为真正的极地天气而生',
    ko: '진짜 북극 날씨를 위한 설계',
    fr: 'Conçu pour le vrai climat arctique',
    it: 'Pensato per il vero clima artico',
    nl: 'Gemaakt voor echt arctisch weer',
  })

  const cta = pick({
    en: 'Shop Halti', fi: 'Tutustu Haltiin', de: 'Halti entdecken',
    ja: 'Halti を見る', es: 'Ver Halti', 'pt-BR': 'Ver a Halti',
    'zh-CN': '选购 Halti', ko: 'Halti 둘러보기', fr: 'Découvrir Halti',
    it: 'Scopri Halti', nl: 'Bekijk Halti',
  })

  const poweredBy = pick({
    en: 'Sold by Halti', fi: 'Myynti: Halti', de: 'Verkauf durch Halti',
    ja: '販売：Halti', es: 'Vendido por Halti', 'pt-BR': 'Vendido pela Halti',
    'zh-CN': '由 Halti 销售', ko: 'Halti 판매', fr: 'Vendu par Halti',
    it: 'Venduto da Halti', nl: 'Verkocht door Halti',
  })

  return (
    <section
      ref={rootRef}
      data-anim={animState}
      className={`ln-halti-ad group/ad relative overflow-hidden rounded-3xl bg-white text-stone-900 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.5)] ring-1 ring-stone-900/10 ${className}`}
      style={{ borderTop: `4px solid ${HALTI_VOLT}` }}
      aria-label={headline}
    >
      <style>{`
        .ln-halti-ad[data-anim='pending'] .ln-rise { opacity: 0; transform: translateY(14px); }
        .ln-halti-ad[data-anim='in'] .ln-rise {
          opacity: 1; transform: none;
          transition: opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1);
        }
        .ln-halti-ad[data-anim='in'] .ln-rise-1 { transition-delay: .05s; }
        .ln-halti-ad[data-anim='in'] .ln-rise-2 { transition-delay: .13s; }
        .ln-halti-ad[data-anim='in'] .ln-rise-3 { transition-delay: .21s; }

        .ln-halti-ad[data-anim='pending'] .ln-stage { opacity: 0; transform: scale(.96); }
        .ln-halti-ad[data-anim='in'] .ln-stage {
          opacity: 1; transform: scale(1);
          transition: opacity .7s ease, transform .9s cubic-bezier(.22,.61,.36,1);
        }

        .ln-halti-ad .ln-shimmer {
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%);
          transform: translateX(-120%);
          opacity: 0;
        }
        .ln-halti-ad[data-anim='in'] .ln-shimmer {
          opacity: 1;
          animation: ln-halti-shimmer 6.5s ease-in-out 1.1s infinite;
        }
        @keyframes ln-halti-shimmer {
          0% { transform: translateX(-120%); }
          22%,100% { transform: translateX(120%); }
        }

        .ln-halti-ad .ln-snow {
          position: absolute; top: -8%; border-radius: 9999px;
          background: #fff; opacity: 0; will-change: transform;
        }
        .ln-halti-ad[data-anim='in'] .ln-snow { animation: ln-halti-fall linear infinite; }
        @keyframes ln-halti-fall {
          0%   { transform: translate3d(0,-10%,0); opacity: 0; }
          12%  { opacity: .8; }
          88%  { opacity: .75; }
          100% { transform: translate3d(var(--dx,6px),360px,0); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ln-halti-ad .ln-rise,
          .ln-halti-ad .ln-stage { opacity: 1 !important; transform: none !important; transition: none !important; }
          .ln-halti-ad .ln-shimmer,
          .ln-halti-ad .ln-snow { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      {/* Soft volt wash, top-right — Halti accent on the crisp white card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(196,214,0,0.20), transparent)' }}
      />

      <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── Copy column ─────────────────────────────────────────────── */}
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="ln-rise ln-rise-1 mb-5 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <span
                className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ backgroundColor: 'rgba(11,11,12,0.08)', color: HALTI_INK }}
              >
                {adLabel}
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: HALTI_INK }}>
                {eyebrow}
              </p>
            </div>
            <img
              src={HALTI.logo}
              alt="Halti"
              width={104}
              height={35}
              loading="lazy"
              decoding="async"
              className="h-5 w-auto shrink-0 sm:h-6"
            />
          </div>

          <h2 className="ln-rise ln-rise-1 mb-3 max-w-xl text-2xl font-bold leading-tight text-stone-900 sm:text-3xl [text-wrap:balance]">
            {headline}
          </h2>
          <p className="ln-rise ln-rise-2 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
            {sub}
          </p>

          <ul className="ln-rise ln-rise-2 mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm text-stone-700">
                <t.icon className="h-4 w-4 shrink-0" style={{ color: HALTI_INK }} aria-hidden="true" />
                <span>{t.label}</span>
              </li>
            ))}
          </ul>

          <div
            className="ln-rise ln-rise-3 mt-6 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold"
            style={{ backgroundColor: HALTI_VOLT, color: HALTI_INK }}
          >
            <Snowflake className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{chip}</span>
          </div>

          <div className="ln-rise ln-rise-3 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              onClick={() => trackAffiliateClick(HALTI.slug, `outdoor_gear:${sid}`, href)}
              className="group/cta inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-4 font-semibold text-white no-underline shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: HALTI_INK, boxShadow: '0 14px 30px -12px rgba(11,11,12,0.55)' }}
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

        {/* ── Brand illustration stage (logo + volt gradient, no fake product photos) ── */}
        <div
          aria-hidden="true"
          className="relative min-h-[15rem] overflow-hidden lg:min-h-full"
          style={{ background: 'linear-gradient(155deg, #F4F6E8 0%, #EAF0D2 55%, #E4ECC2 100%)' }}
        >
          <div className="pointer-events-none absolute inset-0">
            {SNOW.map((s, i) => (
              <span
                key={i}
                className="ln-snow"
                style={{
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  // @ts-expect-error CSS custom property
                  '--dx': s.dx,
                  animationDuration: s.dur,
                  animationDelay: s.delay,
                  opacity: s.op,
                }}
              />
            ))}
          </div>

          <div className="ln-stage relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
            <div className="relative overflow-hidden rounded-2xl bg-white px-8 py-6 shadow-[0_18px_45px_-18px_rgba(11,11,12,0.45)] ring-1 ring-stone-900/5">
              <img
                src={HALTI.logo}
                alt=""
                width={300}
                height={100}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto sm:h-11"
              />
              <div className="ln-shimmer pointer-events-none absolute inset-0" />
            </div>
            <span
              className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ backgroundColor: HALTI_VOLT, color: HALTI_INK }}
            >
              DrymaxX
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Pre-baked snow specks for the stage (deterministic, no runtime random). */
const SNOW: { left: string; size: string; dx: string; dur: string; delay: string; op: number }[] = [
  { left: '12%', size: '5px', dx: '9px', dur: '7.8s', delay: '0s', op: 0.8 },
  { left: '28%', size: '4px', dx: '-7px', dur: '9.2s', delay: '1.1s', op: 0.65 },
  { left: '44%', size: '6px', dx: '6px', dur: '8.2s', delay: '0.6s', op: 0.8 },
  { left: '60%', size: '3px', dx: '11px', dur: '10.2s', delay: '2.0s', op: 0.55 },
  { left: '74%', size: '5px', dx: '-9px', dur: '8.6s', delay: '1.5s', op: 0.75 },
  { left: '88%', size: '4px', dx: '7px', dur: '9.6s', delay: '0.9s', op: 0.65 },
]
