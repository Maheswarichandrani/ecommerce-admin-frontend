import * as React from "react";
import { cn } from "@/lib/utils/classnames";

type PaginationProps = React.HTMLAttributes<HTMLElement>;

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
    ({ className, ...props }, ref) => (
        <nav
            ref={ref}
            role="navigation"
            aria-label="pagination"
            className={cn("mx-auto flex w-full items-center justify-center gap-2", className)}
            {...props}
        />
    )
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
    ({ className, ...props }, ref) => (
        <ol
            ref={ref}
            className={cn("flex flex-row items-center gap-1 text-sm", className)}
            {...props}
        />
    )
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
    ({ className, ...props }, ref) => (
        <li ref={ref} className={cn("list-none", className)} {...props} />
    )
);
PaginationItem.displayName = "PaginationItem";

const PaginationLink = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
    <a
        ref={ref}
        className={cn(
            "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-3 text-sm font-medium transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
            className
        )}
        {...props}
    />
));
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
    <PaginationLink
        ref={ref}
        aria-label="Previous page"
        className={cn("gap-1 pl-2", className)}
        {...props}
    />
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
    <PaginationLink
        ref={ref}
        aria-label="Next page"
        className={cn("gap-1 pr-2", className)}
        {...props}
    />
));
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className }: { className?: string }) => (
    <span className={cn("inline-flex h-9 min-w-9 items-center justify-center text-muted-foreground", className)}>
        ...
    </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
