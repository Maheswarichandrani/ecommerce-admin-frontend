export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  itemCount: number;
  items?: OrderItem[];
  shippingAddress?: Address;
}

export interface OrderItem {
  id: string;
  productName: string;
  variantDetails: string;
  quantity: number;
  price: number;
  imageUrl: string | null;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderTimeline {
  status: string;
  timestamp: string;
  completed: boolean;
}