import type { Lang } from '../i18n/useLang'
import type { SectionCopy } from './types'
import en from './copy.en'

export type { SectionCopy } from './types'

// English ships in the main bundle; every other language is a lazy chunk
// fetched by CopyGate in App.tsx before any COPY consumer renders.
const loaders: Record<Lang, () => Promise<{ default: SectionCopy }>> = {
  en: () => import('./copy.en'),
  fi: () => import('./copy.fi'),
  de: () => import('./copy.de'),
  ja: () => import('./copy.ja'),
  es: () => import('./copy.es'),
  'pt-BR': () => import('./copy.ptBR'),
  'zh-CN': () => import('./copy.zhCN'),
  ko: () => import('./copy.ko'),
  fr: () => import('./copy.fr'),
  it: () => import('./copy.it'),
  nl: () => import('./copy.nl'),
}

export const COPY = { en } as Record<Lang, SectionCopy>

export function loadCopy(lang: Lang): Promise<void> {
  if (COPY[lang]) return Promise.resolve()
  return loaders[lang]().then((m) => {
    COPY[lang] = m.default
  })
}

// Build tooling (scripts/generate-prerender-meta.mjs) resolves every language
// through this before reading COPY; the browser never calls it.
export async function loadAllCopy(): Promise<void> {
  await Promise.all((Object.keys(loaders) as Lang[]).map((l) => loadCopy(l)))
}
