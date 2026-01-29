import { AdminShell } from '@/components/layout/admin-shell';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className='w-full flex flex-col h-screen'>
      <SidebarProvider className="flex-1">
        <AdminShell>{children}</AdminShell>
      </SidebarProvider>
    </div>
  );
}