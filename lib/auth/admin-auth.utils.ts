import { AdminUser } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';

/**
 * Admin Authentication Utilities
 * 
 * Provides JWT validation, role verification, and admin-specific helper functions
 */

// ==================== Types ====================

export type AdminRole = 'ADMIN';
export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface AdminTokenPayload {
  sub: string; // Admin User ID
  type: 'refresh';
  tokenId: string;
  role: UserRole;
  iat: number; // Issued at
  exp: number; // Expiration
}



// ==================== JWT Token Validation ====================

/**
 * Decode and validate admin refresh token
 * Returns decoded payload only if valid AND has ADMIN role
 */
export function validateAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwtDecode<AdminTokenPayload>(token);
    
    // Validate token type
    if (decoded.type !== 'refresh') {
      console.error('[AdminAuth] Invalid token type:', decoded.type);
      return null;
    }

    
    // Validate expiration
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp <= now) {
      console.error('[AdminAuth] Token expired');
      return null;
    }
    
    // Validate required fields
    if (!decoded.sub || !decoded.tokenId || !decoded.role) {
      console.error('[AdminAuth] Missing required token fields');
      return null;
    }
    
    // CRITICAL: Validate ADMIN role
    if (decoded.role !== 'ADMIN') {
      console.error('[AdminAuth] Unauthorized role:', decoded.role);
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('[AdminAuth] Token validation failed:', error);
    return null;
  }
}

/**
 * Check if token has ADMIN role
 */
export function isAdminToken(tokenPayload: AdminTokenPayload | null): boolean {
  return tokenPayload?.role === 'ADMIN';
}

/**
 * Check if token belongs to a customer (should be blocked)
 */
export function isCustomerToken(token: string): boolean {
  try {
    const decoded = jwtDecode<AdminTokenPayload>(token);
    return decoded.role === 'CUSTOMER';
  } catch {
    return false;
  }
}

// ==================== Admin User Checks ====================

/**
 * Check if user has ADMIN role
 */
export function isAdmin(user: AdminUser | null): boolean {
  return user?.role === 'ADMIN';
}

/**
 * Check if admin account is active
 */
export function isAccountActive(user: AdminUser | null): boolean {
  return user?.isActive ?? false;
}

/**
 * Check if admin phone is verified
 */
export function isPhoneVerified(user: AdminUser | null): boolean {
  return user?.phoneVerified ?? false;
}

/**
 * Check if admin email is verified
 */
export function isEmailVerified(user: AdminUser | null): boolean {
  return user?.emailVerified ?? false;
}

/**
 * Check if admin account is locked
 */
export function isAccountLocked(user: AdminUser | null): boolean {
  if (!user?.lockedUntil) return false;
  return new Date(user.lockedUntil) > new Date();
}

/**
 * Get remaining lock time in minutes
 */
export function getLockTimeRemaining(user: AdminUser | null): number {
  if (!user?.lockedUntil) return 0;
  const lockUntil = new Date(user.lockedUntil);
  const now = new Date();
  const diff = lockUntil.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / 60000));
}

// ==================== Display Utilities ====================

/**
 * Get admin display name
 */
export function getAdminDisplayName(user: AdminUser | null): string {
  if (!user) return 'Admin';
  return user.username || user.email || `${user.countryCode}${user.phone}`;
}

/**
 * Format phone number for display
 */
export function formatPhone(countryCode: string, phone: string): string {
  return `${countryCode} ${phone}`;
}

/**
 * Mask phone number (show last 4 digits only)
 */
export function maskPhone(phone: string): string {
  if (phone.length < 4) return '****';
  return phone.slice(0, -4).replace(/\d/g, '*') + phone.slice(-4);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
}

/**
 * Get admin initials for avatar
 */
export function getAdminInitials(user: AdminUser | null): string {
  if (!user) return 'A';
  
  if (user.username) {
    const parts = user.username.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return user.username.substring(0, 2).toUpperCase();
  }
  
  if (user.email) {
    return user.email.substring(0, 2).toUpperCase();
  }
  
  return 'AD';
}

// ==================== Validation ====================

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate OTP format
 */
export function isValidOtp(otp: string): boolean {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
}