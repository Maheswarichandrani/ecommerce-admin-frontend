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
  billingAddress?: Address;
  paymentMethod?: string;
  email?: string;
  subtotal?: number;
  shipping?: number;
  cancellationReason?: string;
  cancelledAt?: string;
  cancelledBy?: string;
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
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  apartment?: string;
}

export interface OrderTimeline {
  status: string;
  timestamp: string;
  completed: boolean;
}