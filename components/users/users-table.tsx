'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, MapPin, MoreHorizontal, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/types/user';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface UsersTableProps {
    users: User[];
}

const PAGE_SIZES = [10, 25, 50];

export function UsersTable({ users }: UsersTableProps) {
    const [search, setSearch] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return users;
        return users.filter((user) =>
            user.username.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.phone.toLowerCase().includes(term) ||
            user.addresses.some((addr) => `${addr.line1} ${addr.city} ${addr.state}`.toLowerCase().includes(term))
        );
    }, [search, users]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * pageSize;
    const visible = filtered.slice(start, start + pageSize);

    const statusBadge = (status: User['status']) => {
        switch (status) {
            case 'active':
                return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
            case 'blocked':
                return 'bg-red-50 text-red-700 border border-red-200';
            case 'pending':
                return 'bg-amber-50 text-amber-700 border border-amber-200';
            default:
                return 'bg-muted text-muted-foreground border border-border';
        }
    };

    const goToPage = (p: number) => {
        if (p >= 1 && p <= totalPages) setPage(p);
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-4 p-4 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-xl font-semibold">Users</div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Show</span>
                        <Select
                            value={String(pageSize)}
                            onValueChange={(val) => {
                                setPageSize(Number(val));
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="h-9 w-24">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PAGE_SIZES.map((size) => (
                                    <SelectItem key={size} value={String(size)}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span>entries</span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            className="pl-9 w-64"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>
            </div>

            <Card className="border shadow-sm">
                <div className="flex items-center justify-between px-4 py-3 border-b text-sm text-muted-foreground">
                    <span>
                        Showing {filtered.length === 0 ? 0 : start + 1} to {Math.min(start + pageSize, filtered.length)} of {filtered.length} entries
                    </span>
                    <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">ID</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Addresses</TableHead>
                                <TableHead>Joining Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visible.map((user) => (
                                <TableRow key={user.id} className="hover:bg-muted/50">
                                    <TableCell className="font-mono text-xs text-muted-foreground">{user.id}</TableCell>
                                    <TableCell className="font-medium">{user.username}</TableCell>
                                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    {user.addresses.length} addresses
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-72">
                                                {user.addresses.map((addr, idx) => (
                                                    <DropdownMenuItem key={idx} className="flex flex-col items-start gap-0.5">
                                                        <span className="text-xs uppercase text-muted-foreground">{addr.label}</span>
                                                        <span className="font-medium text-sm">{addr.line1}</span>
                                                        <span className="text-xs text-muted-foreground">{addr.city}, {addr.state} {addr.zip}</span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                    <TableCell>{new Date(user.joiningDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge className={`px-3 py-1 text-xs font-semibold ${statusBadge(user.status)}`}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="ghost" size="sm" className="gap-1">
                                            <Link href={`/admin/users/${encodeURIComponent(user.id)}`}>
                                                View
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {visible.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-4 py-3 border-t text-sm">
                    <div className="text-muted-foreground">
                        Showing {filtered.length === 0 ? 0 : start + 1} to {Math.min(start + pageSize, filtered.length)} of {filtered.length} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <Pagination className="justify-end">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={(e) => {
                                            e.preventDefault();
                                            goToPage(currentPage - 1);
                                        }}
                                        className="w-auto px-3"
                                        href="#"
                                        aria-disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Prev
                                    </PaginationPrevious>
                                </PaginationItem>

                                {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                                    const pageNumber = idx + 1;
                                    const isEllipsis = totalPages > 5 && idx === 3;
                                    if (isEllipsis) {
                                        return (
                                            <PaginationItem key={`ellipsis-${idx}`}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }
                                    return (
                                        <PaginationItem key={pageNumber}>
                                            <PaginationLink
                                                href="#"
                                                isActive={currentPage === pageNumber}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    goToPage(pageNumber);
                                                }}
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={(e) => {
                                            e.preventDefault();
                                            goToPage(currentPage + 1);
                                        }}
                                        className="w-auto px-3"
                                        href="#"
                                        aria-disabled={currentPage === totalPages}
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
        </div>
    );
}
