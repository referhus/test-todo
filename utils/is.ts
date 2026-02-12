export function isNullOrUndefined(value: unknown): value is undefined | null {
  return value === null || value === undefined
}

export function isContainerValue(
  value: unknown,
): value is Record<string, unknown> {
  return isObject(value) || Array.isArray(value)
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)
}

/**
 * Checks if the path opted out of nested fields using `[fieldName]` syntax
 */
export const isString = (val: any): val is string => typeof val === 'string'
