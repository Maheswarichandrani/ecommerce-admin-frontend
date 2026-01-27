import { MetricData, ChartDataPoint, CategoryData } from '@/types/dashboard';

export const mockMetrics: MetricData[] = [
  {
    label: 'Total Orders',
    value: 1450,
    change: '+12.5% from last month',
    trend: 'up',
    icon: 'ShoppingCart'
  },
  {
    label: 'Total Revenue',
    value: '$28,500',
    change: '+18.2% from last month',
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    label: 'Total Users',
    value: 3240,
    change: '+8.1% from last month',
    trend: 'up',
    icon: 'Users'
  },
  {
    label: 'Low Stock',
    value: 23,
    change: 'Needs attention',
    trend: 'down',
    icon: 'AlertCircle'
  }
];

export const mockSalesData: ChartDataPoint[] = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 198 },
  { name: 'Mar', sales: 5000, orders: 320 },
  { name: 'Apr', sales: 4500, orders: 280 },
  { name: 'May', sales: 6000, orders: 390 },
  { name: 'Jun', sales: 5500, orders: 350 },
];

export const mockCategoryData: CategoryData[] = [
  { name: 'Men', value: 4500, color: '#8b5cf6' },
  { name: 'Women', value: 6200, color: '#ec4899' },
  { name: 'Kids', value: 2300, color: '#14b8a6' },
];