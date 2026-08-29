import { useCallback, useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLang, langPrefix } from '../i18n/useLang'
import { COPY } from '../locales/copy'

type PinKind = 'park' | 'aurora' | 'trail' | 'wildlife'

// Geometry + routing only. The localized name + note for each entry come from
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

/**
 * Three of the sixteen entries share a village with another entry: Kilpisjärvi
 * is both an aurora spot and the Halti trailhead, Hetta IS Enontekiö's church
 * village, and Pyhä is both the national park and the gorge trail. Drawn as
 * separate markers they landed exactly on top of each other and whichever one
 * was underneath could not be clicked at all. Entries within 7 km now share one
 * numbered marker whose popup lists every entry at that spot — nothing is
 * hidden, and no coordinate has to be nudged away from the real village to pull
 * the pins apart.
 */
const SAME_PLACE_M = 7000

interface Place {
  lat: number
  lng: number
  kind: PinKind
  entries: number[]
}

const places: Place[] = []
/** entry index (0..15) → index of the marker it lives on. */
const placeOfEntry: number[] = []

pinGeo.forEach((p, i) => {
  const hit = places.findIndex(
    (q) => L.latLng(q.lat, q.lng).distanceTo([p.lat, p.lng]) <= SAME_PLACE_M,
  )
  if (hit >= 0) {
    places[hit].entries.push(i)
    placeOfEntry[i] = hit
  } else {
    places.push({ lat: p.lat, lng: p.lng, kind: p.kind, entries: [i] })
    placeOfEntry[i] = places.length - 1
  }
})

const PIN_BOUNDS = L.latLngBounds(pinGeo.map((p) => [p.lat, p.lng] as [number, number]))

/**
 * Pan fence. The old map had none and opened at a fixed zoom 6 centred on
 * Sodankylä, which on a 1150 px-wide container put Murmansk and Arkhangelsk in
 * frame and let the reader drag off to the White Sea. The fence is the pin
 * extent plus roughly 150 km of context in every direction.
 */
const MAX_BOUNDS = L.latLngBounds([64.4, 16.0], [71.4, 34.0])
const FIT_PADDING: L.PointExpression = [34, 34]
/** Zoom used when the reader picks a single place — close enough that the tile
 *  layer itself renders the Finnish village and lake names around it. */
const FOCUS_ZOOM = 9.5

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

