import { adminApiClient } from './admin-client';
import type { PagedResponse } from '@/types';
import type {
  Product,
  ProductCreateRequest,
  ProductUpdateRequest,
  Variant,
  ProductStatistics,
  LowStockItem,
  ProductQueryParams,
  ProductListItem,
} from '@/types/product';

/**
 * Admin Product API
 * All product management endpoints for admin dashboard
 */
export const adminProductApi = {
  /**
   * GET /api/v1/admin/products
   * Get all products with pagination (includes inactive)
   */
  getAllProducts: async (params?: ProductQueryParams): Promise<PagedResponse<ProductListItem>> => {


    const response = await adminApiClient.get<PagedResponse<ProductListItem>>(
      '/api/v1/admin/products',
      { params }
    );
    
    return response.data;
  },

  /**
   * GET /api/v1/admin/products/{id}
   * Get product details by ID
   */
  getProductById: async (id: string): Promise<Product> => {
    const response = await adminApiClient.get<Product>(`/api/v1/admin/products/${id}`);
    return response.data;
  },

  /**
   * GET /api/v1/admin/products/{id}/variants
   * Get product variants by product ID (includes inactive, for admin)
   */
  getProductVariants: async (id: string): Promise<Variant[]> => {
    const response = await adminApiClient.get<Variant[]>(
      `/api/v1/admin/products/${id}/variants`
    );
    return response.data;
  },

  /**
   * POST /api/v1/admin/products
   * Create new product with variants and images
   */
  createProduct: async (data: ProductCreateRequest): Promise<Product> => {
    const response = await adminApiClient.post<Product>('/api/v1/admin/products', data);
    return response.data;
  },

  /**
   * PUT /api/v1/admin/products/{id}
   * Update existing product with variants and images
   */
  updateProduct: async (id: string, data: ProductUpdateRequest): Promise<Product> => {
    const response = await adminApiClient.put<Product>(`/api/v1/admin/products/${id}`, data);
    return response.data;
  },

  /**
   * PATCH /api/v1/admin/products/{id}
   * Partial update for product (supports debounce saves)
   */
  patchProduct: async (id: string, data: ProductUpdateRequest): Promise<Product> => {
    const response = await adminApiClient.patch<Product>(`/api/v1/admin/products/${id}`, data);
    return response.data;
  },

  /**
   * DELETE /api/v1/admin/products/variants/{variantId}
   * Delete variant
   */
  deleteVariant: async (variantId: string): Promise<void> => {
    await adminApiClient.delete(`/api/v1/admin/products/variants/${variantId}`);
  },

  /**
   * PUT /api/v1/admin/products/{id}/status
   * Toggle product active/inactive status
   */
  toggleProductStatus: async (id: string): Promise<Product> => {
    const response = await adminApiClient.put<Product>(
      `/api/v1/admin/products/${id}/status`
    );
    return response.data;
  },

  /**
   * PUT /api/v1/admin/products/{id}/publish
   * Publish a draft product
   */
  publishProduct: async (id: string): Promise<Product> => {
    const response = await adminApiClient.put<Product>(
      `/api/v1/admin/products/${id}/publish`
    );
    return response.data;
  },

  /**
   * PUT /api/v1/admin/products/{id}/unpublish
   * Convert a published product back to draft
   */
  unpublishProduct: async (id: string): Promise<Product> => {
    const response = await adminApiClient.put<Product>(
      `/api/v1/admin/products/${id}/unpublish`
    );
    return response.data;
  },

  /**
   * DELETE /api/v1/admin/products/{id}
   * Delete product
   */
  deleteProduct: async (id: string): Promise<void> => {
    await adminApiClient.delete(`/api/v1/admin/products/${id}`);
  },

  /**
   * GET /api/v1/admin/products/low-stock
   * Get products with low stock
   */
  getLowStockProducts: async (): Promise<LowStockItem[]> => {
    const response = await adminApiClient.get<LowStockItem[]>(
      '/api/v1/admin/products/low-stock'
    );
    return response.data;
  },

  /**
   * PUT /api/v1/admin/products/variants/{variantId}/stock
   * Update variant stock quantity
   */
  updateVariantStock: async (variantId: string, stock: number): Promise<void> => {
    await adminApiClient.put(`/api/v1/admin/products/variants/${variantId}/stock`, null, {
      params: { stock },
    });
  },

  /**
   * GET /api/v1/admin/products/statistics
   * Get product statistics
   */
  getProductStatistics: async (): Promise<ProductStatistics> => {
    const response = await adminApiClient.get<ProductStatistics>(
      '/api/v1/admin/products/statistics'
    );
    return response.data;
  },
};
