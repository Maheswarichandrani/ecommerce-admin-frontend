import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetricsCards } from '@/components/dashboard/metrics-cards';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { CategoryPie } from '@/components/dashboard/category-pie';
import { RecentOrdersTable } from '@/components/dashboard/recent-orders-table';
import { mockMetrics, mockSalesData, mockCategoryData } from '@/lib/mock/dashboard';
import { mockOrders } from '@/lib/mock/order';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-3">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <MetricsCards metrics={mockMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={mockSalesData} />
        <CategoryPie data={mockCategoryData} />
      </div>

      <RecentOrdersTable orders={mockOrders} />
    </div>
  );
}