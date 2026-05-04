import { NextResponse, type NextRequest } from 'next/server'

// ═══════════════════════════════════════════════════════════════
// MIDDLEWARE — runs on EVERY request at the Edge
// 1. Adds security headers to all responses
// 2. Blocks unauthenticated access to /admin/* (except /admin login)
// 3. Blocks unauthenticated access to /api/admin/*
// ═══════════════════════════════════════════════════════════════

// Security headers applied to every response
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-DNS-Prefetch-Control': 'on',
  'X-Download-Options': 'noopen',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' blob: data: https://coewjaelduzijuwqvljv.supabase.co https://*.supabase.co",
    "connect-src 'self' https://coewjaelduzijuwqvljv.supabase.co https://*.supabase.co wss://*.supabase.co https://va.vercel-scripts.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; '),
}

// Protected admin paths (exact prefix match)
const ADMIN_PROTECTED = [
  '/admin/dashboard',
  '/admin/products',
  '/admin/orders',
  '/admin/content',
  '/admin/settings',
]

// Protected API paths
const API_PROTECTED = ['/api/admin/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── STEP 1: Check if this is a protected admin page ──────────
  const isProtectedAdmin = ADMIN_PROTECTED.some(p => pathname.startsWith(p))
  const isProtectedAPI = API_PROTECTED.some(p => pathname.startsWith(p))

  if (isProtectedAdmin || isProtectedAPI) {
    // Extract Supabase auth token from cookies
    const accessToken = getAccessToken(request)

    if (!accessToken) {
      if (isProtectedAPI) {
        return NextResponse.json(
          { error: 'Unauthorized — valid authentication required' },
          { status: 401, headers: SECURITY_HEADERS }
        )
      }
      // Redirect to admin login
      const loginUrl = new URL('/admin', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Validate the token by calling Supabase auth.getUser
    const isValid = await validateToken(accessToken, request)
    if (!isValid) {
      if (isProtectedAPI) {
        return NextResponse.json(
          { error: 'Unauthorized — session expired or invalid' },
          { status: 401, headers: SECURITY_HEADERS }
        )
      }
      const loginUrl = new URL('/admin', request.url)
      loginUrl.searchParams.set('expired', '1')
      return NextResponse.redirect(loginUrl)
    }
  }

  // ── STEP 2: Apply security headers to all responses ──────────
  const response = NextResponse.next()
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }

  return response
}

/**
 * Extract access token from Supabase auth cookies.
 * Supabase JS v2 stores auth in `sb-<ref>-auth-token` cookie.
 */
function getAccessToken(request: NextRequest): string | null {
  // Check multiple possible cookie names
  const cookieNames = [
    'sb-coewjaelduzijuwqvljv-auth-token',
    'sb-access-token',
  ]

  for (const name of cookieNames) {
    const cookie = request.cookies.get(name)
    if (cookie?.value) {
      try {
        // Supabase stores a JSON array: [access_token, refresh_token, ...]
        const parsed = JSON.parse(cookie.value)
        if (Array.isArray(parsed)) return parsed[0]
        if (typeof parsed === 'object' && parsed.access_token) return parsed.access_token
        return cookie.value
      } catch {
        return cookie.value
      }
    }
  }

  // Also check Authorization header (for API calls)
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }

  return null
}

/**
 * Validate token against Supabase Auth API.
 * We call the REST API directly (middleware runs at Edge, can't use full SDK).
 */
async function validateToken(token: string, request: NextRequest): Promise<boolean> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) return false

    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
    })

    return res.ok
  } catch {
    return false
  }
}

// Only run middleware on these paths
export const config = {
  matcher: [
    // All admin pages except the login page itself
    '/admin/:path(dashboard|products|orders|content|settings)/:path*',
    '/admin/:path(dashboard|products|orders|content|settings)',
    // All admin API routes
    '/api/admin/:path*',
    // Apply security headers to all pages
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}
