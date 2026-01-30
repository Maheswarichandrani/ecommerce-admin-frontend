"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2, Box } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductListItem } from "@/types/product";
import { formatCurrency } from "@/utils/format-currency";
import Image from "next/image";
import Link from "next/link";
import { CustomizableBadge, StatusBadge, StockStatusBadge } from "@/components/shared/status-badges";

export const columns: ColumnDef<ProductListItem>[] = [
  // Row Selection
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Product Name with Image
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-3">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="h-7 w-7 rounded object-cover bg-accent"
              width={56}
              height={56}
            />
          ) : (
            <div className="h-7 w-7 rounded bg-muted flex items-center justify-center">
              <Box className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <div className="font-medium text-base">{product.name}</div>
            <div className="text-sm text-muted-foreground mt-0.5">
              Category: {product.categoryName || "Uncategorized"}
            </div>
          </div>
        </div>
      );
    },
  },

  // Stock
  {
    accessorKey: "totalStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      const stock = row.original.totalStock;
      return (
        <span className="font-medium">
          {String(stock).padStart(2, "0")}
        </span>
      );
    },
  },

  // Stock Status
  {
    accessorKey: "stockStatus",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title="Stock Status"
        filterOptions={[
          { label: "In Stock", value: "IN_STOCK", paramKey: "stockStatus" },
          { label: "Low Stock", value: "LOW_STOCK", paramKey: "stockStatus" },
          { label: "Out of Stock", value: "OUT_OF_STOCK", paramKey: "stockStatus" },
        ]}
      />
    ),
    cell: ({ row }) => {
      const status = row.original.stockStatus;
      return <StockStatusBadge status={status} />;
    },
  },

  // Rating
  {
    accessorKey: "averageRating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate" />
    ),
    cell: ({ row }) => {
      const rating = row.original.averageRating;
      return (
        <div className="flex items-center gap-1">
          <span>⭐</span>
          <span className="font-medium">
            {rating?.toFixed(1) || "0.0"}
          </span>
        </div>
      );
    },
  },

  // Price
  {
    accessorKey: "basePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = row.original.basePrice;
      return (
        <div className="font-semibold">
          {formatCurrency(price)}
        </div>
      );
    },
  },

  // Orders
  {
    accessorKey: "totalOrders",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Orders" />
    ),
    cell: ({ row }) => {
      const orders = row.original.totalOrders;
      return (
        <span className="font-medium">
          {String(orders).padStart(2, "0")}
        </span>
      );
    },
  },

  // Customizable
  {
    accessorKey: "isCustomizable",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title="Customizable"
        filterOptions={[
          { label: "Customizable", value: "true", paramKey: "isCustomizable" },
          { label: "Standard", value: "false", paramKey: "isCustomizable" },
        ]}
      />
    ),
    cell: ({ row }) => {
      const isCustomizable = row.original.isCustomizable;
      return <CustomizableBadge isCustomizable={isCustomizable} />;
    },
  },

  // Status (Active/Inactive/Draft)
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title="Status"
        filterOptions={[
          { label: "Draft", value: "true", paramKey: "isDraft" },
          { label: "Active", value: "true", paramKey: "isActive" },
          { label: "Inactive", value: "false", paramKey: "isActive" },
        ]}
      />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return <StatusBadge product={product} />;
    },
  },

  // Actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            asChild
          >
            <Link href={`/products/${product.id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            asChild
          >
            <Link href={`/products/${product.id}/edit`}>
              <Edit className="w-4 h-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>More Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];