export type RootType = 'men' | 'women' | 'kids';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  rootType: RootType;
  parentId: string | null;
  imageUrl?: string;
  isActive: boolean;
  productCount: number;
  order: number;
  level: number;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  rootType: RootType;
  parentId: string | null;
  imageUrl?: string;
  isActive: boolean;
}

export interface CategoryTreeNode extends Category {
  isExpanded?: boolean;
  isDragging?: boolean;
  isDropTarget?: boolean;
}

export type CategoryFilter = 'all' | RootType;

export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  menCategories: number;
  womenCategories: number;
  kidsCategories: number;
  categoriesWithProducts: number;
}

export type FormMode = 'create' | 'edit' | 'create-sub';


