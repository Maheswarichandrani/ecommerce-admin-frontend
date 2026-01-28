'use client';

import { useMemo, useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Order } from '@/types/order';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { useRouter } from 'next/navigation';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface OrdersTableProps {
  orders: Order[];
}

const ITEMS_PER_PAGE = 10;

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter(order =>
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query)
    );
  }, [orders, searchValue]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const getPaymentBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'admin-badge-active';
      case 'refunded':
        return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950 dark:text-orange-400';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-400';
      default:
        return 'admin-badge-pending';
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <Card className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">All Orders</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9 w-64"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow
                key={order.id}
                className="cursor-pointer hover:bg-muted/60 transition-colors"
                onClick={() => router.push(`/admin/orders/${order.id}`)}
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{formatDate(order.orderDate)}</TableCell>
                <TableCell>{order.itemCount}</TableCell>
                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                <TableCell>
                  <Badge className={getPaymentBadgeClass(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`capitalize ${order.orderStatus === 'cancelled' ? 'border-destructive text-destructive' : ''
                    }`}>
                    {order.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/orders/${order.id}`);
                    }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Pagination className="justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    aria-disabled={currentPage === 1}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage - 1);
                    }}
                    className="w-auto px-3"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </PaginationPrevious>
                </PaginationItem>

                {renderPageNumbers().map((page, index) => (
                  page === '...'
                    ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                    : (
                      <PaginationItem key={page as number}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === (page as number)}
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(page as number);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    aria-disabled={currentPage === totalPages}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage + 1);
                    }}
                    className="w-auto px-3"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </Card>
    </>
  );
}