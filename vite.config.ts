import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/image')) {
          return next()
        }

        const url = new URL(req.url, 'http://localhost:5173')
        const query = url.searchParams.get('query') || ''
        const key = process.env.UNSPLASH_ACCESS_KEY

        if (key && query) {
          try {
            const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
              query,
            )}&per_page=1&orientation=landscape&content_filter=high&client_id=${key}`
            const upstream = await fetch(endpoint)
            if (upstream.ok) {
              const data = (await upstream.json()) as {
                results?: Array<{
                  urls?: { regular?: string }
                  alt_description?: string
                  user?: { name?: string }
                }>
              }
              const result = data.results?.[0]
              if (result?.urls?.regular) {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(
                  JSON.stringify({
                    url: result.urls.regular,
                    alt: result.alt_description || query,
                    credit: result.user?.name || 'Unsplash',
                  }),
                )
                return
              }
            }
          } catch {
            // Fall through to 404 JSON below
          }
        }

        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify({ error: 'Image requires upstream API key or query' }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevMiddleware()],
})
