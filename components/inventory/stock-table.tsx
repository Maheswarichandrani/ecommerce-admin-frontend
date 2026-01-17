'use client';

import { RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/lib/types/product';

interface StockTableProps {
  products: Product[];
}

export function StockTable({ products }: StockTableProps) {
  return (
    <Card className="admin-table-container">
      <div className="admin-table-header">
        <h3 className="admin-table-title">Stock Levels</h3>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync Stock
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{totalStock}</TableCell>
                <TableCell>
                  {totalStock < 10 ? (
                    <Badge className="admin-badge-low-stock">Low Stock</Badge>
                  ) : (
                    <Badge className="admin-badge-active">In Stock</Badge>
                  )}
                </TableCell>
                <TableCell>2 hours ago</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}