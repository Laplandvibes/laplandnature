// Cloudflare Pages Function — same-origin proxy to the Supabase Edge Function
// `send-welcome-email`. Lives at https://laplandnature.com/api/newsletter.
//
// The Supabase function's CORS policy doesn't include laplandnature.com.
// Routing through this Function makes the call same-origin from the browser's
// perspective so CORS never enters the picture; the actual hop to Supabase is
// a server-side fetch.
//
// Configure these as Cloudflare Pages env vars (Project -> Settings -> Env):
//   SUPABASE_URL              -> https://oogioaxmfnqcbvjbcodh.supabase.co
//   SUPABASE_PUBLISHABLE_KEY  -> the anon key
// Both fall back to the values shipped in the bundle if not set.

interface Env {
  SUPABASE_URL?: string
  SUPABASE_PUBLISHABLE_KEY?: string
}

const SUPABASE_URL_FALLBACK = 'https://oogioaxmfnqcbvjbcodh.supabase.co'
const SUPABASE_ANON_FALLBACK =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54'

interface Body {
  email?: string
  source?: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const email = (body.email || '').trim()
  const source = (body.source || 'laplandnature').trim()

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'Valid email required' }, 400)
  }

  const supabaseUrl = env.SUPABASE_URL || SUPABASE_URL_FALLBACK
  const anonKey = env.SUPABASE_PUBLISHABLE_KEY || SUPABASE_ANON_FALLBACK

  try {
    const upstream = await fetch(`${supabaseUrl}/functions/v1/send-welcome-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ email, source }),
    })

    const responseText = await upstream.text()
    let data: any = {}
    try {
      data = JSON.parse(responseText)
    } catch {
      data = { rawBody: responseText.slice(0, 500) }
    }

    if (!upstream.ok) {
      return json(
        { error: data?.error || `upstream HTTP ${upstream.status}`, upstreamBody: data },
        upstream.status,
      )
    }
    return json(data, 200)
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Upstream fetch failed' }, 502)
  }
}

export const onRequestOptions: PagesFunction = () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
