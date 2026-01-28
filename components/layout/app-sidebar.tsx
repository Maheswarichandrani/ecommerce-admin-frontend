"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NAV_ITEMS } from "@/constants/admin-nav";
import { ChevronRight, LogOut, User, Settings, ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useAdminAuthStore } from "@/store/admin-auth.store";
import { adminAuthApi } from "@/lib/api/admin-auth.api";
import { getAdminInitials } from "@/lib/auth/admin-auth.utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const { admin, logout: clearAuth } = useAdminAuthStore();

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



    const isActive = (path: string) => {
        if (path === "/admin") return pathname === "/admin";
        return pathname === path;
    };

    const isChildActive = (children: typeof NAV_ITEMS[0]["children"]) => {
        if (!children) return false;
        return children.some((child) => isActive(child.path));
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <span className="text-lg font-bold">A</span>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">ARMOIRE</span>
                                    <span className="truncate text-xs">Admin Panel</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                const hasChildren = !!item.children?.length;
                                const active = isActive(item.path);
                                const childActive = isChildActive(item.children);

                                if (!hasChildren) {
                                    return (
                                        <SidebarMenuItem key={item.path}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={active}
                                                tooltip={item.label}
                                            >
                                                <Link href={item.path}>
                                                    <Icon />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }

                                return (
                                    <Collapsible
                                        key={item.label}
                                        asChild
                                        defaultOpen={childActive}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.label}
                                                    isActive={active || childActive}
                                                >
                                                    <Icon />
                                                    <span>{item.label}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.children!.map((child) => {
                                                        const ChildIcon = child.icon;
                                                        const childIsActive = isActive(child.path);

                                                        return (
                                                            <SidebarMenuSubItem key={child.path}>
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={childIsActive}
                                                                >
                                                                    <Link href={child.path}>
                                                                        <ChildIcon />
                                                                        <span>{child.label}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        );
                                                    })}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src="" alt={admin?.username || "Admin"} />
                                        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                                            {getAdminInitials(admin)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {admin?.username || "Admin User"}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {admin?.email || admin?.phone || "admin@example.com"}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="right"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src="" alt={admin?.username || "Admin"} />
                                            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                                                {getAdminInitials (admin)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {admin?.username || "Admin User"}
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {admin?.email || admin?.phone || "admin@example.com"}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
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
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
