const resizeCache = new Map<string, string>()

export function getResizeCacheKey(
  cid: string,
  height: number | undefined,
  width: number | undefined
) {
  return `${cid}-${height}-${width}`
}

export function getCachedResize(
  cid: string,
  height: number | undefined,
  width: number | undefined
): string | undefined {
  const key = getResizeCacheKey(cid, height, width)
  return resizeCache.get(key)
}

export function setCachedResize(
  cid: string,
  height: number | undefined,
  width: number | undefined,
  cachedCid: string
) {
  const key = getResizeCacheKey(cid, height, width)
  resizeCache.set(key, cachedCid)
}
