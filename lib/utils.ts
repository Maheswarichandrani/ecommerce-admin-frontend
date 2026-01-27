import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Category, CategoryStats } from "../types/category";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const flattenCategories = (categories: Category[]): Category[] => {
  const result: Category[] = [];
  const flatten = (cats: Category[]) => {
    cats.forEach(cat => {
      result.push(cat);
      if (cat.children?.length) {
        flatten(cat.children);
      }
    });
  };
  flatten(categories);
  return result;
};

export const calculateStats = (categories: Category[]): CategoryStats => {
  const flat = flattenCategories(categories);
  return {
    totalCategories: flat.length,
    activeCategories: flat.filter(c => c.isActive).length,
    menCategories: flat.filter(c => c.rootType === 'men').length,
    womenCategories: flat.filter(c => c.rootType === 'women').length,
    kidsCategories: flat.filter(c => c.rootType === 'kids').length,
    categoriesWithProducts: flat.filter(c => c.productCount > 0).length,
  };
};

export const getRootTypeColor = (rootType: string) => {
  switch (rootType) {
    case 'men': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'women': return 'bg-pink-50 text-pink-700 border-pink-200';
    case 'kids': return 'bg-purple-50 text-purple-700 border-purple-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
