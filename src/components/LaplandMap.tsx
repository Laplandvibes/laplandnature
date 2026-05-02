import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type PinKind = 'park' | 'aurora' | 'trail' | 'wildlife'

interface Pin {
  name: string
  lat: number
  lng: number
  kind: PinKind
  note: string
  href: string
}

const pins: Pin[] = [
  // National parks (5)
  { name: 'Urho Kekkonen NP', lat: 68.40, lng: 27.70, kind: 'park', note: "Finland's 2nd largest park · gateway: Saariselkä", href: '/national-parks' },
  { name: 'Pallas-Yllästunturi NP', lat: 68.05, lng: 24.05, kind: 'park', note: '55 km Hetta–Pallas trail · gateway: Muonio', href: '/national-parks' },
  { name: 'Lemmenjoki NP', lat: 68.70, lng: 25.85, kind: 'park', note: "Europe's largest roadless area · gold-panning · Inari", href: '/national-parks' },
  { name: 'Riisitunturi NP', lat: 66.20, lng: 28.50, kind: 'park', note: 'Tykky snow-crowned trees · gateway: Posio', href: '/national-parks' },
  { name: 'Pyhä-Luosto NP', lat: 67.05, lng: 27.20, kind: 'park', note: '400-year-old spruces · amethyst mine', href: '/national-parks' },

  // Aurora viewing spots (4)
  { name: 'Inari', lat: 68.91, lng: 27.03, kind: 'aurora', note: 'Sami heartland · Bortle 2 · open lake horizon', href: '/northern-lights' },
  { name: 'Utsjoki', lat: 69.91, lng: 27.03, kind: 'aurora', note: '4 of 5 clear nights show aurora during peak · 51-day kaamos', href: '/northern-lights' },
  { name: 'Kilpisjärvi', lat: 69.05, lng: 20.79, kind: 'aurora', note: 'Three-country corner · high-altitude fells', href: '/northern-lights' },
  { name: 'Enontekiö', lat: 68.39, lng: 23.63, kind: 'aurora', note: 'Some of the darkest skies in Europe (Bortle 1)', href: '/northern-lights' },

  // Hiking trailheads (4)
  { name: 'Hetta', lat: 68.39, lng: 23.63, kind: 'trail', note: 'North end of the 55 km Hetta–Pallas trail', href: '/hiking-trails' },
  { name: 'Ruka / Oulanka', lat: 66.15, lng: 29.10, kind: 'trail', note: '82 km Karhunkierros · suspension bridges + canyons', href: '/hiking-trails' },
  { name: 'Kilpisjärvi (Halti)', lat: 69.05, lng: 20.79, kind: 'trail', note: "55 km round-trip to Halti, Finland's highest point (1,324 m)", href: '/hiking-trails' },
  { name: 'Pyhä', lat: 67.02, lng: 27.18, kind: 'trail', note: 'Pyhäkuru gorge · accessible boardwalk · 5 km', href: '/hiking-trails' },

  // Wildlife observation (3)
  { name: 'Kuusamo bear hides', lat: 65.97, lng: 29.18, kind: 'wildlife', note: 'Brown-bear hides · 99% sighting rate · May–Sept', href: '/wildlife' },
  { name: 'Nellim wilderness', lat: 68.85, lng: 28.31, kind: 'wildlife', note: 'Nellim wilderness lodge · wolverine + brown bear range', href: '/wildlife' },
  { name: 'Kaamanen reindeer', lat: 69.13, lng: 27.21, kind: 'wildlife', note: 'Sami reindeer round-up · autumn (paliskunta)', href: '/wildlife' },
]

// Pin colours (hex without # because we paint via SVG fill).
const pinColor: Record<PinKind, string> = {
  park: '#10B981',     // aurora-green
  aurora: '#A78BFA',   // aurora purple
  trail: '#06B6D4',    // arctic-cyan
  wildlife: '#F59E0B', // amber
}

const pinLabel: Record<PinKind, string> = {
  park: 'National park',
  aurora: 'Aurora viewing',
  trail: 'Trailhead',
  wildlife: 'Wildlife',
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

export default function LaplandMap() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // Initial view ~ Sodankylä centre — fits all of Finnish Lapland comfortably
    const map = L.map(ref.current, {
      center: [67.6, 26.5],
      zoom: 6,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    pins.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p.kind) }).addTo(map)
      const popup = `
        <div style="min-width:200px;font-family:'DM Sans',system-ui,sans-serif">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${pinColor[p.kind]};margin-bottom:4px">${pinLabel[p.kind]}</div>
          <div style="font-family:'Bebas Neue',Impact,sans-serif;font-size:18px;letter-spacing:0.04em;color:#0F172A;margin-bottom:6px">${p.name}</div>
          <div style="font-size:13px;color:#374151;line-height:1.45;margin-bottom:8px">${p.note}</div>
          <a href="${p.href}" style="display:inline-block;font-size:12px;font-weight:600;color:#EC4899;text-decoration:none">Open guide →</a>
        </div>`
      marker.bindPopup(popup)
    })

    return () => {
      map.remove()
    }
  }, [])

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
