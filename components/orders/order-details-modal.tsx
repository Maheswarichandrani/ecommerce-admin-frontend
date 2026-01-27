'use client';

import { Check, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Order, OrderTimeline } from '@/types/order';
import { formatCurrency } from '@/lib/utils/format-currency';
import { formatDate } from '@/lib/utils/format-date';

interface OrderDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  timeline: OrderTimeline[];
}

export function OrderDetailsModal({ open, onOpenChange, order, timeline }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Customer</Label>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Order Date</Label>
              <p className="font-medium">{formatDate(order.orderDate)}</p>
            </div>
          </div>

          {/* Order Timeline */}
          <div>
            <h4 className="font-semibold mb-4">Order Timeline</h4>
            <div className="admin-order-timeline">
              {timeline.map((item, index) => (
                <div key={index} className="admin-order-timeline-item">
                  <div className={`admin-order-timeline-dot ${item.completed ? 'admin-order-timeline-dot-active' : ''}`}>
                    {item.completed ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    )}
                  </div>
                  <div className="admin-order-timeline-content">
                    <p className="admin-order-timeline-title">{item.status}</p>
                    <p className="admin-order-timeline-time">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          {order.items && (
            <div>
              <h4 className="font-semibold mb-3">Order Items</h4>
              <div className="border border-border rounded-lg divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="p-3 flex items-center gap-3">
                    <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">{item.variantDetails}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price)}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Amount</span>
              <span className="text-2xl font-bold">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}