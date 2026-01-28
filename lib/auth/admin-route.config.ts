/**
 * Admin Route Configuration
 * 
 * Defines which routes require authentication and role checks
 */

// ==================== Guest-Only Routes ====================

/**
 * Routes that only unauthenticated users can access
 * Authenticated admins will be redirected to dashboard
 */
const GUEST_ONLY_ROUTES = [
  '/login',
  '/verify-otp',
] as const;

/**
 * Check if route is guest-only
 */
export function isGuestOnlyRoute(pathname: string): boolean {
  return GUEST_ONLY_ROUTES.some(route => pathname.startsWith(route));
}

// ==================== Protected Routes ====================

/**
 * All routes except guest-only routes are protected
 * Requires ADMIN role authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  // Everything except guest-only routes is protected
  return !isGuestOnlyRoute(pathname);
}

// ==================== Route Helpers ====================

/**
 * Get default redirect path for authenticated admins
 */
export function getDefaultRedirect(): string {
  return '/';
}

/**
 * Get login path with optional redirect
 */
export function getLoginPath(redirectTo?: string): string {
  const loginPath = '/login';
  if (redirectTo && redirectTo !== '/login' && redirectTo !== '/verify-otp') {
    return `${loginPath}?redirect=${encodeURIComponent(redirectTo)}`;
  }
  return loginPath;
}