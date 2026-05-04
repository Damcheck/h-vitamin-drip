import { createClient } from '@supabase/supabase-js'

// ═══════════════════════════════════════════════════════════════
// SERVER-ONLY Supabase client — uses the service_role key
// This MUST never be imported in client components.
// It bypasses RLS for admin operations.
// ═══════════════════════════════════════════════════════════════

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing from environment variables')
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

/**
 * Validate a Supabase access token and return the user if valid.
 * Used by API routes to verify admin identity.
 */
export async function validateAuthToken(token: string) {
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user) return null
  return user
}

/**
 * Extract the access token from the request headers or cookies.
 */
export function extractToken(request: Request): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }

  // Try cookies
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [key, ...val] = c.trim().split('=')
      return [key, val.join('=')]
    })
  )

  // Supabase stores the access token in sb-<ref>-auth-token cookie
  const tokenCookie = cookies['sb-access-token'] || cookies['sb-coewjaelduzijuwqvljv-auth-token']
  if (tokenCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(tokenCookie))
      return parsed.access_token || parsed
    } catch {
      return tokenCookie
    }
  }

  return null
}
