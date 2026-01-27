'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryForm } from '@/components/categories/category-form';
import { MOCK_CATEGORIES } from '@/lib/mock/category';
import { CategoryFormData } from '@/types/category';
import { flattenCategories } from '@/lib/utils';

interface EditCategoryPageProps {
    params: Promise<{ id: string }>;
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
    const { id } = use(params);
    const router = useRouter();

    const allCategories = MOCK_CATEGORIES;
    const flatCategories = flattenCategories(allCategories);
    const category = flatCategories.find(c => c.id === id);

    const handleSubmit = async (data: CategoryFormData) => {
        // In real app, update in database
        console.log('Updating category:', id, data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/admin/categories');
    };

    const handleCancel = () => {
        router.push('/admin/categories');
    };

    if (!category) {
        return (
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
                    <p className="text-muted-foreground mb-4">
                        The category youre looking for doesnt exist.
                    </p>
                    <Button onClick={() => router.push('/admin/categories')}>
                        Back to Categories
                    </Button>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold p-3">Edit Category</h1>
                    <p className="text-muted-foreground mt-1">
                        Update {category.name}
                    </p>
                </div>
            </div>

            <CategoryForm
                mode="edit"
                initialData={category}
                allCategories={allCategories}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
}
