'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Order } from '@/types/order';
import { formatCurrency } from '@/lib/utils/format-currency';
import { formatDate } from '@/lib/utils/format-date';

interface RecentOrdersTableProps {
  orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const getPaymentBadgeClass = (status: string) => {
    return status === 'paid' ? 'admin-badge-active' : 'admin-badge-pending';
  };

  const getOrderBadgeClass = (status: string) => {
    return `admin-badge-${status}`;
  };

  return (
    <Card className="admin-table-container">
      <div className="admin-table-header">
        <h3 className="admin-table-title">Recent Orders</h3>
        <Button variant="outline" size="sm" className='cursor-pointer'>View All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{formatDate(order.orderDate)}</TableCell>
              <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
              <TableCell>
                <Badge className={getPaymentBadgeClass(order.paymentStatus)}>
                  {order.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getOrderBadgeClass(order.orderStatus)}>
                  {order.orderStatus}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}