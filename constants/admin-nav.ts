import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users,
  Warehouse, Star, FileText, LucideIcon,
} from 'lucide-react';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  section?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', section: 'dashboard' },
  { icon: Package, label: 'Products', path: '/products', section: 'products', children: [{ icon: Package, label: 'All Products', path: '/products' }, { icon: Package, label: 'Add Product', path: '/products/add'}] },
  { icon: FolderTree, label: 'Categories', path: '/categories', section: 'categories' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders', section: 'orders' },
  { icon: Users, label: 'Users', path: '/users', section: 'users' },
  { icon: Warehouse, label: 'Inventory', path: '/inventory', section: 'inventory' },
  { icon: Star, label: 'Reviews', path: '/reviews', section: 'reviews' },
  { icon: FileText, label: 'Content', path: '/content', section: 'content' },
];