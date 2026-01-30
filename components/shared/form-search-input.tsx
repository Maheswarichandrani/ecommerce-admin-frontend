import Form from "next/form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  className?: string;
  page: number;
  size: number;
  search?: string;
}

export function SearchForm({ className, page, size, search }: SearchFormProps) {

  return (
    <Form action="/products" scroll={false} className={`flex gap-2 ${className}`}>
      {/* Hidden fields to preserve pagination */}
      <Input type="hidden" name="page" value={page} />
      <Input
        type="hidden"
        name="size"
        value={size}
      />

      {/* Search input with icon */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          name="search"
          defaultValue={search || ""}
          placeholder="Search Products..."
          className="pl-10"
        />
      </div>
    </Form>
  );
}