import { Card } from '@/components/ui/card';
import { OrdersTable } from '@/components/orders/orders-table';
import { mockOrders, mockOrderTimeline } from '@/lib/mock/order';

const orderStatusData = [
  { name: 'Pending', value: 45 },
  { name: 'Confirmed', value: 120 },
  { name: 'Shipped', value: 85 },
  { name: 'Delivered', value: 200 },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Management</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStatusData.map((status) => (
          <Card key={status.name} className="admin-metric-card">
            <div className="admin-metric-title">{status.name}</div>
            <div className="admin-metric-value text-2xl">{status.value}</div>
          </Card>
        ))}
      </div>

      <OrdersTable orders={mockOrders} timeline={mockOrderTimeline} />
    </div>
  );
}