// components/admin/products/product-table.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, Image as ImageIcon, Sparkles, Package2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/format-currency';

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (productId: string) => {
    router.push(`/admin/products/${productId}/edit`);
  };

  const handleView = (productId: string) => {
    router.push(`/admin/products/${productId}`);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      console.log('Delete product:', productId);
      // Implement delete logic
    }
  };

  return (
    <Card className="border-border shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">All Products</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 w-64 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent text-lg font-semibold">
              <TableHead className="w-16">Images</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Features</TableHead>
              <TableHead className="text-right w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  <Package2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No products found</p>
                  <p className="text-sm">Try adjusting your search terms</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => {
                const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
                const isLowStock = totalStock < 10 && totalStock > 0;
                const isOutOfStock = totalStock === 0;

                return (
                  <TableRow
                    key={product.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleView(product.id)}
                  >
                    <TableCell>
                      <div className="w-12 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border border-border">
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {product.category?.name || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(product.basePrice)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={isOutOfStock ? 'destructive' : isLowStock ? 'secondary' : 'outline'}
                        className="font-mono"
                      >
                        {totalStock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.isActive ? 'default' : 'secondary'}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {product.isCustomizable && (
                          <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                            <Sparkles className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleView(product.id)} className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(product.id)} className="cursor-pointer">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}