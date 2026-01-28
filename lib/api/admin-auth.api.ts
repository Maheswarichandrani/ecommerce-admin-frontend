import { AdminUser, AuthResponse, SendOtpRequest, SendOtpResponse, VerifyOtpRequest, VerifyOtpResponse } from '@/types/auth';
import { adminApiClient } from './admin-client';

/**
 * Admin Authentication API Service
 * 
 * Handles all admin authentication API calls
 */

// ==================== Request/Response Types ====================


// ==================== API Methods ====================

/**
 * Send OTP to admin phone number
 */
async function sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
  const response = await adminApiClient.post<SendOtpResponse>(
    '/api/v1/auth/send-otp',
    data
  );
  return response.data;
}

/**
 * Verify OTP and login admin
 */
async function verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
  const response = await adminApiClient.post<VerifyOtpResponse>(
    '/api/v1/auth/verify-otp',
    data
  );
  return response.data;
}

/**
 * Get current authenticated admin user
 */
async function getCurrentUser(): Promise<AuthResponse> {
  const response = await adminApiClient.get<AuthResponse>(
    '/api/v1/auth/me'
  );
  return response.data;
}

/**
 * Logout admin user
 */
async function logout(): Promise<{ success: boolean; message?: string }> {
  const response = await adminApiClient.post<{ success: boolean; message?: string }>(
    '/api/v1/auth/logout'
  );
  return response.data;
}

/**
 * Refresh authentication tokens
 */
async function refreshToken(): Promise<void> {
  await adminApiClient.post('/api/v1/auth/refresh');
}

// ==================== Export ====================

export const adminAuthApi = {
  sendOtp,
  verifyOtp,
  getCurrentUser,
  logout,
  refreshToken,
};