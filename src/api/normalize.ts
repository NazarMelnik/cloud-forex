/** Допоміжники для парсингу ISPsystem JSON */

export function unwrap<T = string>(value: { $?: T } | T | undefined): T | undefined {
  if (value == null) return undefined;
  if (typeof value === 'object' && '$' in value) {
    return value.$ as T;
  }
  return value as T;
}

export function toArray<T>(item: T | T[] | undefined): T[] {
  if (item == null) return [];
  return Array.isArray(item) ? item : [item];
}
