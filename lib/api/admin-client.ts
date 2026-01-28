import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { isProtectedRoute, getLoginPath } from '@/lib/auth/admin-route.config';

/**
 * Admin API Client
 * 
 * ⚠️ CLIENT-SIDE ONLY - For browser/client-side requests
 * Handles automatic token refresh and admin-specific error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const adminApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with every request
});

// ==================== Token Refresh Management ====================

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

/**
 * Process queued requests after token refresh
 */
const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// ==================== Request Interceptor ====================

adminApiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== Response Interceptor ====================

adminApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      if (typeof window !== 'undefined') {
        toast.error('Network Error', {
          description: 'Please check your internet connection',
        });
      }
      return Promise.reject(new Error('Network error'));
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401/403 errors with token refresh
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Don't retry auth endpoints
      if (
        originalRequest.url?.includes('/auth/send-otp') ||
        originalRequest.url?.includes('/auth/verify-otp') ||
        originalRequest.url?.includes('/auth/refresh')
      ) {
        return Promise.reject(error);
      }

      // Queue request if refresh is already in progress
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => adminApiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt token refresh
        await axios.post(
          `${API_BASE_URL}/api/v1/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        // Retry all queued requests
        processQueue(null);
        return adminApiClient(originalRequest);
      } catch (refreshError) {
        // Token refresh failed - logout admin
        processQueue(refreshError as Error);

        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;

          // Clear admin auth storage
          localStorage.removeItem('admin-auth-storage');
          sessionStorage.clear();

          // Only redirect if on protected route
          if (isProtectedRoute(currentPath)) {
            toast.error('Session Expired', {
              description: 'Please log in again',
            });

            setTimeout(() => {
              window.location.href = getLoginPath(currentPath);
            }, 500);
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle server errors
    if (error.response?.status >= 500) {
      if (typeof window !== 'undefined') {
        toast.error('Server Error', {
          description: 'Something went wrong. Please try again later.',
        });
      }
    }

    return Promise.reject(error);
  }
);