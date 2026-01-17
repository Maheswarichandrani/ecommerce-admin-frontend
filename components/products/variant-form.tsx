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
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold">
          Variant
        </CardTitle>

        {canRemove && (
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={onRemove}
            className="h-8 w-8"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Variant fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Size */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase text-muted-foreground">
              Size
            </Label>
            <Select
              value={value.size}
              onValueChange={(size) =>
                onChange({ ...value, size })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {['xs', 's', 'm', 'l', 'xl', 'xxl'].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase text-muted-foreground">
              Color
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value.colorHex}
                onChange={(e) =>
                  onChange({ ...value, colorHex: e.target.value })
                }
                className="w-10 h-10 rounded-md border cursor-pointer"
              />
              <Input
                placeholder="Color name"
                value={value.color}
                onChange={(e) =>
                  onChange({ ...value, color: e.target.value })
                }
              />
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase text-muted-foreground">
              Stock
            </Label>
            <Input
              type="number"
              min={0}
              value={value.stock}
              onChange={(e) =>
                onChange({ ...value, stock: Number(e.target.value) })
              }
            />
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase text-muted-foreground">
              SKU
            </Label>
            <Input
              placeholder="VAR-SKU"
              value={value.sku}
              onChange={(e) =>
                onChange({ ...value, sku: e.target.value })
              }
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