function makeIcon(kind: PinKind, n: number, active: boolean) {
  const colour = pinColor[kind]
  const w = active ? 40 : 32
  const h = active ? 52 : 42
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="${w}" height="${h}">
      <path d="M16 2 C8 2 2 8 2 16 c0 9 14 24 14 24 s14-15 14-24 C30 8 24 2 16 2 z" fill="${colour}" stroke="${active ? '#EC4899' : '#0F172A'}" stroke-width="${active ? 2.6 : 1.4}"/>
      <circle cx="16" cy="15.6" r="8.2" fill="#F9FAFB"/>
      <text x="16" y="19.8" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#0F172A">${n}</text>
    </svg>`
  return L.divIcon({
    className: 'lv-pin',
    html: svg,
    iconSize: [w, h],
    iconAnchor: [w / 2, h - 2],
    popupAnchor: [0, -(h - 6)],
    tooltipAnchor: [w / 2 - 4, -(h / 2)],
  })
}

/** Toggle a marker's name label. See the `is-shown` rule in index.css for why
 *  this is a class and not the tooltip's own `opacity` option. */
function showLabel(marker: L.Marker, on: boolean) {
  marker.getTooltip()?.getElement()?.classList.toggle('is-shown', on)
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
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [active, setActive] = useState<number | null>(null)
  // Mirror of `active` for the Leaflet event handlers, which are bound once and
  // would otherwise close over the value it had when the map was built.
  const activeRef = useRef<number | null>(null)
  const lang = useLang()

  const map = COPY[lang].map
  const pinLabel = map.legend
  const resetLabel = map.resetView ?? COPY.en.map.resetView ?? 'Show all'

  useEffect(() => {
    if (!ref.current) return
    const prefix = langPrefix(lang)

    const lmap = L.map(ref.current, {
      center: PIN_BOUNDS.getCenter(),
      zoom: 6,
      minZoom: 5,
      maxZoom: 12,
      // Quarter-step zoom so fitBounds is not forced down to the next whole
      // level — at this latitude the pin extent lands between 6 and 7, and
      // rounding down was throwing away a quarter of the usable scale.
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      maxBounds: MAX_BOUNDS,
      maxBoundsViscosity: 0.85,
      scrollWheelZoom: false,
      // One-finger drag on a phone should scroll the page, not pan the map.
      // The place list below does everything panning would have done.
      dragging: !L.Browser.mobile,
      zoomControl: true,
      attributionControl: true,
    })
    mapRef.current = lmap

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 5,
      maxZoom: 12,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(lmap)

    markersRef.current = places.map((place, pi) => {
      const marker = L.marker([place.lat, place.lng], {
        icon: makeIcon(place.kind, pi + 1, false),
        keyboard: false,
      }).addTo(lmap)

      const rows = place.entries
        .map((i) => {
          const text = map.pins[i] ?? COPY.en.map.pins[i]
          const kind = pinGeo[i].kind
          const href = `${prefix}${pinGeo[i].href}`
          return `
            <div style="padding-top:8px">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${pinColor[kind]};margin-bottom:4px">${esc(pinLabel[kind])}</div>
              <div style="font-family:'Bebas Neue',Impact,sans-serif;font-size:18px;letter-spacing:0.04em;color:#0F172A;margin-bottom:6px">${esc(text.name)}</div>
              <div style="font-size:13px;color:#374151;line-height:1.45;margin-bottom:8px">${esc(text.note)}</div>
              <a href="${esc(href)}" style="display:inline-block;font-size:12px;font-weight:600;color:#EC4899;text-decoration:none">${esc(map.openGuide)}</a>
            </div>`
        })
        .join('<hr style="border:0;border-top:1px solid rgba(15,23,42,0.12);margin:10px 0 0" />')

      marker.bindPopup(
        `<div style="min-width:210px;font-family:'DM Sans',system-ui,sans-serif">${rows}</div>`,
      )

      // Name label for the place, shown only while this pin is hovered or
      // selected (see the `is-shown` rule in index.css). Thirteen of them at
      // once overlapped each other on desktop and ran off the map edge on a
      // phone; the list beside the map is what carries the names permanently.
      const firstName = (map.pins[place.entries[0]] ?? COPY.en.map.pins[place.entries[0]]).name
      marker.bindTooltip(firstName, {
        permanent: true,
        direction: 'right',
        className: 'lv-map-label',
        opacity: 1,
      })

      marker.on('click', () => setActive(pi))
      marker.on('mouseover', () => showLabel(marker, true))
      marker.on('mouseout', () => showLabel(marker, activeRef.current === pi))
      return marker
    })

    lmap.on('popupclose', () => setActive(null))

    lmap.fitBounds(PIN_BOUNDS, { padding: FIT_PADDING })

    // The container is responsive; Leaflet needs telling when its box changes,
    // and the fitted view has to be recomputed or the pins drift off-frame.
    const ro = new ResizeObserver(() => {
      lmap.invalidateSize({ animate: false })
    })
    ro.observe(ref.current)

    return () => {
      ro.disconnect()
      lmap.remove()
      mapRef.current = null
      markersRef.current = []
    }
  }, [lang, map, pinLabel])

  // Icon + label swap for the selected marker, kept out of the build effect so
  // selecting a place does not tear down and rebuild the whole map.
  useEffect(() => {
    activeRef.current = active
    markersRef.current.forEach((marker, pi) => {
      const on = active === pi
      marker.setIcon(makeIcon(places[pi].kind, pi + 1, on))
      marker.setZIndexOffset(on ? 1000 : 0)
      showLabel(marker, on)
    })
  }, [active])

  const focusPlace = useCallback((pi: number) => {
    const lmap = mapRef.current
    const marker = markersRef.current[pi]
    if (!lmap || !marker) return
    setActive(pi)
    const target = marker.getLatLng()
    if (prefersReducedMotion()) lmap.setView(target, FOCUS_ZOOM)
    else lmap.flyTo(target, FOCUS_ZOOM, { duration: 0.7 })
    marker.openPopup()
  }, [])

  const resetView = useCallback(() => {
    const lmap = mapRef.current
    if (!lmap) return
    setActive(null)
    lmap.closePopup()
    lmap.fitBounds(PIN_BOUNDS, { padding: FIT_PADDING, animate: !prefersReducedMotion() })
  }, [])

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="relative">
          <div
            ref={ref}
            className="w-full h-[400px] sm:h-[460px] lg:h-[560px] rounded-2xl overflow-hidden border border-deep-night/10 shadow-md"
            style={{ background: '#dbe7d4' }}
          />
          {/* z above Leaflet's own panes (markers sit at 600, controls at 800)
              so a pin near the top-right corner cannot cover the control. */}
          <button
            type="button"
            onClick={resetView}
            className="absolute top-3 right-3 z-[1000] min-h-[44px] sm:min-h-0 bg-snow/95 hover:bg-snow text-deep-night text-xs font-semibold px-4 py-3 sm:py-2 rounded-full border border-deep-night/15 shadow-sm transition-colors"
          >
            {resetLabel}
          </button>
        </div>

        {/* The place list is the map's other half, not a decoration: at the zoom
            that fits all sixteen pins the tile layer shows no village names at
            all, so without this the reader had a green blob with unlabelled
            pins on it. */}
        <ol className="lg:max-h-[560px] lg:overflow-y-auto rounded-2xl border border-deep-night/10 bg-snow divide-y divide-deep-night/8">
          {pinGeo.map((p, i) => {
            const text = map.pins[i] ?? COPY.en.map.pins[i]
            const pi = placeOfEntry[i]
            const isActive = active === pi
            return (
              <li key={`${p.href}-${i}`}>
                <button
                  type="button"
                  onClick={() => focusPlace(pi)}
                  aria-pressed={isActive}
                  className={`w-full text-left flex gap-3 px-4 py-3 transition-colors ${
                    isActive ? 'bg-aurora-green/10' : 'hover:bg-deep-night/[0.04]'
                  }`}
                >
                  <span
                    className="shrink-0 mt-0.5 w-6 h-6 rounded-full grid place-items-center text-[11px] font-bold text-deep-night border border-deep-night/20"
                    style={{ background: pinColor[p.kind] }}
                    aria-hidden="true"
                  >
                    {pi + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-lg text-deep-night tracking-wide leading-tight">
                      {text.name}
                    </span>
                    <span className="block text-[13px] text-deep-night/65 leading-snug mt-0.5">
                      {text.note}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

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
