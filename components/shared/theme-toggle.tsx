'use client';

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon">
                    {theme === 'light' && <Sun className="w-4 h-4" />}
                    {theme === 'dark' && <Moon className="w-4 h-4" />}
                    {theme === 'system' && <Monitor className="w-4 h-4" />}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-40">
                <div className="flex flex-col gap-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start h-auto py-2 px-2"
                        onClick={() => setTheme('light')}
                    >
                        <Sun className="w-4 h-4 mr-2" />
                        Light
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start h-auto py-2 px-2"
                        onClick={() => setTheme('dark')}
                    >
                        <Moon className="w-4 h-4 mr-2" />
                        Dark
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start h-auto py-2 px-2"
                        onClick={() => setTheme('system')}
                    >
                        <Monitor className="w-4 h-4 mr-2" />
                        System
                    </Button>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
