import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized Access | Admin Dashboard",
  description: "You do not have permission to access this page",
};

export default function UnauthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen relative bg-linear-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
        {children}
      </div>
    </main>
  );
}
