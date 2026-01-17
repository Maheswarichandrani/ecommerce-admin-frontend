'use client';

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from '@/components/layout/topbar';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="admin-layout dark">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className={`admin-main ${sidebarCollapsed ? 'admin-main-collapsed' : ''}`}>
        <TopBar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}



