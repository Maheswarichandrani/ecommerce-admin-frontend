/**
 * Product Types
 * All product-related type definitions
 */

// Product DTO
export interface Product {
  id: string;
  name: string;  // can show
  slug: string;
  description: string;
  basePrice: number;  // can show
  sku: string;
  isCustomizable: boolean;  // can show
  material?: string;
  careInstructions?: string;
  categoryId?: string;
  categoryName?: string;
  brandId?: string;
  brandName?: string;
  imageUrl?: string; // Primary image from first active variant
  averageRating?: number; // can show
  reviewCount?: number; // can show
  isActive: boolean;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminNeedExtraProductData {
  totalStock: number;
  totalOrders: number;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
}


export type ProductListItem = Product & AdminNeedExtraProductData;

// Variant Types
export interface ImageCreateRequest {
  imageUrl: string;
  altText?: string;
  displayOrder?: number;
  isPrimary?: boolean;
  imageRole?: string;
}

export interface VariantCreateRequest {
  color?: string;
  colorHex?: string;
  size?: string;
  length?: string;
  customizationOptions?: Record<string, string>;
  additionalPrice?: number;
  stockQuantity?: number;
  sku?: string;
  isActive?: boolean;
  images?: ImageCreateRequest[];
}

// Variant Image DTO (from backend)
export interface Image {
  id: string;
  imageUrl: string;
  altText?: string;
  displayOrder: number;
  isPrimary: boolean;
  imageRole?: string;
}

// Product Variant DTO (from backend - what getProductVariants returns)
export interface Variant {
  id: string;
  productId: string;
  color?: string;
  colorHex?: string;
  size?: string;
  stockQuantity: number;
  additionalPrice: number;
  sku: string;
  isActive: boolean;
  images: ImageDTO[];
  createdAt?: string;
  updatedAt?: string;
}

// Product Create Request
export interface ProductCreateRequest {
  name: string;
  slug: string;
  description?: string;
  basePrice: number;
  sku: string;
  isCustomizable?: boolean;
  material?: string;
  careInstructions?: string;
  categoryId?: string;
  brandId?: string;
  isDraft?: boolean;
  isActive?: boolean;
  variants?: VariantCreateRequest[];
}

// Product Update Request
export interface ProductUpdateRequest {
  name?: string;
  slug?: string;
  description?: string;
  basePrice?: number;
  sku?: string;
  isCustomizable?: boolean;
  material?: string;
  careInstructions?: string;
  categoryId?: string;
  brandId?: string;
  isDraft?: boolean;
  isActive?: boolean;
  variants?: VariantCreateRequest[];
}

// Product Query Params
export interface ProductQueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'ASC' | 'DESC';
  search?: string;
  isActive?: boolean;
  isDraft?: boolean;
  isCustomizable?: boolean;
  stockStatus?: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

// Product Statistics (returned as Map<String, Object> from backend)
export interface ProductStatistics {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  lowStockCount: number;
}

// Low Stock Item (returned as Map<String, Object> from backend)
export interface LowStockItem {
  variantId: string;
  productId: string;
  productName: string;
  size?: string;
  color?: string;
  currentStock: number;
  threshold: number;
}

