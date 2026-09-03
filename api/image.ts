import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const key = process.env.UNSPLASH_ACCESS_KEY
  const query = typeof request.query.query === 'string' ? request.query.query : ''

  if (!key) {
    response.status(503).json({ error: 'UNSPLASH_ACCESS_KEY is not configured' })
    return
  }

  if (!query.trim()) {
    response.status(400).json({ error: 'Image query is required' })
    return
  }

  try {
    const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query,
    )}&per_page=1&orientation=landscape&content_filter=high&client_id=${key}`
    const upstream = await fetch(endpoint)

    if (!upstream.ok) {
      response.status(upstream.status).json({ error: 'Image request failed' })
      return
    }

    const data = await upstream.json()
    const result = data.results?.[0]

    if (!result?.urls?.regular) {
      response.status(404).json({ error: 'No image found' })
      return
    }

    response.status(200).json({
      url: result.urls.regular,
      alt: result.alt_description || query,
      credit: result.user?.name || 'Unsplash',
    })
  } catch {
    response.status(500).json({ error: 'Image service unavailable' })
  }
}
