'use client';

import React, { useState, useMemo } from 'react';
import { FolderTree, Plus, Search, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Category, CategoryFilter, CategoryFormData, FormMode } from '@/lib/types/category';
import { calculateStats, flattenCategories } from '@/lib/utils';
import { CategoryForm } from './category-form';
import { CategoryNode } from './category-node';

interface CategoryManagementClientProps {
  initialCategories: Category[];
}

export function CategoryManagementClient({ initialCategories }: CategoryManagementClientProps) {

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<CategoryFilter>('all');
  const [formMode, setFormMode] = useState<FormMode | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [parentForSub, setParentForSub] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const stats = useMemo(() => calculateStats(categories), [categories]);

  const filteredCategories = useMemo(() => {
    let filtered = categories;

    if (filterType !== 'all') {
      const filterRecursive = (cats: Category[]): Category[] => {
        return cats
          .filter(cat => cat.rootType === filterType)
          .map(cat => ({
            ...cat,
            children: cat.children ? filterRecursive(cat.children) : undefined
          }));
      };
      filtered = filterRecursive(filtered);
    }

    if (searchQuery) {
      const searchRecursive = (cats: Category[]): Category[] => {
        return cats.filter(cat => {
          const matches = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.slug.toLowerCase().includes(searchQuery.toLowerCase());
          const childMatches = cat.children ? searchRecursive(cat.children).length > 0 : false;
          return matches || childMatches;
        }).map(cat => ({
          ...cat,
          children: cat.children ? searchRecursive(cat.children) : undefined
        }));
      };
      filtered = searchRecursive(filtered);
    }

    return filtered;
  }, [categories, searchQuery, filterType]);

  const handleCreateNew = () => {
    setFormMode('create');
    setSelectedCategory(null);
    setParentForSub(null);
  };

  const handleEdit = (category: Category) => {
    setFormMode('edit');
    setSelectedCategory(category);
    setParentForSub(null);
  };

  const handleAddSub = (category: Category) => {
    setFormMode('create-sub');
    setSelectedCategory(null);
    setParentForSub(category);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (!deleteId) return;

    const deleteRecursive = (cats: Category[]): Category[] => {
      return cats
        .filter(cat => cat.id !== deleteId)
        .map(cat => ({
          ...cat,
          children: cat.children ? deleteRecursive(cat.children) : undefined
        }));
    };
    setCategories(deleteRecursive(categories));
    setDeleteId(null);
  };

  const handleToggleActive = (id: string) => {
    const toggleRecursive = (cats: Category[]): Category[] => {
      return cats.map(cat => {
        if (cat.id === id) {
          return { ...cat, isActive: !cat.isActive };
        }
        return { ...cat, children: cat.children ? toggleRecursive(cat.children) : undefined };
      });
    };
    setCategories(toggleRecursive(categories));
  };

  const handleFormSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formMode === 'edit' && selectedCategory) {
      const updateRecursive = (cats: Category[]): Category[] => {
        return cats.map(cat => {
          if (cat.id === selectedCategory.id) {
            return {
              ...cat,
              ...data,
              updatedAt: new Date().toISOString()
            };
          }
          return { ...cat, children: cat.children ? updateRecursive(cat.children) : undefined };
        });
      };
      setCategories(updateRecursive(categories));
    } else {
      const parentCategory = data.parentId ? flattenCategories(categories).find(c => c.id === data.parentId) : null;
      const newCategory: Category = {
        id: Date.now().toString(),
        ...data,
        productCount: 0,
        order: 1,
        level: parentCategory ? parentCategory.level + 1 : 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (data.parentId) {
        const addToParent = (cats: Category[]): Category[] => {
          return cats.map(cat => {
            if (cat.id === data.parentId) {
              return {
                ...cat,
                children: [...(cat.children || []), newCategory].sort((a, b) => a.order - b.order)
              };
            }
            return { ...cat, children: cat.children ? addToParent(cat.children) : undefined };
          });
        };
        setCategories(addToParent(categories));
      } else {
        setCategories([...categories, newCategory].sort((a, b) => a.order - b.order));
      }
    }

    setIsSubmitting(false);
    setFormMode(null);
    setSelectedCategory(null);
    setParentForSub(null);
  };

  const handleCancel = () => {
    setFormMode(null);
    setSelectedCategory(null);
    setParentForSub(null);
  };

  return (
    <div className="min-h-screen bg-background p-2">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2 text-accent-foreground">Category Management</h1>
        <p className="text-muted-foreground">
          Organize your product catalog with hierarchical categories. {stats.totalCategories} total, {stats.activeCategories} active.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 mx-auto">
        {/* Left Panel - Categories List */}
        <div className="space-y-6">
          {/* Search & Actions Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search categories..."
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Button onClick={handleCreateNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Category
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 border-b text-accent-foreground">
            <Button
              variant="ghost"
              onClick={() => setFilterType('all')}
              className={`rounded-none border-b-2 ${
                filterType === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent'
              }`}
            >
              All ({stats.totalCategories})
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFilterType('men')}
              className={`rounded-none border-b-2 ${
                filterType === 'men'
                  ? 'border-primary text-primary'
                  : 'border-transparent'
              }`}
            >
              Men ({stats.menCategories})
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFilterType('women')}
              className={`rounded-none border-b-2 ${
                filterType === 'women'
                  ? 'border-primary text-primary'
                  : 'border-transparent'
              }`}
            >
              Women ({stats.womenCategories})
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFilterType('kids')}
              className={`rounded-none border-b-2 ${
                filterType === 'kids'
                  ? 'border-primary text-primary'
                  : 'border-transparent'
              }`}
            >
              Kids ({stats.kidsCategories})
            </Button>
          </div>

          {/* Categories Tree */}
          <Card>
            <CardContent className="p-2">
              {filteredCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FolderTree className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="font-medium">No categories found</p>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredCategories.map(category => (
                    <CategoryNode
                      key={category.id}
                      category={category}
                      onEdit={handleEdit}
                      onAddSub={handleAddSub}
                      onDelete={handleDelete}
                      onToggleActive={handleToggleActive}
                      selectedId={selectedCategory?.id}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          {formMode ? (
            <CategoryForm
              mode={formMode}
              initialData={selectedCategory ?? undefined}
              parentCategory={parentForSub ?? undefined}
              allCategories={categories}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderTree className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Category Selected</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Select a category to edit or create a new one to get started
                </p>
                <Button onClick={handleCreateNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Category
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category and all its sub-categories. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}