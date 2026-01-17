'use client';

import React, { useState, useMemo } from 'react';
import { Save, Loader2, Upload, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, CategoryFormData, FormMode, RootType } from '@/lib/types/category';
import { generateSlug, flattenCategories } from '@/lib/utils';
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

  const handleImageUpload = () => {
    const urls = [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    ];
    setFormData(prev => ({ ...prev, imageUrl: urls[Math.floor(Math.random() * urls.length)] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getTitle = () => {
    if (mode === 'create') return 'Create New Category';
    if (mode === 'create-sub') return `Add Sub-Category`;
    return 'Edit Category';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        {mode === 'create-sub' && parentCategory && (
          <CardDescription>
            Parent: {parentCategory.name} ({parentCategory.rootType})
          </CardDescription>
        )}
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name">
              Category Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Shirts, Dresses, Jeans"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="category-url-slug"
              className="font-mono"
              required
            />
            <p className="text-xs text-muted-foreground">URL-friendly identifier (auto-generated)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rootType">
              Root Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.rootType}
              onValueChange={(value: RootType) => setFormData(prev => ({ ...prev, rootType: value, parentId: null }))}
              disabled={mode === 'create-sub'}
            >
              <SelectTrigger id="rootType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {mode === 'create-sub' ? 'Inherited from parent category' : 'Main category type'}
            </p>
          </div>

          {mode !== 'create-sub' && (
            <div className="space-y-2">
              <Label htmlFor="parentId">Parent Category</Label>
              <Select
                value={formData.parentId || 'none'}
                onValueChange={(value) => setFormData(prev => ({ ...prev, parentId: value === 'none' ? null : value }))}
              >
                <SelectTrigger id="parentId">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Root Category)</SelectItem>
                  {availableParents.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name} {cat.level > 0 ? `(Level ${cat.level})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Leave as None for top-level category</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of this category..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Category Image</Label>
            <div
              className={`relative w-full aspect-video rounded-lg border-2 border-dashed ${formData.imageUrl ? 'border-border' : 'border-border hover:border-primary'} bg-muted/30 flex items-center justify-center cursor-pointer transition-all overflow-hidden`}
              onClick={handleImageUpload}
            >
              {formData.imageUrl ? (
                <>
                  <Image src={formData.imageUrl} alt="Category" width={800} height={600} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="text-white text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm font-medium">Change Image</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium">Click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">Recommended: 800x600px</p>
                </div>
              )}
            </div>
            {formData.imageUrl && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setFormData(prev => ({ ...prev, imageUrl: undefined }));
                }}
                className="text-xs text-destructive hover:text-destructive"
              >
                Remove Image
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">Inactive categories wont appear on the website</p>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.slug}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {mode === 'edit' ? 'Update' : 'Create'}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};