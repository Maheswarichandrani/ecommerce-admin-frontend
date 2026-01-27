// components/admin/products/product-basic-info.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { MOCK_CATEGORIES } from '@/lib/mock/category';
import { RootType } from '@/types/category';

interface ProductBasicInfoProps {
  initialData?: Product;
}

export function ProductBasicInfo({ initialData }: ProductBasicInfoProps) {
  const [rootType, setRootType] = useState<RootType | ''>(initialData?.category?.rootType || '');
  const [parentCategory, setParentCategory] = useState(initialData?.category?.parentId || '');

  // Get root categories based on selected root type
  const rootCategories = MOCK_CATEGORIES.filter(
    cat => cat.parentId === null && (!rootType || cat.rootType === rootType)
  );

  // Get subcategories based on selected parent
  const subCategories = parentCategory
    ? MOCK_CATEGORIES.find(cat => cat.id === parentCategory)?.children || []
    : [];

  return (
    <Card className="border border-border shadow-sm bg-card">
      <CardHeader className="space-y-1.5 pb-5 border-b bg-muted/40">
        <CardTitle className="text-lg font-semibold text-foreground">Basic Information</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter the core details about your product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Product Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
              defaultValue={initialData?.name}
              required
            />
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku">
              SKU <span className="text-destructive">*</span>
            </Label>
            <Input
              id="sku"
              placeholder="e.g., TSH-MEN-001"
              defaultValue={initialData?.sku}
              required
            />
          </div>

          {/* Root Type (Men/Women/Kids) */}
          <div className="space-y-2">
            <Label htmlFor="rootType" className="text-sm font-medium">
              Category Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={rootType}
              onValueChange={(value) => {
                setRootType(value as RootType);
                setParentCategory(''); // Reset subcategories
              }}
            >
              <SelectTrigger id="rootType" className="h-10">
                <SelectValue placeholder="Select category type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="men">👔 Men</SelectItem>
                <SelectItem value="women">👗 Women</SelectItem>
                <SelectItem value="kids">👶 Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Parent Category (Topwear/Bottomwear etc) */}
          <div className="space-y-2">
            <Label htmlFor="parentCategory" className="text-sm font-medium">
              Main Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={parentCategory}
              onValueChange={setParentCategory}
              disabled={!rootType}
            >
              <SelectTrigger id="parentCategory" className="h-10">
                <SelectValue placeholder={rootType ? "Select main category" : "Select type first"} />
              </SelectTrigger>
              <SelectContent>
                {rootCategories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subcategory (Optional) */}
          {subCategories.length > 0 && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="subcategory" className="text-sm font-medium">
                Sub Category <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <Select>
                <SelectTrigger id="subcategory" className="h-10">
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map(subCat => (
                    <SelectItem key={subCat.id} value={subCat.id}>
                      {subCat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Category Preview */}
          {rootType && parentCategory && (
            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-2 block">Category Path</Label>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary">{rootType.toUpperCase()}</Badge>
                <span className="text-muted-foreground">→</span>
                <Badge variant="outline">
                  {rootCategories.find(c => c.id === parentCategory)?.name}
                </Badge>
              </div>
            </div>
          )}

          {/* Brand */}
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select defaultValue={initialData?.brand ? undefined : ''}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="armoire">Armoire</SelectItem>
                <SelectItem value="nike">Nike</SelectItem>
                <SelectItem value="adidas">Adidas</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Base Price */}
          <div className="space-y-2">
            <Label htmlFor="price">
              Base Price <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              defaultValue={initialData?.basePrice}
              required
            />
          </div>

          {/* Material */}
          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              placeholder="e.g., Cotton, Polyester"
              defaultValue={initialData?.material ?? ''}
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Product description"
              rows={4}
              defaultValue={initialData?.description ?? ''}
              className="resize-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}