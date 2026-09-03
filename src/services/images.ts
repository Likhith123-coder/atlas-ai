const imageCache = new Map<string, string>()

export async function resolveTravelImage(query: string, fallbackImage: string): Promise<string> {
  const cacheKey = query.toLowerCase()

  // Clear legacy cache entries that may contain old images
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem(`atlas-image:${cacheKey}`)
      localStorage.removeItem(`atlas-image-v3:${cacheKey}`)
    } catch {
      // Ignore storage errors
    }
  }

  const cached = imageCache.get(cacheKey) || (typeof window !== 'undefined' ? localStorage.getItem(`atlas-image-v4:${cacheKey}`) : null)

  if (cached) {
    imageCache.set(cacheKey, cached)
    return cached
  }

  try {
    const response = await fetch(`/api/image?query=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error('Image request failed')
    }

    const data = await response.json()
    const image = data.url && typeof data.url === 'string' && data.url.startsWith('http') ? data.url : fallbackImage

    imageCache.set(cacheKey, image)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`atlas-image-v4:${cacheKey}`, image)
    }
    return image
  } catch {
    imageCache.set(cacheKey, fallbackImage)
    return fallbackImage
  }
}
