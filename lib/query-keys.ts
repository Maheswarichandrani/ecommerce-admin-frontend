/**
 * Query Keys Factory
 * Centralized query key management for TanStack Query
 * 
 * Benefits:
 * - Type-safe query keys
 * - Easy invalidation
 * - Prevent typos
 * - Better organization
 */

import { ProductQueryParams } from "@/types/product";

export const queryKeys = {
  // Products
  products : {
    list : (params : ProductQueryParams) => ['products', 'list', params]
  },

  
} as const;

