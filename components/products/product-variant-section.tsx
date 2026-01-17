// components/admin/products/product-variants-section.tsx
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VariantForm } from './variant-form';
import { Product, ProductVariant } from '@/lib/types/product';
import { Asset } from '@/lib/types/asset';

type VariantFormState = {
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
  images: Asset[];
};

interface ProductVariantsSectionProps {
  assets: Asset[];
  initialData?: Product;
}

export function ProductVariantsSection({ assets, initialData }: ProductVariantsSectionProps) {
  const [variants, setVariants] = useState<VariantFormState[]>(
    initialData?.variants?.length
      ? initialData.variants.map(mapVariantToFormState)
      : [createEmptyVariant()]
  );

  function createEmptyVariant(): VariantFormState {
    return {
      size: '',
      color: '',
      colorHex: '',
      stock: 0,
      sku: '',
      images: [],
    };
  }

  function mapVariantToFormState(variant: ProductVariant): VariantFormState {
    return {
      size: variant.size,
      color: variant.color,
      colorHex: variant.colorHex,
      stock: variant.stock,
      sku: variant.sku,
      images: [], // map ProductImage → Asset later if needed
    };
  }

  const handleAddVariant = () => {
    setVariants(prev => [...prev, createEmptyVariant()]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length === 1) return;
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, updated: VariantFormState) => {
    setVariants(prev =>
      prev.map((v, i) => (i === index ? updated : v))
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Variants</CardTitle>
          <CardDescription>
            Manage sizes, colors, inventory, and images per variant
          </CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleAddVariant}>
          <Plus className="w-4 h-4 mr-2" />
          Add Variant
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {variants.map((variant, index) => (
          <VariantForm
            key={index}
            value={variant}
            assets={assets}
            canRemove={variants.length > 1}
            onRemove={() => handleRemoveVariant(index)}
            onChange={(updated) => updateVariant(index, updated)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
