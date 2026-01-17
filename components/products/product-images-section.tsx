// components/admin/products/product-images-section.tsx
'use client';

import { Image as ImageIcon, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AssetLibraryModal } from './asset-library-modal';
import { Asset } from '@/lib/types/asset';
import { useState } from 'react';

interface ProductImagesSectionProps {
  assets: Asset[];
  value: Asset[]; // images for THIS variant
  onChange: (assets: Asset[]) => void;
}

export function ProductImagesSection({
  assets,
  value,
  onChange,
}: ProductImagesSectionProps) {
  const [showAssetLibrary, setShowAssetLibrary] = useState(false);

  const handleRemoveAsset = (assetId: string) => {
    onChange(value.filter(asset => asset.id !== assetId));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Variant Images</CardTitle>
          <CardDescription>
            Images specific to this color variant
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAssetLibrary(true)}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Choose / Upload Images
          </Button>

          {value.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {value.map((asset) => (
                <div
                  key={asset.id}
                  className="relative aspect-square bg-muted rounded-md overflow-hidden border group"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                    {asset.name}
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveAsset(asset.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AssetLibraryModal
        open={showAssetLibrary}
        onOpenChange={setShowAssetLibrary}
        assets={assets}
        onApply={onChange}
      />
    </>
  );
}
