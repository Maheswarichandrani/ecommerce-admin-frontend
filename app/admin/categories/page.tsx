import { CategoryManagementClient } from '@/components/categories/category-management';
import { MOCK_CATEGORIES } from '@/lib/mock/category';

// This is a Server Component (default in Next.js App Router)
export default async function CategoriesPage() {
  // In real app, fetch data from database
  // const categories = await getCategories();
  const categories = MOCK_CATEGORIES;

  return (
    <div className="min-h-screen bg-background">
      <CategoryManagementClient initialCategories={categories} />
    </div>
  )
}