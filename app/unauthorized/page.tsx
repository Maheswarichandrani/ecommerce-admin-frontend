import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
  const handleLogout = async () => {
    "use server";
    await signOut({
      redirectTo: "/login",
    });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col gap-6 items-center text-center">
      {/* Icon */}
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <ShieldAlert className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          You don't have permission to access the admin dashboard.
        </p>
      </div>

      {/* Details */}
      <div className="w-full bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-sm text-red-800 dark:text-red-300">
          <strong>Admin privileges required</strong>
          <br />
          This area is restricted to administrators only. If you believe this is an error, please contact your system administrator.
        </p>
      </div>

      {/* Logout Form */}
      <form action={handleLogout} className="w-full">
        <Button
          type="submit"
          className="w-full"
          variant="destructive"
          size="lg"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </form>

      {/* Footer */}
      <div className="text-xs text-gray-400 pt-2">
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </div>
    </div>
  );
}
