import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminProductApi } from '@/lib/api/admin-products.api';
import { queryKeys } from '@/lib/query-keys';
import type {
  Product,
  ProductCreateRequest,
  ProductUpdateRequest,
  ProductQueryParams,
} from '@/types/product';

/**
 * Hook: Get all products with pagination
 */
export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: queryKeys.products.list(params || {}),
    queryFn: () => adminProductApi.getAllProducts(params),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}



