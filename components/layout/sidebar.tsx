"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAV_ITEMS, NavItem } from "@/lib/constants/admin-nav";
import { ChevronRight, X } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname === path;
  };

  const isParentActive = (item: NavItem) => {
    // Only highlight parent if we're exactly on the parent path
    // NOT if we're on a child path
    if (!item.children) return isActive(item.path);
    return pathname === item.path;
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? "admin-sidebar-collapsed" : ""}`}>
      <div className="admin-sidebar-header">
        {!collapsed && <div className="admin-sidebar-logo">ARMOIRE</div>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="admin-sidebar-toggle lg:block hidden"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        <Accordion
          type="multiple"
          className="space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;
            const active = isParentActive(item);

            /* ---------------- NO CHILDREN ---------------- */
            if (!hasChildren) {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`admin-nav-item ${
                    active ? "admin-nav-item-active" : ""
                  }`}
                >
                  <Icon className="admin-nav-icon" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            }

            /* ---------------- WITH CHILDREN ---------------- */
            return (
              <AccordionItem key={item.label} value={item.label} className="border-none">
                <AccordionTrigger
                  className={`admin-nav-item hover:bg-sidebar-accent ${
                    active ? "admin-nav-item-active" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="admin-nav-icon" />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                </AccordionTrigger>

                <AccordionContent className="ml-6 space-y-1 mt-1">
                  {item.children!.map((child) => {
                    const ChildIcon = child.icon;
                    const childActive = isActive(child.path) ||
                      (child.path === "/admin/products/search" &&
                        pathname.startsWith("/admin/products/") &&
                        pathname !== "/admin/products" &&
                        pathname !== "/admin/products/add");

                    return (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`admin-nav-subitem ${
                          childActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                        }`}
                      >
                        <ChildIcon className="h-4 w-4" />
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </nav>
    </aside>
  );
}