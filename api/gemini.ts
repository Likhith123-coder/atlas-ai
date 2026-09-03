import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const key = process.env.GEMINI_API_KEY

  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!key) {
    response.status(503).json({ error: 'GEMINI_API_KEY is not configured' })
    return
  }

  const prompt = typeof request.body?.prompt === 'string' ? request.body.prompt : ''

  if (!prompt.trim()) {
    response.status(400).json({ error: 'Prompt is required' })
    return
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    )

    if (!upstream.ok) {
      response.status(upstream.status).json({ error: 'Gemini request failed' })
      return
    }

    const data = await upstream.json()
    response.status(200).json({
      text: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
    })
  } catch {
    response.status(500).json({ error: 'Gemini service unavailable' })
  }
}
