'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryForm } from '@/components/categories/category-form';
import { MOCK_CATEGORIES } from '@/lib/mock/category';
import { CategoryFormData } from '@/lib/types/category';

export default function NewCategoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const parentId = searchParams.get('parentId');

    const allCategories = MOCK_CATEGORIES;
    const parentCategory = parentId
        ? allCategories.find(c => c.id === parentId)
        : undefined;

    const handleSubmit = async (data: CategoryFormData) => {
        // In real app, save to database
        console.log('Creating category:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/admin/categories');
    };

    const handleCancel = () => {
        router.push('/admin/categories');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold p-3">
                        {parentCategory ? 'Add Sub-Category' : 'Create New Category'}
                    </h1>
                    {parentCategory && (
                        <p className="text-muted-foreground mt-1">
                            Parent: {parentCategory.name}
                        </p>
                    )}
                </div>
            </div>

            <CategoryForm
                mode={parentCategory ? 'create-sub' : 'create'}
                parentCategory={parentCategory}
                allCategories={allCategories}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
}
