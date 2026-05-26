/**
 * Deep partial type for locale overrides.
 * Allows providing only the keys you want to override from the base locale.
 */
export type LocaleOverrides<T> = T extends object ? { [K in keyof T]?: LocaleOverrides<T[K]> } : T

/**
 * Deeply merges a base locale with a partial override object.
 * Keys present in overrides replace those in base; missing keys fall back to base.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeLocale<T extends Record<string, any>>(
  base: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overrides: Record<string, any>,
): T {
  const result: Record<string, unknown> = { ...base }
  for (const key of Object.keys(overrides)) {
    const overrideVal = overrides[key]
    const baseVal = base[key]
    if (
      overrideVal !== undefined &&
      typeof overrideVal === "object" &&
      overrideVal !== null &&
      !Array.isArray(overrideVal) &&
      typeof baseVal === "object" &&
      baseVal !== null &&
      !Array.isArray(baseVal)
    ) {
      result[key] = mergeLocale(baseVal, overrideVal)
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal
    }
  }
  return result as T
}
