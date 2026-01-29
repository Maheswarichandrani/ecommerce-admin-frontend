'use client';

import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopBar } from '@/components/layout/topbar';
import { SidebarInset } from "@/components/ui/sidebar";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        <div className="p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}



