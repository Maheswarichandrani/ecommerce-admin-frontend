import { ProductFormPage } from '@/components/products/product-form';
import { mockAssets } from '@/lib/mock/assets';

export default function AddProductPage() {
  return (
    <ProductFormPage 
      mode="create" 
      assets={mockAssets}
    />
  );
}