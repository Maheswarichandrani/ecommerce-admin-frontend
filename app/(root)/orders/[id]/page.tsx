'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatCurrency } from '@/lib/utils/format-currency';
import { formatDate } from '@/lib/utils/format-date';
import { OrderStatusSelect } from '@/components/orders/order-status-select';
import { mockOrders, mockOrderTimeline, mockCancelledOrderTimeline } from '@/lib/mock/order';
import { OrderStatus } from '@/types/order';

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

    const order = useMemo(() => mockOrders.find((o) => o.id === orderId), [orderId]);
    const timeline = order?.orderStatus === 'cancelled' ? mockCancelledOrderTimeline : mockOrderTimeline;
    const isCancelled = order?.orderStatus === 'cancelled';

    const [status, setStatus] = useState<OrderStatus>(order?.orderStatus || 'pending');

    if (!order) {
        return (
            <div className="p-6">
                <Button variant="ghost" onClick={() => router.push('/admin/orders')} className="mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
                <Card>
                    <CardHeader>
                        <CardTitle>Order not found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">The requested order does not exist.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 space-y-6 w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Button variant="ghost" onClick={() => router.push('/admin/orders')} className="px-0 hover:bg-transparent text-sm font-medium mb-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Orders
                    </Button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Order {order.id}</h1>
                        {isCancelled && (
                            <Badge variant="destructive" className="h-6">
                                <XCircle className="w-3 h-3 mr-1" />
                                Cancelled
                            </Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground">Placed on {formatDate(order.orderDate)}</p>
                </div>
                {!isCancelled && (
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium mb-1">Order Status</p>
                            <OrderStatusSelect value={status} onChange={setStatus} />
                        </div>
                    </div>
                )}
            </div>

            {/* Cancellation Alert */}
            {isCancelled && order.cancellationReason && (
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/5">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle className="font-semibold text-lg">Order Cancelled</AlertTitle>
                    <AlertDescription className="mt-2 space-y-1">
                        <p className="font-medium">{order.cancellationReason}</p>
                        <div className="flex items-center gap-4 text-sm mt-2">
                            {order.cancelledAt && (
                                <span>Cancelled on: {formatDate(order.cancelledAt)}</span>
                            )}
                            {order.cancelledBy && (
                                <span>By: {order.cancelledBy}</span>
                            )}
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            {/* Timeline - Full Width with Improved Styling */}
            <Card className="shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle>{isCancelled ? 'Cancellation Timeline' : 'Order Progress'}</CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                    <div className="relative">
                        <div className="flex items-start justify-between">
                            {timeline.map((item, index) => {
                                const isCompleted = item.completed;
                                const isCancelledStep = item.status === 'Cancelled';

                                return (
                                    <div key={index} className="flex flex-col items-center flex-1 relative">
                                        {/* Connecting Line */}
                                        {index < timeline.length - 1 && (
                                            <div className="absolute top-6 left-1/2 w-full h-0.5 -z-10">
                                                <div className={`h-full ${isCancelledStep
                                                        ? 'bg-destructive'
                                                        : isCompleted
                                                            ? 'bg-green-500'
                                                            : 'bg-border'
                                                    }`} />
                                            </div>
                                        )}

                                        {/* Icon Circle */}
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCancelledStep
                                                    ? 'border-destructive bg-destructive shadow-lg shadow-destructive/20'
                                                    : isCompleted
                                                        ? 'border-green-500 bg-green-500 shadow-lg shadow-green-200'
                                                        : 'border-border bg-background'
                                                }`}
                                        >
                                            {isCancelledStep ? (
                                                <XCircle className="w-6 h-6 text-white" />
                                            ) : isCompleted ? (
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            ) : (
                                                <Clock className="w-6 h-6 text-muted-foreground" />
                                            )}
                                        </div>

                                        {/* Status Text */}
                                        <div className="mt-4 text-center max-w-[120px]">
                                            <p className={`font-semibold text-sm mb-1 ${isCancelledStep
                                                    ? 'text-destructive'
                                                    : isCompleted
                                                        ? 'text-foreground'
                                                        : 'text-muted-foreground'
                                                }`}>
                                                {item.status}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Addresses & Payment */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Billing Address */}
                    {order.billingAddress && (
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Billed To</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <p className="font-medium">{order.billingAddress.name}</p>
                                <p className="text-muted-foreground">{order.billingAddress.street}</p>
                                {order.billingAddress.apartment && (
                                    <p className="text-muted-foreground">{order.billingAddress.apartment}</p>
                                )}
                                <p className="text-muted-foreground">
                                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Shipping Address */}
                    {order.shippingAddress && (
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Shipped To</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <p className="font-medium">{order.shippingAddress.name}</p>
                                <p className="text-muted-foreground">{order.shippingAddress.street}</p>
                                {order.shippingAddress.apartment && (
                                    <p className="text-muted-foreground">{order.shippingAddress.apartment}</p>
                                )}
                                <p className="text-muted-foreground">
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Payment Method */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                            <p className="font-medium">{order.paymentMethod || 'N/A'}</p>
                            {order.email && <p className="text-muted-foreground">{order.email}</p>}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-2">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {order.items && order.items.length > 0 ? (
                                <div className="space-y-6">
                                    {/* Items Table */}
                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="w-full">
                                            <thead className="bg-muted/50">
                                                <tr>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">Item</th>
                                                    <th className="text-center py-3 px-4 font-semibold text-sm">Price</th>
                                                    <th className="text-center py-3 px-4 font-semibold text-sm">Quantity</th>
                                                    <th className="text-right py-3 px-4 font-semibold text-sm">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {order.items.map((item) => (
                                                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                                        <td className="py-4 px-4">
                                                            <div>
                                                                <p className="font-medium">{item.productName}</p>
                                                                <p className="text-sm text-muted-foreground">{item.variantDetails}</p>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4 text-center">{formatCurrency(item.price)}</td>
                                                        <td className="py-4 px-4 text-center">{item.quantity}</td>
                                                        <td className="py-4 px-4 text-right font-medium">
                                                            {formatCurrency(item.price * item.quantity)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-2 pt-4 border-t">
                                        {order.subtotal !== undefined && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span className="font-medium">{formatCurrency(order.subtotal)}</span>
                                            </div>
                                        )}
                                        {order.shipping !== undefined && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Shipping</span>
                                                <span className="font-medium">{formatCurrency(order.shipping)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pt-3 border-t">
                                            <span className="text-lg font-semibold">Total</span>
                                            <span className="text-2xl font-bold">{formatCurrency(order.totalAmount)}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">No items in this order</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
