// Deep-merge utility: returns a new SectionCopy with `overrides` applied over
// `base`. Arrays are replaced wholesale; only plain objects are merged.
export function deepMerge<T>(base: T, overrides: unknown): T {
  if (overrides == null || typeof overrides !== 'object' || Array.isArray(overrides)) {
    return (overrides as T) ?? base
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const [k, v] of Object.entries(overrides as Record<string, unknown>)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && typeof out[k] === 'object' && !Array.isArray(out[k])) {
      out[k] = deepMerge(out[k], v)
    } else {
      out[k] = v
    }
  }
  return out as T
}
