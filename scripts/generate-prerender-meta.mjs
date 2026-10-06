/**
 * generate-prerender-meta.mjs  (laplandnature)
 *
 * Builds scripts/prerender-meta.json: per-route × per-locale <title> and
 * <meta description> that EXACTLY mirror what src/components/SEO.tsx sets
 * client-side, so crawlers without JS see the same localized meta in the
 * prerendered HTML.
 *
 * Why a generator (not routes.json copyKey): this site's non-EN locales are
 * built at runtime via `deepMerge(en, *_OVERRIDES)` in src/locales/copy.ts —
 * the merged metaTitle/metaDescription for es/pt-BR/zh-CN/ko/fr/it/nl never
 * appear as literal strings in copy.ts source, so the shared prerenderer's
 * static "nested" reader cannot see them. Loading the real COPY object through
 * Vite SSR resolves every locale correctly (incl. EN-fallback for keys an
 * override omits — same as the live site).
 *
 * Consumed by scripts/_prerender_routes.mjs via --meta=scripts/prerender-meta.json
 * (tried FIRST in the auto reader order). Degrades gracefully: on an extraction
 * error the script exits 0 with whatever it extracted, and the prerenderer falls
 * back to routes.json fallbackTitle / EN for missing entries.
 *
 * One deliberate stop (exit 1): a description outside the prerender window.
 * scripts/_prerender_routes.mjs extends a description under 70 characters /
 * 100 width units with the page's own sentences and cuts one over 160
 * characters / 200 width units (ensureDescriptionLength + clampDescription; a
 * CJK character counts as 2 width units). SEO.tsx shows the source text as it
 * is, so a description outside that window would give search engines and share
 * cards one text and the browser another (gate:meta-hydraatio). Fix the text in
 * src/locales (copy.<lang>.ts / overrides.<lang>.ts), never the prerender.
 *
 * STRICTLY READ-ONLY over src/ — no source files are modified.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_FILE = resolve(__dirname, 'prerender-meta.json');
const ROUTES_FILE = resolve(__dirname, 'routes.json');

// Keep in sync with ../_prerender_routes.mjs FULL_LOCALE_LIST lang codes and
// src/i18n/useLang.ts Lang union.
const LANGS = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];

// routes.json path → COPY[lang] section key holding { metaTitle, metaDescription }.
// Only routes whose meta lives in copy.ts are listed; anything not here keeps
// its routes.json fallbackTitle.
const ROUTE_TO_SECTION = {
  '/': 'home',
  '/northern-lights': 'northernLights',
  '/national-parks': 'nationalParks',
  '/wildlife': 'wildlife',
  '/bear-kuusamo': 'bearKuusamo',
  '/seasons': 'seasons',
  '/hiking-trails': 'hiking',
  '/conservation': 'conservation',
  '/freshwater': 'freshwater',
  '/editorial-policy': 'editorial',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/cookie-policy': 'cookie',
};

const warnings = [];
function warn(msg) {
  warnings.push(msg);
  console.warn(`[meta] WARN: ${msg}`);
}

// The prerender window: same character class and limits as
// ensureDescriptionLength() + clampDescription() in scripts/_prerender_routes.mjs.
// Inside it the prerender leaves a description untouched.
const LEVEA = /[\u1100-\u11FF\u2E80-\uA4CF\uA960-\uA97F\uAC00-\uD7FF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]/;
const leveys = (x) => [...String(x)].reduce((n, c) => n + (LEVEA.test(c) ? 2 : 1), 0);
function outsideWindow(desc) {
  const d = String(desc).trim();
  const s = d.replace(/\s+/g, ' ');
  if (d.length > 160 || leveys(d) > 200 || [...s].length > 160) {
    return `over 160 characters / 200 width units (${d.length} / ${leveys(d)})`;
  }
  if (d.length < 70 && leveys(d) < 100) return `under 70 characters / 100 width units (${d.length} / ${leveys(d)})`;
  return null;
}

async function main() {
  const routes = JSON.parse(readFileSync(ROUTES_FILE, 'utf-8'));
  if (!existsSync(resolve(ROOT, 'src/locales/copy.ts'))) {
    warn('src/locales/copy.ts missing — prerenderer will use routes.json fallbacks');
    writeFileSync(OUT_FILE, '{}\n', 'utf-8');
    return;
  }

  // Load the real COPY object (post-deepMerge) through Vite SSR so TS + the
  // deepMerge of overrides.ts resolve exactly as they do at runtime.
  let COPY = null;
  let viteServer = null;
  try {
    const vite = await import('vite');
    viteServer = await vite.createServer({
      root: ROOT,
      logLevel: 'error',
      server: { middlewareMode: true, hmr: false, watch: null },
      appType: 'custom',
      // SSR-only, single-module load — skip the dep optimizer/scanner entirely.
      // Without this, Vite kicks off a background dep-scan that races with
      // server.close() and prints a harmless but noisy "server is being
      // restarted or closed" stack trace.
      optimizeDeps: { noDiscovery: true, include: [] },
    });
    let load;
    if (typeof viteServer.ssrLoadModule === 'function') {
      load = (p) => viteServer.ssrLoadModule(p);
    } else {
      const runner = vite.createServerModuleRunner(viteServer.environments.ssr, { hmr: false });
      load = (p) => runner.import(p);
    }
    const copyMod = await load('/src/locales/copy.ts');
    // copy.ts is now a lazy per-language loader — resolve every language
    // before reading COPY (no-op if the module is still the old eager map).
    if (typeof copyMod.loadAllCopy === 'function') await copyMod.loadAllCopy();
    COPY = copyMod.COPY;
  } catch (e) {
    warn(`could not load src/locales/copy.ts via Vite SSR: ${e.message}`);
  } finally {
    if (viteServer) await viteServer.close();
  }

  if (!COPY) {
    writeFileSync(OUT_FILE, '{}\n', 'utf-8');
    console.error('[meta] WARNING: COPY not loaded — wrote empty map, prerender falls back to routes.json');
    return;
  }

  const meta = {};
  let entries = 0;
  for (const route of routes) {
    const section = ROUTE_TO_SECTION[route.path];
    if (!section) continue;
    const out = {};
    for (const lang of LANGS) {
      const sec = COPY[lang] && COPY[lang][section];
      if (!sec) continue;
      const title = typeof sec.metaTitle === 'string' ? sec.metaTitle : null;
      const description = typeof sec.metaDescription === 'string' ? sec.metaDescription : null;
      // FAQ → emitted so the shared prerenderer can bake a FAQPage JSON-LD into
      // the static HTML (rich-result eligible). Mirrors COPY[lang][section].faq.items
      // exactly — same source the visible <details> FAQ renders from client-side.
      const faqItems =
        sec.faq && Array.isArray(sec.faq.items)
          ? sec.faq.items
              .filter((it) => it && typeof it.q === 'string' && typeof it.a === 'string')
              .map((it) => ({ q: it.q, a: it.a }))
          : null;
      if (title || description || (faqItems && faqItems.length)) {
        out[lang] = { title, description };
        if (faqItems && faqItems.length) out[lang].faq = faqItems;
        entries++;
      }
    }
    if (Object.keys(out).length > 0) meta[route.path] = out;
    else warn(`no meta extracted for route ${route.path} (section "${section}")`);
  }

  // Stable key order for clean diffs.
  const sorted = {};
  for (const path of Object.keys(meta).sort()) {
    sorted[path] = {};
    for (const lang of LANGS) if (meta[path][lang]) sorted[path][lang] = meta[path][lang];
  }

  writeFileSync(OUT_FILE, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
  console.log(
    `[meta] wrote ${OUT_FILE.replace(ROOT + '\\', '').replace(ROOT + '/', '')}: ` +
      `${Object.keys(sorted).length}/${routes.length} routes, ${entries} lang entries`,
  );
  if (entries === 0) {
    console.error('[meta] WARNING: 0 entries extracted — prerendered titles will be generic EN fallbacks!');
  }
  const sample = sorted['/'];
  if (sample) {
    console.log(`[meta] sample / en: ${sample.en?.title}`);
    console.log(`[meta] sample / fi: ${sample.fi?.title}`);
    console.log(`[meta] sample / de: ${sample.de?.title}`);
  }

  // Window check (see the header): a description the prerender would extend or
  // cut stops the build here, before the static HTML can differ from the browser.
  const outside = [];
  let checked = 0;
  for (const [path, byLang] of Object.entries(sorted)) {
    for (const [lang, m] of Object.entries(byLang)) {
      if (typeof m.description !== 'string') continue;
      checked++;
      const why = outsideWindow(m.description);
      if (why) outside.push(`  ${lang.padEnd(5)} ${path} (${ROUTE_TO_SECTION[path]}.metaDescription): ${why}\n        ${m.description}`);
    }
  }
  if (outside.length) {
    console.error(`\n[meta] ❌ ${outside.length} description(s) outside the prerender window: the prerender would extend or cut them, and the static HTML would differ from what the browser shows.`);
    console.error(outside.join('\n'));
    console.error('[meta] Write each one in its own language to 70–160 characters (CJK: 100–200 width units, a CJK character = 2) in src/locales/copy.<lang>.ts or overrides.<lang>.ts.\n');
    return false;
  }
  console.log(`[meta] window OK — ${checked} descriptions inside the prerender window`);
  return true;
}

main()
  .then((ok) => process.exit(ok === false ? 1 : 0))
  .catch((err) => {
    console.error('[meta] ERROR (non-fatal, build continues with fallback titles):', err);
    process.exit(0);
  });
