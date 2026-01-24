// components/admin/products/product-customization.tsx
'use client';

import { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';
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
    <Card className="border border-border shadow-sm bg-card">
      <CardHeader className="space-y-1.5 pb-5 border-b bg-muted/40">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold text-foreground">Customization Options</CardTitle>
          <Badge variant="secondary" className="text-xs font-medium">
            <Sparkles className="w-3 h-3 mr-1" />
            Premium Feature
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Enable personalization features for this product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
          <input
            type="checkbox"
            id="customizable"
            checked={isCustomizable}
            onChange={(e) => setIsCustomizable(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
          />
          <div className="flex-1">
            <Label htmlFor="customizable" className="flex items-center gap-2 cursor-pointer font-medium text-base">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Enable Product Customization
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Allow customers to personalize this product with embroidery, custom designs, and text
            </p>
          </div>
        </div>

        {isCustomizable && (
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-medium text-purple-900 dark:text-purple-100">
                  Customization Features Enabled
                </h4>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple-600"></span>
                    Custom embroidery with text and positioning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple-600"></span>
                    Design file upload (PNG, SVG, AI)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple-600"></span>
                    Font and color selection options
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple-600"></span>
                    Real-time preview for customers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}