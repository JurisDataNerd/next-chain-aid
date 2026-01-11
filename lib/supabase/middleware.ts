import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // ============================================================================
  // PUBLIC ROUTES - No authentication required
  // ============================================================================
  const publicRoutes = [
    '/',
    '/campaigns',
    '/transparansi',
    '/organization',
    '/about',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ]

  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // ============================================================================
  // AUTHENTICATION CHECK
  // ============================================================================
  
  // If no user and trying to access protected route, redirect to login
  if (!user && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // ============================================================================
  // AUTHENTICATED USER - Role-based access control
  // ============================================================================
  
  if (user) {
    try {
      // Fetch user profile to get role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        // If profile not found, allow access but user might see errors in UI
        return supabaseResponse
      }

      const userRole = profile?.role || 'user'

      // ========================================================================
      // ADMIN ROUTES - Only for admin role
      // ========================================================================
      if (pathname.startsWith('/admin')) {
        if (userRole !== 'admin') {
          const redirectUrl = request.nextUrl.clone()
          redirectUrl.pathname = '/'
          redirectUrl.searchParams.set('error', 'unauthorized')
          return NextResponse.redirect(redirectUrl)
        }
        // Admin has access to all admin routes
        return supabaseResponse
      }

      // ========================================================================
      // ORGANIZATION ROUTES - Only for org role
      // ========================================================================
      if (pathname.startsWith('/org')) {
        if (userRole !== 'org') {
          const redirectUrl = request.nextUrl.clone()
          redirectUrl.pathname = '/'
          redirectUrl.searchParams.set('error', 'unauthorized')
          return NextResponse.redirect(redirectUrl)
        }

        // Check organization status
        const { data: organization, error: orgError } = await supabase
          .from('organizations')
          .select('status, is_verified, is_banned')
          .eq('id', user.id)
          .single()

        // If organization not found, redirect to register-org
        if (orgError || !organization) {
          if (pathname !== '/register-org') {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = '/register-org'
            redirectUrl.searchParams.set('info', 'register_required')
            return NextResponse.redirect(redirectUrl)
          }
          return supabaseResponse
        }

        // Check if organization is banned
        if (organization.is_banned) {
          const redirectUrl = request.nextUrl.clone()
          redirectUrl.pathname = '/org'
          redirectUrl.searchParams.set('error', 'organization_banned')
          return NextResponse.redirect(redirectUrl)
        }

        // Routes that require approved organization
        const approvedOnlyRoutes = [
          '/org/campaigns/create',
          '/org/distributions',
        ]
        
        const requiresApproval = approvedOnlyRoutes.some(route => 
          pathname.startsWith(route)
        )

        if (requiresApproval && organization.status !== 'approved') {
          const redirectUrl = request.nextUrl.clone()
          redirectUrl.pathname = '/org'
          redirectUrl.searchParams.set('error', 'organization_not_approved')
          return NextResponse.redirect(redirectUrl)
        }

        return supabaseResponse
      }

      // ========================================================================
      // REGISTER-ORG ROUTE - Special handling
      // ========================================================================
      if (pathname === '/register-org') {
        // If user is already an org, check if they have an organization
        if (userRole === 'org') {
          const { data: organization } = await supabase
            .from('organizations')
            .select('id')
            .eq('id', user.id)
            .single()

          // If organization exists, redirect to org dashboard
          if (organization) {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = '/org'
            redirectUrl.searchParams.set('info', 'already_registered')
            return NextResponse.redirect(redirectUrl)
          }
        }
        return supabaseResponse
      }

      // ========================================================================
      // AUTH ROUTES - Redirect if already logged in
      // ========================================================================
      if (pathname === '/login' || pathname === '/register') {
        const redirectUrl = request.nextUrl.clone()
        
        // Redirect to appropriate dashboard based on role
        if (userRole === 'admin') {
          redirectUrl.pathname = '/admin'
        } else if (userRole === 'org') {
          redirectUrl.pathname = '/org'
        } else {
          redirectUrl.pathname = '/profile'
        }
        
        return NextResponse.redirect(redirectUrl)
      }

      // ========================================================================
      // USER ROUTES - Accessible by all authenticated users
      // ========================================================================
      // Routes like /profile, /history, /donate are accessible by all authenticated users
      // No additional checks needed

    } catch (error) {
      console.error('Middleware error:', error)
      // On error, allow the request to continue
      // The page will handle the error state
    }
  }

  return supabaseResponse
}
