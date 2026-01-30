'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuthStore } from "@/store/admin-auth.store";
import { adminAuthApi } from "@/lib/api/admin-auth.api";
import { getAdminInitials } from "@/lib/auth/admin-auth.utils";
import { Separator } from "@/components/ui/separator";

export function AdminProfileDropdown() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
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
        <HoverCard openDelay={10}>
            <HoverCardTrigger asChild>
                <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 h-auto px-2 py-1.5 hover:bg-accent lg:w-46"
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
            </HoverCardTrigger>
            <HoverCardContent
                className="w-46 -translate-y-2"
                side="bottom"
                align="end"
                sideOffset={8}
            >
                <div className="space-y-3">
                    {/* <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 rounded-full">
                            <AvatarImage src="" alt={admin?.username || "Admin"} />
                            <AvatarFallback className="rounded-full bg-primary text-primary-foreground">
                                {getAdminInitials(admin)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold">
                                {admin?.username || "Admin User"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {admin?.email || admin?.phone || "admin@example.com"}
                            </span>
                        </div>
                    </div>
                    
                    <Separator /> */}
                    
                    <div className="flex flex-col gap-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start h-auto py-2 px-2"
                            asChild
                        >
                            <Link href="/profile">
                                <UserRound className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start h-auto py-2 px-2"
                            asChild
                        >
                            <Link href="/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </Button>
                        
                        <Separator className="my-1" />
                        
                        <Button
                            variant="ghost"
                            className="w-full justify-start h-auto py-2 px-2 text-red-600 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            {isLoggingOut ? "Logging out..." : "Log out"}
                        </Button>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
