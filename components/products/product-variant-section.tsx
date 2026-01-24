// components/admin/products/product-variants-section.tsx
'use client';

import { useState } from 'react';
import { Plus, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      colorHex: '#000000',
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
      images: [],
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
    <Card className="border border-border shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 bg-muted/40">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">Product Variants</CardTitle>
            <Badge variant="secondary" className="text-xs font-medium">
              <Layers className="w-3 h-3 mr-1" />
              {variants.length} {variants.length === 1 ? 'Variant' : 'Variants'}
            </Badge>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            Manage sizes, colors, inventory, and images per variant
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddVariant}
          className="hover:bg-primary hover:text-primary-foreground transition-all shadow-sm h-9"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Variant
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
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
