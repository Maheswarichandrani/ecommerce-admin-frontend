import { Order, OrderTimeline } from '@/lib/types/order';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'user-1',
    customerName: 'John Doe',
    orderDate: '2024-01-10',
    totalAmount: 159.97,
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    itemCount: 3,
    items: [
      {
        id: 'item-1',
        productName: 'Classic White T-Shirt',
        variantDetails: 'Size: L, Color: White',
        quantity: 1,
        price: 29.99,
        imageUrl: null
      }
    ]
  },
  {
    id: 'ORD-002',
    customerId: 'user-2',
    customerName: 'Jane Smith',
    orderDate: '2024-01-11',
    totalAmount: 79.99,
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    itemCount: 1
  },
  {
    id: 'ORD-003',
    customerId: 'user-3',
    customerName: 'Mike Johnson',
    orderDate: '2024-01-12',
    totalAmount: 249.98,
    paymentStatus: 'pending',
    orderStatus: 'pending',
    itemCount: 2
  }
];

export const mockOrderTimeline: OrderTimeline[] = [
  { status: 'Order Placed', timestamp: 'Jan 10, 2024 - 10:30 AM', completed: true },
  { status: 'Payment Confirmed', timestamp: 'Jan 10, 2024 - 10:31 AM', completed: true },
  { status: 'Order Shipped', timestamp: 'Pending', completed: false }
];
