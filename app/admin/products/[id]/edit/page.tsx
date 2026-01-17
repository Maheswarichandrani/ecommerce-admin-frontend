// app/admin/products/[id]/edit/page.tsx
import { ProductFormPage } from '@/components/products/product-form';
import { mockAssets } from '@/lib/mock/assets';
import { mockProducts } from '@/lib/mock/products';
import { notFound } from 'next/navigation';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = params;

  // In real app: fetch from backend
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <ProductFormPage
      mode="edit"
      assets={mockAssets}
      initialData={product}
    />
  );
}
