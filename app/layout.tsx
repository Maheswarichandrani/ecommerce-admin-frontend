import type { Metadata } from "next";
import { Montserrat, Scheherazade_New } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { AdminAuthProvider } from "@/providers/admin-auth-provider";
import { QueryProvider } from "@/providers/query-provider";

const scheherazade = Scheherazade_New({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",         // body + UI
  display: "swap",
});



export const metadata: Metadata = {
  title: "The Nala Armoire Admin Dashboard",
  description: "Admin Dashboard for The Nala Armoire",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${scheherazade.variable} antialiased ${montserrat.variable}`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
          >
            <AdminAuthProvider>
              <SidebarProvider defaultOpen={false}>
                {children}
              </SidebarProvider>
            </AdminAuthProvider>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
