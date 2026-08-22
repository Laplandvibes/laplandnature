import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLang, langPrefix } from '../i18n/useLang'
import { COPY } from '../locales/copy'

type PinKind = 'park' | 'aurora' | 'trail' | 'wildlife'

// Geometry + routing only. The localized name + note for each pin come from
// COPY[lang].map.pins, matched 1:1 by array index (see src/locales/copy.ts).
// Keep this order in sync with the `pins` arrays in copy.ts / overrides.ts.
interface PinGeo {
  lat: number
  lng: number
  kind: PinKind
  href: string
}

const pinGeo: PinGeo[] = [
  // National parks (5)
  { lat: 68.40, lng: 27.70, kind: 'park', href: '/national-parks' },
  { lat: 68.05, lng: 24.05, kind: 'park', href: '/national-parks' },
  { lat: 68.70, lng: 25.85, kind: 'park', href: '/national-parks' },
  { lat: 66.20, lng: 28.50, kind: 'park', href: '/national-parks' },
  { lat: 67.05, lng: 27.20, kind: 'park', href: '/national-parks' },

  // Aurora viewing spots (4)
  { lat: 68.91, lng: 27.03, kind: 'aurora', href: '/northern-lights' },
  { lat: 69.91, lng: 27.03, kind: 'aurora', href: '/northern-lights' },
  { lat: 69.05, lng: 20.79, kind: 'aurora', href: '/northern-lights' },
  { lat: 68.39, lng: 23.63, kind: 'aurora', href: '/northern-lights' },

  // Hiking trailheads (4)
  { lat: 68.39, lng: 23.63, kind: 'trail', href: '/hiking-trails' },
  { lat: 66.15, lng: 29.10, kind: 'trail', href: '/hiking-trails' },
  { lat: 69.05, lng: 20.79, kind: 'trail', href: '/hiking-trails' },
  { lat: 67.02, lng: 27.18, kind: 'trail', href: '/hiking-trails' },

  // Wildlife observation (3)
  { lat: 65.97, lng: 29.18, kind: 'wildlife', href: '/wildlife' },
  { lat: 68.85, lng: 28.31, kind: 'wildlife', href: '/wildlife' },
  { lat: 69.13, lng: 27.21, kind: 'wildlife', href: '/wildlife' },
]

// Pin colours (hex without # because we paint via SVG fill).
const pinColor: Record<PinKind, string> = {
  park: '#10B981',     // aurora-green
  aurora: '#A78BFA',   // aurora purple
  trail: '#06B6D4',    // arctic-cyan
  wildlife: '#F59E0B', // amber
}

function makeIcon(kind: PinKind) {
  const colour = pinColor[kind]
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <path d="M16 2 C8 2 2 8 2 16 c0 9 14 24 14 24 s14-15 14-24 C30 8 24 2 16 2 z" fill="${colour}" stroke="#0F172A" stroke-width="1.4"/>
      <circle cx="16" cy="16" r="5" fill="#F9FAFB"/>
    </svg>`
  return L.divIcon({
    className: 'lv-pin',
    html: svg,
    iconSize: [32, 42],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
  })
}

// Escape user-facing strings before injecting into the Leaflet popup HTML.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default function LaplandMap() {
  const ref = useRef<HTMLDivElement>(null)
  const lang = useLang()

  const map = COPY[lang].map
  const pinLabel = map.legend

  useEffect(() => {
    if (!ref.current) return
    const prefix = langPrefix(lang)
    // Initial view ~ Sodankylä centre — fits all of Finnish Lapland comfortably
    const lmap = L.map(ref.current, {
      center: [67.6, 26.5],
      zoom: 6,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(lmap)

    pinGeo.forEach((p, i) => {
      // Localized name + note keyed by index; fall back to en if a locale is short.
      const text = map.pins[i] ?? COPY.en.map.pins[i]
      const label = pinLabel[p.kind]
      const href = `${prefix}${p.href}`
      const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p.kind) }).addTo(lmap)
      const popup = `
        <div style="min-width:200px;font-family:'DM Sans',system-ui,sans-serif">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${pinColor[p.kind]};margin-bottom:4px">${esc(label)}</div>
          <div style="font-family:'Bebas Neue',Impact,sans-serif;font-size:18px;letter-spacing:0.04em;color:#0F172A;margin-bottom:6px">${esc(text.name)}</div>
          <div style="font-size:13px;color:#374151;line-height:1.45;margin-bottom:8px">${esc(text.note)}</div>
          <a href="${esc(href)}" style="display:inline-block;font-size:12px;font-weight:600;color:#EC4899;text-decoration:none">${esc(map.openGuide)}</a>
        </div>`
      marker.bindPopup(popup)
    })

    return () => {
      lmap.remove()
    }
  }, [lang, map, pinLabel])

  return (
    <div className="relative">
      <div
        ref={ref}
        className="w-full rounded-2xl overflow-hidden border border-deep-night/10 shadow-md"
        style={{ height: '520px', background: '#dbe7d4' }}
      />
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
        {(Object.keys(pinColor) as PinKind[]).map((k) => (
          <div key={k} className="inline-flex items-center gap-2 text-deep-night/75">
            <span className="w-3 h-3 rounded-full border border-deep-night/30" style={{ background: pinColor[k] }} aria-hidden="true" />
            {pinLabel[k]}
          </div>
        ))}
      </div>
    </div>
  )
}
