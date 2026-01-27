// components/admin/products/product-form-page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductBasicInfo } from '@/components/products/product-basic-info';
import { ProductCustomization } from '@/components/products/product-customization';
import { ProductVariantsSection } from '@/components/products/product-variant-section';
import { Asset } from '@/types/asset';
import { Product } from '@/types/product';

interface ProductFormPageProps {
  mode: 'create' | 'edit';
  assets: Asset[];
  initialData?: Product;
}

export function ProductFormPage({ mode, assets, initialData }: ProductFormPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In real app: send data to API
    console.log('Form submitted');

    setIsSubmitting(false);
    router.push('/admin/products');
  };

  const handleCancel = () => {
    router.push('/admin/products');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {mode === 'create' ? 'Create New Product' : 'Edit Product'}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === 'create'
                    ? 'Add a new product to your catalog with variants and customization'
                    : 'Update product details, variants, and settings'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                size="default"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="default"
                className="min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {mode === 'create' ? 'Create Product' : 'Save Changes'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content with Professional Spacing */}
      <div className="container mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
          <ProductBasicInfo initialData={initialData} />
          <ProductCustomization initialData={initialData} />
          <ProductVariantsSection assets={assets} initialData={initialData} />

          {/* Bottom Action Bar */}
          <div className="sticky bottom-0 py-4 bg-background/95 backdrop-blur mt-8">
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}