import { Card } from '@/components/ui/card';
import { OrdersTable } from '@/components/orders/orders-table';
import { mockOrders } from '@/lib/mock/order';

const orderStatusData = [
  { name: 'Pending', value: 45 },
  { name: 'Confirmed', value: 120 },
  { name: 'Shipped', value: 85 },
  { name: 'Delivered', value: 200 },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto p-3 md:p-4">
      <h1 className="text-2xl pt-3 font-bold">Order Management</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStatusData.map((status) => (
          <Card key={status.name} className="admin-metric-card">
            <div className="admin-metric-title">{status.name}</div>
            <div className="admin-metric-value text-2xl">{status.value}</div>
          </Card>
        ))}
      </div>

      <OrdersTable orders={mockOrders} />
    </div>
  );
}