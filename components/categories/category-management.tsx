'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, FolderTree } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CategoryNode } from './category-node';
import { Category, CategoryFilter } from '@/lib/types/category';
import { calculateStats } from '@/lib/utils';

interface CategoryManagementClientProps {
    initialCategories: Category[];
}

// OPTIMIZATION 1: Normalize data structure for O(1) lookups
interface NormalizedCategories {
    byId: Map<string, Category>;
    roots: string[];
    childrenMap: Map<string, string[]>; // parentId -> childIds[]
}

function normalizeCategories(categories: Category[]): NormalizedCategories {
    const byId = new Map<string, Category>();
    const roots: string[] = [];
    const childrenMap = new Map<string, string[]>();

    const traverse = (cats: Category[], parentId: string | null = null) => {
        cats.forEach(cat => {
            byId.set(cat.id, cat);

            if (!parentId) {
                roots.push(cat.id);
            } else {
                const siblings = childrenMap.get(parentId) || [];
                childrenMap.set(parentId, [...siblings, cat.id]);
            }

            if (cat.children?.length) {
                traverse(cat.children, cat.id);
            }
        });
    };

    traverse(categories);
    return { byId, roots, childrenMap };
}

function denormalizeCategories(normalized: NormalizedCategories, rootIds?: string[]): Category[] {
    const { byId, roots, childrenMap } = normalized;
    const idsToProcess = rootIds || roots;

    return idsToProcess.map(id => {
        const cat = byId.get(id)!;
        const childIds = childrenMap.get(id) || [];

        return {
            ...cat,
            children: childIds.length ? denormalizeCategories(normalized, childIds) : undefined
        };
    });
}

// OPTIMIZATION 2: Use debounce hook for search
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

export function CategoryManagementClient({ initialCategories }: CategoryManagementClientProps) {
    const router = useRouter();

    // Store normalized structure internally
    const [normalized, setNormalized] = useState<NormalizedCategories>(() =>
        normalizeCategories(initialCategories)
    );

    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300); // OPTIMIZATION: Debounce search
    const [filterType, setFilterType] = useState<CategoryFilter>('all');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Convert to tree structure for display
    const categories = useMemo(() =>
        denormalizeCategories(normalized),
        [normalized]
    );

    const stats = useMemo(() => calculateStats(categories), [categories]);

    // OPTIMIZATION 3: Combined filter + search in single pass
    const filteredCategories = useMemo(() => {
        const { byId, roots, childrenMap } = normalized;

        // Early return if no filters
        if (!debouncedSearch && filterType === 'all') {
            return categories;
        }

        const matchesFilters = (cat: Category): boolean => {
            const typeMatch = filterType === 'all' || cat.rootType === filterType;
            const searchMatch = !debouncedSearch ||
                cat.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                cat.slug.toLowerCase().includes(debouncedSearch.toLowerCase());

            return typeMatch && searchMatch;
        };

        const filterTree = (ids: string[]): string[] => {
            return ids.filter(id => {
                const cat = byId.get(id)!;
                const selfMatches = matchesFilters(cat);
                const childIds = childrenMap.get(id) || [];
                const childrenMatch = childIds.length && filterTree(childIds).length > 0;

                return selfMatches || childrenMatch;
            });
        };

        const filteredRootIds = filterTree(roots);
        return denormalizeCategories(normalized, filteredRootIds);
    }, [normalized, debouncedSearch, filterType, categories]);

    // OPTIMIZATION 4: Memoize handlers with useCallback
    const handleCreateNew = useCallback(() => {
        router.push('/admin/categories/new');
    }, [router]);

    const handleEdit = useCallback((category: Category) => {
        router.push(`/admin/categories/${category.id}/edit`);
    }, [router]);

    const handleAddSub = useCallback((category: Category) => {
        router.push(`/admin/categories/new?parentId=${category.id}`);
    }, [router]);

    const handleDelete = useCallback((id: string) => {
        setDeleteId(id);
    }, []);

    // OPTIMIZATION 5: O(1) delete with normalized structure
    const confirmDelete = useCallback(() => {
        if (!deleteId) return;

        setNormalized(prev => {
            const { byId, roots, childrenMap } = prev;
            const newById = new Map(byId);
            const newChildrenMap = new Map(childrenMap);

            // Collect all IDs to delete (including descendants)
            const toDelete = new Set<string>();
            const collectDescendants = (id: string) => {
                toDelete.add(id);
                const children = childrenMap.get(id) || [];
                children.forEach(collectDescendants);
            };
            collectDescendants(deleteId);

            // Remove from maps
            toDelete.forEach(id => {
                newById.delete(id);
                newChildrenMap.delete(id);
            });

            // Remove from parent's children array
            newChildrenMap.forEach((children, parentId) => {
                const filtered = children.filter(id => !toDelete.has(id));
                newChildrenMap.set(parentId, filtered);
            });

            // Remove from roots if needed
            const newRoots = roots.filter(id => !toDelete.has(id));

            return { byId: newById, roots: newRoots, childrenMap: newChildrenMap };
        });

        setDeleteId(null);
    }, [deleteId]);

    // OPTIMIZATION 6: O(1) toggle with normalized structure
    const handleToggleActive = useCallback((id: string) => {
        setNormalized(prev => {
            const { byId, roots, childrenMap } = prev;
            const cat = byId.get(id);
            if (!cat) return prev;

            const newById = new Map(byId);
            newById.set(id, { ...cat, isActive: !cat.isActive });

            return { byId: newById, roots, childrenMap };
        });
    }, []);

    return (
        <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Category Management</h1>
                    <p className="text-muted-foreground">
                        Organize your product catalog with hierarchical categories. {stats.totalCategories} total, {stats.activeCategories} active.
                    </p>
                </div>
                <Button onClick={handleCreateNew} size="lg" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Category
                </Button>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
                {/* Search Bar */}
                <Card>
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search categories by name or slug..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Filter Tabs */}
                <Card>
                    <div className="flex items-center gap-1 p-1">
                        <Button
                            variant={filterType === 'all' ? 'default' : 'ghost'}
                            onClick={() => setFilterType('all')}
                            className="flex-1"
                        >
                            All ({stats.totalCategories})
                        </Button>
                        <Button
                            variant={filterType === 'men' ? 'default' : 'ghost'}
                            onClick={() => setFilterType('men')}
                            className="flex-1"
                        >
                            Men ({stats.menCategories})
                        </Button>
                        <Button
                            variant={filterType === 'women' ? 'default' : 'ghost'}
                            onClick={() => setFilterType('women')}
                            className="flex-1"
                        >
                            Women ({stats.womenCategories})
                        </Button>
                        <Button
                            variant={filterType === 'kids' ? 'default' : 'ghost'}
                            onClick={() => setFilterType('kids')}
                            className="flex-1"
                        >
                            Kids ({stats.kidsCategories})
                        </Button>
                    </div>
                </Card>

                {/* Categories Tree */}
                <Card>
                    <CardContent className="p-4">
                        {filteredCategories.length === 0 ? (
                            <div className="text-center py-12">
                                <FolderTree className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                <p className="text-muted-foreground">No categories found</p>
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
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
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
