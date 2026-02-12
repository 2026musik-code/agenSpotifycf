
import { Hono } from 'hono'

const app = new Hono()

app.get('/api/settings', async (c) => {
  const env = c.env
  try {
    if (!env.VPSAI) {
      return c.json({ error: 'R2 binding (VPSAI) not found' }, 500)
    }

    const object = await env.VPSAI.get('apikey')
    if (object === null) {
      return c.json({ apikey: '' })
    }

    const apikey = await object.text()
    return c.json({ apikey })
  } catch (e) {
    return c.json({ error: e.message }, 500)
  }
})

app.put('/api/settings', async (c) => {
  const env = c.env
  try {
    if (!env.VPSAI) {
      return c.json({ error: 'R2 binding (VPSAI) not found' }, 500)
    }

    const body = await c.req.json()
    const { apikey } = body

    if (!apikey) {
      return c.json({ error: 'API Key is required' }, 400)
    }

    await env.VPSAI.put('apikey', apikey)
    return c.json({ success: true, message: 'Saved to R2' })
  } catch (e) {
    return c.json({ error: e.message }, 500)
  }
})

app.get('*', async (c) => {
  if (c.env.ASSETS) {
    // Try to fetch the requested path from ASSETS
    const response = await c.env.ASSETS.fetch(c.req.raw)

    // If it's a 404 (not found in assets) and not an API call, serve index.html for SPA routing
    if (response.status === 404 && !new URL(c.req.url).pathname.startsWith('/api')) {
      const url = new URL(c.req.url)
      url.pathname = '/index.html'
      return await c.env.ASSETS.fetch(url.toString())
    }

    return response
  }
  return c.text('Assets binding not found', 500)
})

export default app
