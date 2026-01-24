'use client';

import { useState } from 'react';
import { Search, Upload, Check, Image as ImageIcon, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      <DialogContent className="max-w-7xl max-h-[95vh] w-[95vw]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">Image Asset Library</DialogTitle>
          <DialogDescription className="text-base">Choose from existing images or upload new ones for your products</DialogDescription>
        </DialogHeader>

        <Tabs value={assetTab} onValueChange={setAssetTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="library" className="gap-2 text-base">
              <ImageIcon className="w-5 h-5" />
              Asset Library
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2 text-base">
              <Upload className="w-5 h-5" />
              Upload New
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-5 mt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search images by name..." className="pl-10 h-11 text-base" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48 h-11">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="variant">Variant</SelectItem>
                  <SelectItem value="preview">Preview</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-h-[50vh] overflow-y-auto p-1 pr-2">
              {assets.map((asset) => {
                const isSelected = selectedAssets.some(a => a.id === asset.id);
                return (
                  <div
                    key={asset.id}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${isSelected
                      ? 'border-primary shadow-lg scale-[0.97] ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                      }`}
                    onClick={() => handleAssetToggle(asset)}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/50 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground opacity-40" />
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                          <Check className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white text-sm p-3 truncate font-medium">
                      {asset.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedAssets.length > 0 && (
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Badge variant="default" className="text-base px-3 py-1">
                  {selectedAssets.length} Selected
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAssets([])}
                  className="ml-auto h-9 text-sm"
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <div className="border-2 border-dashed border-border rounded-xl p-16 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="p-6 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-lg font-semibold mt-6">Click to upload or drag and drop</p>
              <p className="text-base text-muted-foreground mt-3">
                PNG, JPG, WEBP up to 10MB
              </p>
              <Button className="mt-6 h-11 px-6" size="default">
                Browse Files
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-11 px-6">
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={selectedAssets.length === 0} className="h-11 px-6">
            Apply Selection ({selectedAssets.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
