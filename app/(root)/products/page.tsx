"use client";
import { DataTable } from "@/components/shared/data-table";
import { SearchForm } from "@/components/shared/form-search-input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { buildProductParams } from "@/lib/searchparam";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { columns } from "./columns";


export default function ProductsPage() {
  const searchParams = useSearchParams();
  const params = buildProductParams(searchParams);

  const { data, isLoading } = useProducts(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm uppercase font-bold" >Product LIST</h1>
        </div>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <Link href="/products/add">
          <Button className="bg-chart-1!">
            <Plus className="mr-2" />
            Add Product
          </Button>
        </Link>

        <SearchForm
          search={params.search}
          page={params.page}
          size={params.size}
        />
      </div>

      <DataTable
        columns={columns}
        data={data?.content || []}
        pageCount={data?.totalPages || 0}
        isLoading={isLoading}
      />
    </div>
  );
}