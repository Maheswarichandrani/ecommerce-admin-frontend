// components/admin/products/variant-form.tsx
'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductImagesSection } from './product-images-section';
import { Asset } from '@/lib/types/asset';

export type VariantFormState = {
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
  images: Asset[];
};

interface VariantFormProps {
  value: VariantFormState;
  assets: Asset[];
  onChange: (value: VariantFormState) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function VariantForm({
  value,
  assets,
  onChange,
  onRemove,
  canRemove,
}: VariantFormProps) {
  return (
    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 bg-muted/40 border-b">
        <CardTitle className="text-base font-semibold text-foreground">
          Variant Configuration
        </CardTitle>

        {canRemove && (
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={onRemove}
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Variant fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Size <span className="text-destructive">*</span>
            </Label>
            <Select
              value={value.size}
              onValueChange={(size) =>
                onChange({ ...value, size })
              }
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {['xs', 's', 'm', 'l', 'xl', 'xxl', '3xl'].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Color <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value.colorHex}
                onChange={(e) =>
                  onChange({ ...value, colorHex: e.target.value })
                }
                className="w-12 h-10 rounded-md border border-border cursor-pointer bg-background"
              />
              <Input
                placeholder="Color name"
                value={value.color}
                onChange={(e) =>
                  onChange({ ...value, color: e.target.value })
                }
                className="h-10"
              />
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Stock Quantity <span className="text-destructive">*</span>
            </Label>
            <Input
              type="number"
              min={0}
              value={value.stock}
              onChange={(e) =>
                onChange({ ...value, stock: Number(e.target.value) })
              }
              className="h-10"
            />
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Variant SKU <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="VAR-SKU-001"
              value={value.sku}
              onChange={(e) =>
                onChange({ ...value, sku: e.target.value })
              }
              className="h-10 font-mono"
            />
          </div>
        </div>

        {/* Variant Images */}
        <ProductImagesSection
          assets={assets}
          value={value.images}
          onChange={(images) =>
            onChange({ ...value, images })
          }
        />
      </CardContent>
    </Card>
  );
}
