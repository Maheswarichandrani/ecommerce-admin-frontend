'use client';

import {Menu, Settings} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export function TopBar({ collapsed, setCollapsed }: TopBarProps) {
    return (
        <div className="admin-topbar">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="lg:hidden p-2 hover:bg-accent rounded-md"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-semibold text-foreground hidden sm:block">Admin Dashboard</h2>
            </div>

            <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
          A
        </div>
      </div>
    </div>
    );
}