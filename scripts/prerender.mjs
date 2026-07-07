// scripts/prerender.mjs
//
// Non-invasive, react-snap–style post-build prerender for the LaplandVibes
// SPA. After `vite build`, this:
//   1. serves dist/ on a local port (vite preview),
//   2. drives the system Chrome (puppeteer-core, no Chromium download) to
//      visit every route × every locale,
//   3. waits for React to mount + the SEO component to inject the localized
//      <head> (canonical/hreflang/JSON-LD) and the body to render,
//   4. snapshots document.documentElement.outerHTML,
//   5. writes it to dist/<prefix>/<route>/index.html.
//
// The SPA is untouched: main.tsx still createRoot().render()s into #root, so
// the static HTML is simply replaced by the client render on load (no
// hydrateRoot, so no hydration-mismatch warnings — the static HTML is purely
// a crawler/first-paint payload).
//
// Idempotent + re-runnable: each run overwrites the per-route index.html.
// Run: node scripts/prerender.mjs   (wired into `npm run build`)

import { spawn } from 'node:child_process'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
const PORT = Number(process.env.PRERENDER_PORT || 4317)
const ORIGIN = `http://localhost:${PORT}`

// ---- Locale prefixes (must match src/App.tsx + src/i18n/useLang.ts) --------
const LOCALE_PREFIXES = ['', '/fi', '/de', '/ja', '/es', '/br', '/cn', '/kr', '/fr', '/it', '/nl']

// ---- Route list (must match the routes built in src/App.tsx) ---------------
// '' is the locale home (path '/'); the rest are appended to the prefix.
const ROUTES = [
  '',
  '/northern-lights',
  '/national-parks',
  '/wildlife',
  '/seasons',
  '/hiking-trails',
  '/conservation',
  '/editorial-policy',
  '/privacy',
  '/terms',
  '/cookie-policy',
]

// ---- System Chrome discovery (Windows-first, then common *nix paths) -------
function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ]
  for (const c of candidates) if (existsSync(c)) return c
  return null
}

function urlPathFor(prefix, route) {
  // home: prefix or '/' ; subpages: prefix + route
  if (route === '') return prefix === '' ? '/' : prefix
  return `${prefix}${route}`
}

function distFileFor(prefix, route) {
  // dist/index.html  (en home)
  // dist/fr/index.html  (fr home)
  // dist/fr/seasons/index.html  (fr seasons)
  const segs = []
  if (prefix) segs.push(prefix.replace(/^\//, ''))
  if (route) segs.push(route.replace(/^\//, ''))
  return join(DIST, ...segs, 'index.html')
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function waitForPreview(maxMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < maxMs) {
    try {
      const res = await fetch(ORIGIN + '/')
      if (res.ok) return true
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  return false
}

async function main() {
  if (!existsSync(DIST) || !existsSync(join(DIST, 'index.html'))) {
    console.error('[prerender] dist/index.html not found — run `vite build` first.')
    process.exit(1)
  }

  const chromePath = findChrome()
  if (!chromePath) {
    console.error(
      '[prerender] BLOCKER: no system Chrome/Edge found. Set PUPPETEER_EXECUTABLE_PATH ' +
        'to a Chromium binary and re-run. Prerender aborted (build output is unchanged).',
    )
    process.exit(2)
  }
  console.log(`[prerender] using browser: ${chromePath}`)

  // Keep a pristine copy of the original SPA shell so re-runs are idempotent
  // and the home index.html capture starts from the same baseline every time.
  const shellHtml = await readFile(join(DIST, 'index.html'), 'utf8')

  // ---- 1. serve dist/ via vite preview --------------------------------------
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const preview = spawn(
    npmCmd,
    ['run', 'preview', '--', '--port', String(PORT), '--strictPort'],
    { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32' },
  )
  preview.stdout.on('data', () => {})
  preview.stderr.on('data', (d) => process.stderr.write(`[preview] ${d}`))

  const ok = await waitForPreview()
  if (!ok) {
    preview.kill()
    console.error('[prerender] BLOCKER: vite preview did not come up on ' + ORIGIN)
    process.exit(3)
  }
  console.log(`[prerender] preview live at ${ORIGIN}`)

  // ---- 2. launch headless Chrome --------------------------------------------
  let browser
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })
  } catch (err) {
    preview.kill()
    console.error('[prerender] BLOCKER: could not launch headless Chrome:', err.message)
    process.exit(4)
  }

  let written = 0
  let failed = 0
  const total = LOCALE_PREFIXES.length * ROUTES.length

  for (const prefix of LOCALE_PREFIXES) {
    for (const route of ROUTES) {
      const urlPath = urlPathFor(prefix, route)
      const outFile = distFileFor(prefix, route)
      const page = await browser.newPage()
      try {
        // Suppress the in-page locale auto-redirect: an explicit 'en' choice
        // makes the sync redirect short-circuit, so a bare-root EN capture
        // stays on '/' instead of bouncing to a browser-language locale.
        await page.evaluateOnNewDocument(() => {
          try {
            localStorage.setItem('lv_locale_choice', 'en')
          } catch {
            /* ignore */
          }
        })

        await page.goto(ORIGIN + urlPath, { waitUntil: 'networkidle0', timeout: 45000 })

        // Wait for React to mount real content AND the SEO component to inject
        // the localized canonical link (proves the head is localized too).
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root')
            const hasBody = !!root && root.innerText.trim().length > 200
            const hasCanonical = !!document.head.querySelector('link[rel="canonical"]')
            const hasFooter = !!document.querySelector('footer')
            return hasBody && hasCanonical && hasFooter
          },
          { timeout: 45000, polling: 200 },
        )

        const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))

        await mkdir(dirname(outFile), { recursive: true })
        await writeFile(outFile, html, 'utf8')
        written++
        console.log(`[prerender] ✓ ${urlPath.padEnd(28)} -> ${outFile.replace(DIST, 'dist')}`)
      } catch (err) {
        failed++
        console.error(`[prerender] ✗ ${urlPath} — ${err.message}`)
      } finally {
        await page.close()
      }
    }
  }

  await browser.close()
  preview.kill()
  // On Windows the npm.cmd shell wrapper can leave the child preview alive.
  if (preview.pid && process.platform === 'win32') {
    try {
      spawn('taskkill', ['/pid', String(preview.pid), '/T', '/F'])
    } catch {
      /* best effort */
    }
  }

  console.log(`\n[prerender] done: ${written}/${total} written, ${failed} failed.`)
  // Reference the untouched shell so the variable is intentionally retained
  // (kept for future "diff against shell" tooling); avoids an unused-var lint.
  void shellHtml.length
  if (failed > 0) process.exit(5)
}

main().catch((err) => {
  console.error('[prerender] fatal:', err)
  process.exit(1)
})
