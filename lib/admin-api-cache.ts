/**
 * In-memory cache for admin API responses.
 * Keys: priority-list:${queryKey}, past-list:${queryKey}, priority-doc:${id}, past-doc:${id}, priority-screenshot:${id}
 * TTLs: priority list 45s, past list 5min, detail docs 3min, screenshot 5min.
 */

const TTL_PRIORITY_LIST_MS = 45 * 1000;
const TTL_PAST_LIST_MS = 5 * 60 * 1000;
const TTL_DOC_MS = 3 * 60 * 1000;
const TTL_SCREENSHOT_MS = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function getExpiresAt(ttlMs: number): number {
  return Date.now() + ttlMs;
}

function isExpired(entry: CacheEntry<unknown>): boolean {
  return Date.now() > entry.expiresAt;
}

/**
 * Get cached value if present and not expired. Returns undefined otherwise.
 */
export function getCached<T>(key: string): T | undefined {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry || isExpired(entry)) {
    if (entry) cache.delete(key);
    return undefined;
  }
  return entry.data;
}

/**
 * Set cache entry with TTL in milliseconds.
 */
export function setCached<T>(key: string, data: T, ttlMs: number): void {
  cache.set(key, {
    data,
    expiresAt: getExpiresAt(ttlMs),
  });
}

/**
 * Invalidate by exact key or by prefix (e.g. "priority-list:" clears all priority list entries).
 */
export function invalidate(keyOrPrefix: string): void {
  if (cache.has(keyOrPrefix)) {
    cache.delete(keyOrPrefix);
    return;
  }
  for (const key of cache.keys()) {
    if (key.startsWith(keyOrPrefix)) {
      cache.delete(key);
    }
  }
}

/**
 * Invalidate all admin cache entries (e.g. on 401 logout).
 */
export function invalidateAll(): void {
  cache.clear();
}

// Key builders
export function priorityListKey(queryKey: string): string {
  return `priority-list:${queryKey}`;
}

export function pastListKey(queryKey: string): string {
  return `past-list:${queryKey}`;
}

export function priorityDocKey(id: string): string {
  return `priority-doc:${id}`;
}

export function pastDocKey(id: string): string {
  return `past-doc:${id}`;
}

export function priorityScreenshotKey(id: string): string {
  return `priority-screenshot:${id}`;
}

// TTLs for callers
export const CACHE_TTL = {
  priorityList: TTL_PRIORITY_LIST_MS,
  pastList: TTL_PAST_LIST_MS,
  doc: TTL_DOC_MS,
  screenshot: TTL_SCREENSHOT_MS,
} as const;
