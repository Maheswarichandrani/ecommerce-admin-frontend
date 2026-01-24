'use client';

import React, { useState, useMemo } from 'react';
import { Save, Loader2, Upload, X, Image as ImageLucide } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Category, CategoryFormData, FormMode, RootType } from '@/lib/types/category';
import { generateSlug, flattenCategories } from '@/lib/utils';
import { AssetLibraryModal } from '@/components/products/asset-library-modal';
import { mockAssets } from '@/lib/mock/assets';
import Image from 'next/image';

interface CategoryFormProps {
  mode: FormMode;
  initialData?: Category;
  parentCategory?: Category;
  allCategories: Category[];
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  mode,
  initialData,
  parentCategory,
  allCategories,
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    rootType: mode === 'create-sub' && parentCategory ? parentCategory.rootType : (initialData?.rootType || 'men'),
    parentId: mode === 'create-sub' ? parentCategory?.id || null : initialData?.parentId || null,
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl,
    isActive: initialData?.isActive ?? true,
  });

  const [showAssetModal, setShowAssetModal] = useState(false);

  const flatCategories = useMemo(() => flattenCategories(allCategories), [allCategories]);
  const availableParents = flatCategories.filter(c =>
    c.rootType === formData.rootType && c.id !== initialData?.id
  );

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: mode === 'create' || mode === 'create-sub' ? generateSlug(name) : prev.slug
    }));
  };

  const handleImageSelect = (selectedAssets: typeof mockAssets) => {
    if (selectedAssets.length > 0) {
      setFormData(prev => ({ ...prev, imageUrl: selectedAssets[0].url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto shadow-sm">
        {/* <CardHeader className="space-y-3 pb-3">
          <div className="flex items-center justify-between">
            <div>
              {mode === 'create-sub' && parentCategory && (
                <CardDescription className="text-base mt-2">
                  Parent category: <span className="font-semibold text-foreground">{parentCategory.name}</span> <span className="text-muted-foreground">({parentCategory.rootType})</span>
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader> */}

        <form onSubmit={handleSubmit}>
          <CardContent className="pt-8 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    Basic Information
                  </h3>
                  <div className="space-y-5">
                    <div className="space-y-2.5">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Category Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g., Shirts, Dresses, Jeans"
                        className="h-11 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2.5">
                      <Label htmlFor="slug" className="text-sm font-medium">
                        URL Slug <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="category-url-slug"
                        className="font-mono h-11 text-base"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Auto-generated from name, used in URLs</p>
                    </div>

                    <div className="space-y-2.5">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of this category..."
                        rows={5}
                        className="resize-none text-base"
                      />
                      <p className="text-xs text-muted-foreground">Optional description for better SEO</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    Category Settings
                  </h3>
                  <div className="space-y-5">
                    <div className="space-y-2.5">
                      <Label htmlFor="rootType" className="text-sm font-medium">
                        Root Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.rootType}
                        onValueChange={(value: RootType) => setFormData(prev => ({ ...prev, rootType: value, parentId: null }))}
                        disabled={mode === 'create-sub'}
                      >
                        <SelectTrigger id="rootType" className="h-11 text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="men">Mens Collection</SelectItem>
                          <SelectItem value="women">Womens Collection</SelectItem>
                          <SelectItem value="kids">Kids Collection</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {mode === 'create-sub' ? 'Inherited from parent category' : 'Main category type for filtering products'}
                      </p>
                    </div>

                    {mode !== 'create-sub' && (
                      <div className="space-y-2.5">
                        <Label htmlFor="parentId" className="text-sm font-medium">
                          Parent Category
                        </Label>
                        <Select
                          value={formData.parentId || 'none'}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, parentId: value === 'none' ? null : value }))}
                        >
                          <SelectTrigger id="parentId" className="h-11 text-base">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None (Root Category)</SelectItem>
                            {availableParents.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {'└─ '.repeat(cat.level)}{cat.name} {cat.level > 0 ? `(Level ${cat.level})` : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">Select None for top-level category</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="space-y-0.5">
                        <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                          Active Status
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Inactive categories wont appear on the website
                        </p>
                      </div>
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    Category Image
                  </h3>
                  <div className="space-y-4">
                    {formData.imageUrl ? (
                      <div className="relative group">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-border bg-muted">
                          <Image
                            src={formData.imageUrl}
                            alt="Category"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                            <Button
                              type="button"
                              variant="secondary"
                              size="lg"
                              onClick={() => setShowAssetModal(true)}
                              className="gap-2 shadow-lg"
                            >
                              <ImageLucide className="w-5 h-5" />
                              Change
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="lg"
                              onClick={() => setFormData(prev => ({ ...prev, imageUrl: undefined }))}
                              className="gap-2 shadow-lg"
                            >
                              <X className="w-5 h-5" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="relative aspect-[4/3] rounded-xl border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 bg-muted/30 hover:bg-muted/50 flex items-center justify-center cursor-pointer transition-all group"
                        onClick={() => setShowAssetModal(true)}
                      >
                        <div className="text-center p-8">
                          <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                            <Upload className="w-10 h-10 text-primary" />
                          </div>
                          <p className="text-lg font-semibold mb-2">Click to select an image</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Choose from asset library or upload new
                          </p>
                          <p className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full inline-block">
                            Recommended: 800x600px or higher
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        <strong>💡 Tip:</strong> High-quality images help customers better understand your category and improve engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <Separator />

          <CardFooter className="flex items-center justify-between gap-4 py-6">
            <div className="text-sm text-muted-foreground">
              <span className="text-destructive">*</span> Required fields
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                size="lg"
                className="min-w-[120px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.slug}
                size="lg"
                className=" gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {mode === 'edit' ? 'Update Category' : 'Create Category'}
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>

      <AssetLibraryModal
        open={showAssetModal}
        onOpenChange={setShowAssetModal}
        assets={mockAssets}
        onApply={handleImageSelect}
      />
    </>
  );
}