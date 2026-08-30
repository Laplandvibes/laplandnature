import { Tent } from 'lucide-react'
import type { AdSpec } from '../AdUnit'

// Scandinavian Outdoor — Finnish outdoor retailer, wide Nordic brand selection.
// what-to-pack / nature / skiresorts / activities / gifts slot. Adtraction
// deep-link. Logo: _affiliate/logos/adtraction-scandinavian-outdoor.png
// → public/images/partners/scandinavianoutdoor.png.
const scandinavianOutdoor: AdSpec = {
  key: 'scandinavianoutdoor',
  brand: 'Scandinavian Outdoor',
  logo: '/images/partners/scandinavianoutdoor.png',
  // dest= on pakollinen: ilman sitä Adtraction-tracking pudottaa kävijän
  // scandinavianoutdoor.fi-etusivulle. Worker (handleAdtraction) kääri
  // dest:in tracking-linkin &url=-parametriin, joten dest = kohdesivun täysi
  // URL kauppiaan omalla domainilla. Kategoria = talviretkeily (lumikengät,
  // ahkiot, lumiturvallisuus) — vastaa mainoscopyn lupausta "kerrastoista
  // lumikenkiin". Kieliversiot asuvat ERI domaineilla (.com/.se/.de/.fr/
  // .dk/.pl, sivun hreflang), mutta /go/scandinavianoutdoor-ohjelman
  // tracking-domain on to.scandinavianoutdoor.fi ja ohjelmatunnus ratkaisee
  // kumpi kauppa hyvittää komission (vrt. halti/halticom), joten dest pysyy
  // .fi-kaupassa kaikilla kielillä. Polku verifioitu livenä 2026-08-14:
  // HTTP 200, <title> "Talviretkeily - Scandinavian Outdoor", <h1>
  // "Talviretkeily" ja lumikenkätuotteet leipätekstissä.
  linkFor: (sid) =>
    `https://go.laplandvibes.com/go/scandinavianoutdoor?sid=${encodeURIComponent(sid)}&dest=${encodeURIComponent('https://scandinavianoutdoor.fi/talvilajit/talviretkeily/')}`,
  accent: '#15803D',
  accentDark: '#166534',
  icon: Tent,
  copy: {
    fi: {
      eyebrow: 'Retkivarusteet',
      headline: 'Scandinavian Outdoor, pohjoismaiset ulkoilumerkit yhdestä kaupasta',
      sub: 'Suomalainen ulkoilukauppa, josta löytyvät tunnetut pohjoismaiset merkit samasta paikasta: kerrastoista lumikenkiin ja makuupusseista otsalamppuihin. Tarkat tuotetiedot auttavat valitsemaan oikean lämpöluokan ennen pohjoisen reissua.',
      trust: ['Pohjoismaiset merkit koossa', 'Kerrastoista lumikenkiin', 'Suomalainen kauppa'],
      cta: 'Selaa valikoimaa',
      poweredBy: 'Varusteet Scandinavian Outdoorilta',
    },
    en: {
      eyebrow: 'Expedition gear',
      headline: 'Scandinavian Outdoor, the Nordic outdoor brands in one shop',
      sub: 'A Finnish outdoor retailer carrying the well-known Nordic brands in one place: from base layers to snowshoes, sleeping bags to headlamps. Detailed product specs help you pick the right warmth rating before heading north.',
      trust: ['Nordic brands together', 'Base layers to snowshoes', 'Finnish retailer'],
      cta: 'Browse the range',
      poweredBy: 'Gear from Scandinavian Outdoor',
    },
    de: {
      eyebrow: 'Touren-Ausrüstung',
      headline: 'Scandinavian Outdoor, die nordischen Outdoor-Marken in einem Shop',
      sub: 'Ein finnischer Outdoor-Händler mit den bekannten nordischen Marken an einem Ort: von Funktionswäsche bis Schneeschuhen, von Schlafsäcken bis Stirnlampen. Genaue Produktdaten helfen, vor der Nordreise die richtige Wärmeklasse zu wählen.',
      trust: ['Nordische Marken vereint', 'Von Wäsche bis Schneeschuh', 'Finnischer Händler'],
      cta: 'Sortiment ansehen',
      poweredBy: 'Ausrüstung von Scandinavian Outdoor',
    },
    ja: {
      eyebrow: '遠征装備',
      headline: 'Scandinavian Outdoor：北欧のアウトドアブランドをひとつの店で',
      sub: '北欧の有名ブランドがひとつに揃うフィンランドのアウトドアショップ。ベースレイヤーからスノーシュー、寝袋からヘッドランプまで。詳しい製品仕様で、北へ発つ前に適切な保温クラスを選べます。',
      trust: ['北欧ブランドが集結', 'インナーからスノーシューまで', 'フィンランドのショップ'],
      cta: '品揃えを見る',
      poweredBy: '装備はScandinavian Outdoorから',
    },
    es: {
      eyebrow: 'Equipo de expedición',
      headline: 'Scandinavian Outdoor, las marcas outdoor nórdicas en una sola tienda',
      sub: 'Tienda finlandesa de outdoor con las marcas nórdicas conocidas en un solo lugar: de capas térmicas a raquetas de nieve, de sacos de dormir a frontales. Las fichas de producto detalladas ayudan a elegir el nivel de abrigo correcto antes de subir al norte.',
      trust: ['Marcas nórdicas juntas', 'De térmicas a raquetas', 'Tienda finlandesa'],
      cta: 'Ver el catálogo',
      poweredBy: 'Equipo de Scandinavian Outdoor',
    },
    'pt-BR': {
      eyebrow: 'Equipamento de expedição',
      headline: 'Scandinavian Outdoor, as marcas outdoor nórdicas em uma loja só',
      sub: 'Loja finlandesa de outdoor com as marcas nórdicas conhecidas em um lugar só: de segunda pele a raquetes de neve, de sacos de dormir a lanternas de cabeça. Fichas de produto detalhadas ajudam a escolher o nível de aquecimento certo antes de ir para o norte.',
      trust: ['Marcas nórdicas reunidas', 'De térmicas a raquetes', 'Loja finlandesa'],
      cta: 'Ver a seleção',
      poweredBy: 'Equipamento da Scandinavian Outdoor',
    },
    'zh-CN': {
      eyebrow: '远征装备',
      headline: 'Scandinavian Outdoor：北欧户外品牌，一家店集齐',
      sub: '芬兰户外装备店，北欧知名品牌一站购齐：从保暖内层到雪鞋，从睡袋到头灯。详尽的产品参数帮你在北上之前选对保暖等级。',
      trust: ['北欧品牌齐聚', '内层到雪鞋都有', '芬兰本土商店'],
      cta: '浏览商品',
      poweredBy: '装备来自 Scandinavian Outdoor',
    },
    ko: {
      eyebrow: '원정 장비',
      headline: 'Scandinavian Outdoor: 북유럽 아웃도어 브랜드를 한곳에서',
      sub: '유명 북유럽 브랜드를 한자리에 모은 핀란드 아웃도어 매장: 베이스레이어부터 스노슈즈, 침낭부터 헤드램프까지. 상세한 제품 스펙으로 북쪽으로 떠나기 전에 알맞은 보온 등급을 고를 수 있습니다.',
      trust: ['북유럽 브랜드 총집합', '베이스레이어부터 스노슈즈', '핀란드 매장'],
      cta: '제품 둘러보기',
      poweredBy: 'Scandinavian Outdoor의 장비',
    },
    fr: {
      eyebrow: 'Équipement d’expédition',
      headline: 'Scandinavian Outdoor, les marques outdoor nordiques dans une seule boutique',
      sub: 'Un détaillant outdoor finlandais qui réunit les grandes marques nordiques: des sous-couches aux raquettes, des sacs de couchage aux lampes frontales. Les fiches produits détaillées aident à choisir le bon niveau de chaleur avant de monter au nord.',
      trust: ['Marques nordiques réunies', 'Des sous-couches aux raquettes', 'Boutique finlandaise'],
      cta: 'Parcourir la gamme',
      poweredBy: 'Équipement Scandinavian Outdoor',
    },
    it: {
      eyebrow: 'Attrezzatura da spedizione',
      headline: 'Scandinavian Outdoor, i marchi outdoor nordici in un unico negozio',
      sub: 'Rivenditore outdoor finlandese con i marchi nordici più noti in un posto solo: dagli strati base alle ciaspole, dai sacchi a pelo alle lampade frontali. Le schede prodotto dettagliate aiutano a scegliere la classe termica giusta prima di salire a nord.',
      trust: ['Marchi nordici riuniti', 'Da strati base a ciaspole', 'Negozio finlandese'],
      cta: 'Sfoglia la gamma',
      poweredBy: 'Attrezzatura Scandinavian Outdoor',
    },
    nl: {
      eyebrow: 'Expeditie-uitrusting',
      headline: 'Scandinavian Outdoor, de Noordse outdoormerken in één winkel',
      sub: 'Een Finse outdoorwinkel met de bekende Noordse merken op één plek: van baselayers tot sneeuwschoenen, van slaapzakken tot hoofdlampen. Gedetailleerde productspecificaties helpen u vóór de reis de juiste warmteklasse te kiezen.',
      trust: ['Noordse merken bijeen', 'Baselayers tot sneeuwschoenen', 'Finse winkel'],
      cta: 'Bekijk het assortiment',
      poweredBy: 'Uitrusting van Scandinavian Outdoor',
    },
    sv: {
      eyebrow: 'Expeditionsutrustning',
      headline: 'Scandinavian Outdoor, de nordiska friluftsmärkena i en butik',
      sub: 'En finsk friluftshandlare med de kända nordiska märkena samlade på ett ställe: från underställ till snöskor, sovsäckar till pannlampor. Detaljerade produktspecifikationer hjälper dig välja rätt värmeklass innan du åker norrut.',
      trust: ['Nordiska märken samlade', 'Från underställ till snöskor', 'Finsk handlare'],
      cta: 'Bläddra i sortimentet',
      poweredBy: 'Utrustning från Scandinavian Outdoor',
    },
  },
}

export default scandinavianOutdoor
