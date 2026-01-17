// components/admin/products/product-form-page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductBasicInfo } from '@/components/products/product-basic-info';
import { ProductCustomization } from '@/components/products/product-customization';
import { ProductVariantsSection } from '@/components/products/product-variant-section';
import { Asset } from '@/lib/types/asset';
import { Product } from '@/lib/types/product';

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
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleCancel}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl text-accent-foreground font-semibold">
                  {mode === 'create' ? 'Add New Product' : 'Edit Product'}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {mode === 'create' 
                    ? 'Create a new product with variants and customization options' 
                    : 'Update product information and settings'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isSubmitting}
                className='text-accent-foreground'
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
          <ProductBasicInfo initialData={initialData} />
          <ProductCustomization initialData={initialData} />
          <ProductVariantsSection assets={assets} initialData={initialData} />
        </form>
      </div>
    </div>
  );
}