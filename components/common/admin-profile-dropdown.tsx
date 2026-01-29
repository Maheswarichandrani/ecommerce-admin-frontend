'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuthStore } from "@/store/admin-auth.store";
import { adminAuthApi } from "@/lib/api/admin-auth.api";
import { getAdminInitials } from "@/lib/auth/admin-auth.utils";

export function AdminProfileDropdown() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const { admin, logout: clearAuth, isLoading } = useAdminAuthStore();

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            toast.loading("Logging out...", { id: "logout" });

            // Call logout API
            await adminAuthApi.logout();

            // Clear auth store
            clearAuth();

            toast.success("Logged out successfully", { id: "logout" });
            
            // Redirect to login
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout", { id: "logout" });
            setIsLoggingOut(false);
        }
    };

    // Show loading state while admin data is being fetched
    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 rounded-full">
                    <AvatarFallback className="rounded-full bg-muted animate-pulse" />
                </Avatar>
                <div className="hidden md:flex flex-col gap-1">
                    <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                    <div className="h-2.5 w-16 bg-muted animate-pulse rounded" />
                </div>
            </div>
        );
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 h-auto px-2 py-1.5 hover:bg-accent"
                    onMouseEnter={() => setIsOpen(true)}
                >
                    <Avatar className="h-9 w-9 rounded-full">
                        <AvatarImage src="" alt={admin?.username || "Admin"} />
                        <AvatarFallback className="rounded-full bg-primary text-primary-foreground text-sm font-medium">
                            {getAdminInitials(admin)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start text-left">
                        <span className="text-sm font-medium leading-none">
                            {admin?.username || "Admin User"}
                        </span>
                        <span className="text-xs text-muted-foreground leading-none mt-1">
                            Admin
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                side="bottom"
                align="end"
                sideOffset={8}
                onMouseLeave={() => setIsOpen(false)}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <Avatar className="h-10 w-10 rounded-full">
                            <AvatarImage src="" alt={admin?.username || "Admin"} />
                            <AvatarFallback className="rounded-full bg-primary text-primary-foreground">
                                {getAdminInitials(admin)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold">
                                {admin?.username || "Admin User"}
                            </span>
                            <span className="text-xs text-muted-foreground text-ellipsis max-w-[60%]">
                                {admin?.email || admin?.phone || "admin@example.com"}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                        <UserRound className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
