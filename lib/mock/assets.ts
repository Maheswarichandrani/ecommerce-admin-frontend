import { Asset } from '@/lib/types/asset';

export const mockAssets: Asset[] = Array.from({ length: 12 }, (_, i) => ({
  id: `asset-${i + 1}`,
  url: null,
  name: `Product Image ${i + 1}`,
  type: (i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'variant' : 'preview') as 'primary' | 'variant' | 'preview'
}));