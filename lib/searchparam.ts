import { ReadonlyURLSearchParams } from "next/navigation";

export function getNumberParam(
  searchParams: ReadonlyURLSearchParams,
  key: string,
  defaultValue: number
): number {
  const value = searchParams.get(key);
  return value ? parseInt(value, 10) : defaultValue;
}

export function getStringParam(
  searchParams: ReadonlyURLSearchParams,
  key: string
): string | undefined {
  return searchParams.get(key) || undefined;
}

export function getBooleanParam(
  searchParams: ReadonlyURLSearchParams,
  key: string
): boolean | undefined {
  const value = searchParams.get(key);
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

// Build params from URL
export function buildProductParams(searchParams: ReadonlyURLSearchParams) {
  return {
    page: getNumberParam(searchParams, "page", 0),
    size: getNumberParam(searchParams, "size", 20),
    sortBy: getStringParam(searchParams, "sortBy") || "createdAt",
    sortDir: (getStringParam(searchParams, "sortDir") as "ASC" | "DESC") || "DESC",
    search: getStringParam(searchParams, "search"),
    categoryId: getStringParam(searchParams, "categoryId"),
    brandId: getStringParam(searchParams, "brandId"),
    isActive: getBooleanParam(searchParams, "isActive"),
    isDraft: getBooleanParam(searchParams, "isDraft"),
    isCustomizable: getBooleanParam(searchParams, "isCustomizable"),
    stockStatus: getStringParam(searchParams, "stockStatus") as "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" | undefined,
    minPrice: getNumberParam(searchParams, "minPrice", 0) || undefined,
    maxPrice: getNumberParam(searchParams, "maxPrice", 0) || undefined,
    minRating: getNumberParam(searchParams, "minRating", 0) || undefined,
  };
}