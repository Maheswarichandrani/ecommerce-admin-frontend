'use client';

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { ScreenMode } from "@/components/common/screen-mode";
import { AdminProfileDropdown } from "@/components/common/admin-profile-dropdown";

export function TopBar() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 py-4   bg-card border-b border-primary/10">
            <SidebarTrigger className="-ml-1" />

            <div className="flex flex-1 items-center justify-between">
                <div className="flex-1"></div>

                <div className="flex items-center gap-3">
                    <ScreenMode />
                    
                    <ThemeToggle />

                    <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                    </Button>

                    <AdminProfileDropdown />
                </div>
            </div>
        </header>
    );
}