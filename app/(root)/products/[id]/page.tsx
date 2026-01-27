// app/admin/products/[id]/page.tsx
import { ProductDetailsView } from '@/components/products/product-details-view';
import { mockProducts } from '@/lib/mock/products';
import { notFound } from 'next/navigation';

interface ProductDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
    const { id } = params;

    // In real app: fetch from backend
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    return <ProductDetailsView product={product} />;
}
