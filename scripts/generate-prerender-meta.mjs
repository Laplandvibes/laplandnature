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
 * Consumed by ../_prerender_routes.mjs via --meta=scripts/prerender-meta.json
 * (tried FIRST in the auto reader order). Degrades gracefully: on any error the
 * script exits 0 with whatever it extracted, and the prerenderer falls back to
 * routes.json fallbackTitle / EN for missing entries.
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
const LANGS = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl'];

// routes.json path → COPY[lang] section key holding { metaTitle, metaDescription }.
// Only routes whose meta lives in copy.ts are listed; anything not here keeps
// its routes.json fallbackTitle.
const ROUTE_TO_SECTION = {
  '/': 'home',
  '/northern-lights': 'northernLights',
  '/national-parks': 'nationalParks',
  '/wildlife': 'wildlife',
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
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[meta] ERROR (non-fatal, build continues with fallback titles):', err);
    process.exit(0);
  });
