import { Product } from '@/lib/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    slug: 'classic-white-tshirt',
    description: 'Premium cotton t-shirt',
    basePrice: 29.99,
    sku: 'TSH-MEN-001',
    isCustomizable: true,
    material: 'Cotton',
    careInstructions: 'Machine wash cold',
    isActive: true,
    brandId: 'brand-1',
    categoryId: 'cat-men',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    variants: [
      {
        id: 'var-1',
        productId: '1',
        size: 'L',
        color: 'White',
        colorHex: '#FFFFFF',
        stock: 150,
        sku: 'TSH-MEN-001-L-WHT',
        isActive: true,
        images: []
      }
    ],
    category: { id: 'cat-men', name: 'Men', slug: 'men', parentId: null }
  },
  {
    id: '2',
    name: 'Floral Summer Dress',
    slug: 'floral-summer-dress',
    description: 'Beautiful floral dress',
    basePrice: 79.99,
    sku: 'DRS-WOM-002',
    isCustomizable: true,
    material: 'Polyester',
    careInstructions: 'Dry clean only',
    isActive: true,
    brandId: 'brand-2',
    categoryId: 'cat-women',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    variants: [
      {
        id: 'var-2',
        productId: '2',
        size: 'M',
        color: 'Floral',
        colorHex: '#FFB6C1',
        stock: 45,
        sku: 'DRS-WOM-002-M-FLR',
        isActive: true,
        images: []
      }
    ],
    category: { id: 'cat-women', name: 'Women', slug: 'women', parentId: null }
  },
  {
    id: '3',
    name: 'Kids Graphic Hoodie',
    slug: 'kids-graphic-hoodie',
    description: 'Fun graphic hoodie for kids',
    basePrice: 39.99,
    sku: 'HOD-KID-003',
    isCustomizable: false,
    material: 'Cotton Blend',
    careInstructions: 'Machine wash warm',
    isActive: true,
    brandId: 'brand-1',
    categoryId: 'cat-kids',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    variants: [
      {
        id: 'var-3',
        productId: '3',
        size: 'S',
        color: 'Blue',
        colorHex: '#0000FF',
        stock: 8,
        sku: 'HOD-KID-003-S-BLU',
        isActive: true,
        images: []
      }
    ],
    category: { id: 'cat-kids', name: 'Kids', slug: 'kids', parentId: null }
  }
];