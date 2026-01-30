import { Badge } from '@/components/ui/badge';
import { ProductListItem } from '@/types/product';

interface StatusBadgeProps {
  product: ProductListItem;
}

export const StatusBadge = ({ product }: StatusBadgeProps) => {
  if (product.isDraft) {
    return (
      <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
        Draft
      </Badge>
    );
  }
  if (product.isActive) {
    return (
      <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
        Active
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
      Inactive
    </Badge>
  );
};

interface StockStatusBadgeProps {
  status: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
}

export const StockStatusBadge = ({ status }: StockStatusBadgeProps) => {
  switch (status) {
    case "IN_STOCK":
      return (
        <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
          In Stock
        </Badge>
      );
    case "LOW_STOCK":
      return (
        <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
          Low Stock
        </Badge>
      );
    case "OUT_OF_STOCK":
      return (
        <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
          Out of Stock
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
          Unknown
        </Badge>
      );
  }
};

interface CustomizableBadgeProps {
  isCustomizable: boolean;
}

export const CustomizableBadge = ({ isCustomizable }: CustomizableBadgeProps) => {
  if (isCustomizable) {
    return (
      <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
        Customizable
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
      Standard
    </Badge>
  );
};
