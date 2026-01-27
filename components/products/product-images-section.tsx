// components/admin/products/product-images-section.tsx
'use client';

import { Image as ImageIcon, X, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AssetLibraryModal } from './asset-library-modal';
import { Asset } from '@/types/asset';
import { useState } from 'react';

interface ProductImagesSectionProps {
  assets: Asset[];
  value: Asset[];
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
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Variant Images</Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add images specific to this color variant
            </p>
          </div>
          {value.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {value.length} {value.length === 1 ? 'Image' : 'Images'}
            </Badge>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAssetLibrary(true)}
          className="w-full h-10 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          {value.length > 0 ? 'Add More Images' : 'Choose Images'}
        </Button>

        {value.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
            {value.map((asset) => (
              <div
                key={asset.id}
                className="relative aspect-square bg-muted rounded-lg overflow-hidden border border-border group hover:border-primary transition-colors"
              >
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs p-2 truncate">
                  {asset.name}
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  onClick={() => handleRemoveAsset(asset.id)}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AssetLibraryModal
        open={showAssetLibrary}
        onOpenChange={setShowAssetLibrary}
        assets={assets}
        onApply={onChange}
      />
    </>
  );
}

function Label({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) {
  return <label className={className} {...props} />;
}
