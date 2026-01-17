// app/admin/products/page.tsx
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/components/products/product-table';
import { mockProducts } from '@/lib/mock/products';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog, variants, and inventory
          </p>
        </div>
        <Link href="/admin/products/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <ProductTable products={mockProducts} />
    </div>
  );
}