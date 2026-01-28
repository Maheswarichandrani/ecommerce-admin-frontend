import { AdminUser } from '@/types/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Admin Authentication Store
 * 
 * Manages admin authentication state with localStorage persistence
 * HTTP-only cookies handle actual authentication
 * Store caches admin data for UI performance
 */

interface AdminAuthState {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AdminAuthActions {
  setAdmin: (admin: AdminUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  reset: () => void;
}

type AdminAuthStore = AdminAuthState & AdminAuthActions;

const initialState: AdminAuthState = {
  admin: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAdminAuthStore = create<AdminAuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      /**
       * Set admin user data
       * Automatically updates authentication state
       */
      setAdmin: (admin) =>
        set({
          admin,
          isAuthenticated: !!admin,
          isLoading: false,
        }),

      /**
       * Set loading state
       */
      setLoading: (loading) => set({ isLoading: loading }),

      /**
       * Logout admin
       * Clears admin data but keeps initialized state
       */
      logout: () =>
        set({
          admin: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      /**
       * Reset store to initial state
       * Use this for complete cleanup
       */
      reset: () => set(initialState),
    }),
    {
      name: 'admin-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        admin: state.admin,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);