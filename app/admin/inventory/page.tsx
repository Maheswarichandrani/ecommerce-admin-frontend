import { InventoryMetrics } from '@/components/inventory/inventory-metrics';
import { StockTable } from '@/components/inventory/stock-table';
import { mockProducts } from '@/lib/mock/products';

const inventoryMetrics = [
  { label: 'Total Products', value: 1245 },
  { label: 'Low Stock Items', value: 23, colorClass: 'text-orange-500' },
  { label: 'Out of Stock', value: 5, colorClass: 'text-red-500' },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>

      <InventoryMetrics metrics={inventoryMetrics} />

      <StockTable products={mockProducts} />
    </div>
  );
}
