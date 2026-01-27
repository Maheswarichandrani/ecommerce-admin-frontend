export type RootType = 'men' | 'women' | 'kids';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  sku: string;
  isCustomizable: boolean;
  material: string | null;
  careInstructions: string | null;
  isActive: boolean;
  brandId: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
  category?: Category;
  brand?: Brand;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
  isActive: boolean;
  images: ProductImage[];
}

export interface ProductImage {
  id: string;
  variantId: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  rootType: RootType;
  parentId: string | null;
  imageUrl?: string;
  isActive: boolean;
  productCount: number;
  order: number;
  level: number;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}