import { Order, OrderTimeline } from '@/types/order';

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
    billingAddress: {
      name: 'John Smith',
      street: '1234 Main',
      city: 'Springfield',
      state: 'ST',
      zipCode: '54321',
      country: 'USA',
      apartment: 'Apt. 4B'
    },
    shippingAddress: {
      name: 'Kenny Rigdon',
      street: '1234 Main',
      city: 'Springfield',
      state: 'ST',
      zipCode: '54321',
      country: 'USA',
      apartment: 'Apt. 4B'
    },
    paymentMethod: 'Visa ending **** 4242',
    email: 'jsmith@email.com',
    items: [
      {
        id: 'item-1',
        productName: 'Classic White T-Shirt',
        variantDetails: 'Size: L, Color: White',
        quantity: 2,
        price: 29.99,
        imageUrl: null
      },
      {
        id: 'item-2',
        productName: 'Slim Fit Jeans',
        variantDetails: 'Size: 32, Color: Blue',
        quantity: 1,
        price: 79.99,
        imageUrl: null
      },
      {
        id: 'item-3',
        productName: 'Leather Jacket',
        variantDetails: 'Size: M, Color: Black',
        quantity: 1,
        price: 199.99,
        imageUrl: null
      }
    ],
    subtotal: 139.97,
    shipping: 20.00
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
    paymentStatus: 'refunded',
    orderStatus: 'cancelled',
    itemCount: 2,
    billingAddress: {
      name: 'Mike Johnson',
      street: '789 Oak Avenue',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA'
    },
    shippingAddress: {
      name: 'Mike Johnson',
      street: '789 Oak Avenue',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA'
    },
    paymentMethod: 'Mastercard ending **** 8765',
    email: 'mjohnson@email.com',
    items: [
      {
        id: 'item-4',
        productName: 'Running Shoes',
        variantDetails: 'Size: 10, Color: Black',
        quantity: 1,
        price: 129.99,
        imageUrl: null
      },
      {
        id: 'item-5',
        productName: 'Athletic Shorts',
        variantDetails: 'Size: M, Color: Navy',
        quantity: 2,
        price: 59.99,
        imageUrl: null
      }
    ],
    subtotal: 249.98,
    shipping: 0.00,
    cancellationReason: 'Customer requested cancellation - Changed mind about purchase',
    cancelledAt: '2024-01-12T15:30:00',
    cancelledBy: 'Customer'
  }
];

export const mockOrderTimeline: OrderTimeline[] = [
  { status: 'Ordered', timestamp: 'Jan 10, 2024 - 10:30 AM', completed: true },
  { status: 'Processed', timestamp: 'Jan 10, 2024 - 11:15 AM', completed: true },
  { status: 'Shipped', timestamp: 'Jan 11, 2024 - 09:00 AM', completed: true },
  { status: 'Out for Delivery', timestamp: 'Jan 12, 2024 - 08:30 AM', completed: false },
  { status: 'Delivered', timestamp: 'Pending', completed: false }
];

export const mockCancelledOrderTimeline: OrderTimeline[] = [
  { status: 'Ordered', timestamp: 'Jan 12, 2024 - 09:00 AM', completed: true },
  { status: 'Cancelled', timestamp: 'Jan 12, 2024 - 03:30 PM', completed: true }
];
