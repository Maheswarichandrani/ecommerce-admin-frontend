'use client';

import { useEffect, useRef } from 'react';
import { adminAuthApi } from "@/lib/api/admin-auth.api";
import { useAdminAuthStore } from '@/store/admin-auth.store';

/**
 * Admin Auth Provider
 * 
 * Initializes admin authentication state on app load
 * Validates admin role and manages session state
 */
 


export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { setAdmin, setLoading } = useAdminAuthStore();
  const isInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once per session
    if (isInitialized.current) return;

    const initAuth = async () => {
      try {
        setLoading(true);

        const response = await adminAuthApi.getCurrentUser();

        if (response?.user) {
          // Validate admin role
          if (response.user.role !== 'ADMIN') {
            console.error('[AdminAuth] User is not an admin, clearing session');
            setAdmin(null);
          } else {
            setAdmin(response.user);
          }
        } else {
          setAdmin(null);
        }
      } catch (error: any) {
        // Handle authentication errors
        if (error.response?.status === 401 || error.response?.status === 403) {
          setAdmin(null);
        } else {
          console.error('[AdminAuth] Init error:', error);
          setAdmin(null);
        }
      } finally {
        setLoading(false);
        isInitialized.current = true;
      }
    };

    initAuth();
  }, [setAdmin, setLoading]);

  return <>{children}</>;
}