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
      <SidebarInset className="overflow-x-hidden">
        <TopBar />
          <div className="
            w-full max-w-full overflow-x-hidden
            px-3 py-4
            sm:px-4 sm:py-5
            md:px-6 md:py-6
          ">
            {children}
          </div>
      </SidebarInset>
    </>
  );
}



