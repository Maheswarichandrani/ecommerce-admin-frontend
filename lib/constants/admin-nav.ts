import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users,
  Warehouse, CreditCard, Tag, Star, FileText, LucideIcon,
} from 'lucide-react';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  section?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', section: 'dashboard' },
  { icon: Package, label: 'Products', path: '/admin/products', section: 'products', children: [{ icon: Package, label: 'All Products', path: '/admin/products' }, { icon: Package, label: 'Add Product', path: '/admin/products/add'}] },
  { icon: FolderTree, label: 'Categories', path: '/admin/categories', section: 'categories' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders', section: 'orders' },
  { icon: Users, label: 'Users', path: '/admin/users', section: 'users' },
  { icon: Warehouse, label: 'Inventory', path: '/admin/inventory', section: 'inventory' },
  { icon: CreditCard, label: 'Payments', path: '/admin/payments', section: 'payments' },
  { icon: Tag, label: 'Offers', path: '/admin/offers', section: 'offers' },
  { icon: Star, label: 'Reviews', path: '/admin/reviews', section: 'reviews' },
  { icon: FileText, label: 'Content', path: '/admin/content', section: 'content' },
];