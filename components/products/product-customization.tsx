// components/admin/products/product-customization.tsx
'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types/product';

interface ProductCustomizationProps {
  initialData?: Product;
}

export function ProductCustomization({ initialData }: ProductCustomizationProps) {
  const [isCustomizable, setIsCustomizable] = useState(initialData?.isCustomizable || false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customization Options</CardTitle>
        <CardDescription>
          Enable personalization features for this product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="customizable"
            checked={isCustomizable}
            onChange={(e) => setIsCustomizable(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
          <Label htmlFor="customizable" className="flex items-center gap-2 cursor-pointer font-normal">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Enable Customization (Embroidery, Design upload)
          </Label>
        </div>

        {isCustomizable && (
          <Badge className="admin-customization-badge">
            <Sparkles className="w-3 h-3" />
            Customizable Product
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}