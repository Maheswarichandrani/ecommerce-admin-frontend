import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateAdminToken, isCustomerToken } from '@/lib/auth/admin-auth.utils';
import { getDefaultRedirect, getLoginPath, isGuestOnlyRoute, isProtectedRoute } from './lib/auth/admin-route.config';
import { cookies } from 'next/headers';

/**
 * Admin Authentication Middleware
 * 
 * Protects all routes except /login and /verify-otp
 * Validates JWT refresh_token and ensures ADMIN role
 * Blocks CUSTOMER role access completely
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get refresh token from cookies
  const refreshToken = request.cookies.get('refresh_token')?.value;



  const isGuest = isGuestOnlyRoute(pathname);
  const needsAuth = isProtectedRoute(pathname);

  console.log(`[AdminMiddleware] ${pathname} | Guest: ${isGuest} | Protected: ${needsAuth} | Token: ${refreshToken ? 'Found' : 'Missing'}`);

  // ==================== No Token ====================
  if (!refreshToken) {
    // Redirect to login if accessing protected route
    if (needsAuth) {
      console.log(`[AdminMiddleware] No token, redirecting to login`);
      return NextResponse.redirect(new URL(getLoginPath(pathname), request.url));
    }
    
    // Allow access to guest routes
    return NextResponse.next();
  }

  // ==================== Block Customer Role ====================
  // Check if token belongs to a customer (should be blocked)
  if (isCustomerToken(refreshToken)) {
    console.log(`[AdminMiddleware] Customer role detected, blocking access`);
    
    // Clear the customer token
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('refresh_token');
    response.cookies.delete('access_token');
    
    return response;
  }

  // ==================== Validate Admin Token ====================
  const decoded = validateAdminToken(refreshToken);
  const isAuthenticated = !!decoded;

  console.log(`[AdminMiddleware] Token validation: ${isAuthenticated ? 'Valid' : 'Invalid'}`);

  // ==================== Route Access Control ====================

  // Protected route without valid admin auth
  if (needsAuth && !isAuthenticated) {
    console.log(`[AdminMiddleware] Invalid token for protected route, redirecting to login`);
    return NextResponse.redirect(new URL(getLoginPath(pathname), request.url));
  }

  // Guest-only route with valid admin auth (already logged in)
  if (isGuest && isAuthenticated) {
    console.log(`[AdminMiddleware] Admin already authenticated, redirecting to dashboard`);
    return NextResponse.redirect(new URL(getDefaultRedirect(), request.url));
  }

  // Allow access
  return NextResponse.next();
}

/**
 * Configure which routes middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder (images, etc.)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
};