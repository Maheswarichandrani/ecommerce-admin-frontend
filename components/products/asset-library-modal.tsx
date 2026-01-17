'use client';

import { useState } from 'react';
import { Search, Upload, Check, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Asset } from '@/lib/types/asset';

interface AssetLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assets: Asset[];
  onApply: (selectedAssets: Asset[]) => void;
}

export function AssetLibraryModal({ open, onOpenChange, assets, onApply }: AssetLibraryModalProps) {
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [assetTab, setAssetTab] = useState('library');

  const handleAssetToggle = (asset: Asset) => {
    const isSelected = selectedAssets.some(a => a.id === asset.id);
    if (isSelected) {
      setSelectedAssets(prev => prev.filter(a => a.id !== asset.id));
    } else {
      setSelectedAssets(prev => [...prev, asset]);
    }
  };

  const handleApply = () => {
    onApply(selectedAssets);
    setSelectedAssets([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Image Asset Library</DialogTitle>
          <DialogDescription>Choose from existing images or upload new ones</DialogDescription>
        </DialogHeader>

        <Tabs value={assetTab} onValueChange={setAssetTab}>
          <TabsList>
            <TabsTrigger value="library">Asset Library</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            <div className="admin-asset-search">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search images..." className="pl-9" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="variant">Variant</SelectItem>
                  <SelectItem value="preview">Preview</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="admin-asset-grid max-h-96 overflow-y-auto">
              {assets.map((asset) => {
                const isSelected = selectedAssets.some(a => a.id === asset.id);
                return (
                  <div
                    key={asset.id}
                    className={`admin-asset-item ${isSelected ? 'admin-asset-item-selected' : ''}`}
                    onClick={() => handleAssetToggle(asset)}
                  >
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    {isSelected && (
                      <Check className="absolute top-2 right-2 w-5 h-5 bg-primary text-white rounded-full p-1" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                      {asset.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <div className="admin-asset-upload">
              <Upload className="admin-asset-upload-icon" />
              <p className="admin-asset-upload-text">Click to upload or drag and drop</p>
              <p className="admin-asset-upload-hint">PNG, JPG up to 10MB</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleApply}>
            Apply ({selectedAssets.length} selected)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
