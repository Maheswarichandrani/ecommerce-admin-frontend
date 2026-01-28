import { AdminShell } from '@/components/layout/admin-shell';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return <AdminShell>{children}</AdminShell>;
}