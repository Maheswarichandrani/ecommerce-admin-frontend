import type { Metadata } from "next";
import { Package2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Authentication | eCommerce",
  description: "Sign in to your admin dashboard",
};

export default async  function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <main className="w-full h-screen relative bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm ">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo and Brand */}
          <div  className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package2 className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">eCommerce</span>
              <span className="text-xs text-muted-foreground">Admin Portal</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
            <span>Secure Login</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto flex-1 border gap-4 p-4 flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
