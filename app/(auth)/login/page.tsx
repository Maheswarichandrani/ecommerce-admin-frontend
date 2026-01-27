import { LoginForm } from "@/components/forms/login-form";



export const metadata = {
    title: "Login",
};

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <img src="/favicon.ico" alt="Logo" className="w-12 h-12 mb-2" />
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sign in to Admin Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Enter your phone and OTP to access your account</p>
                </div>


                <LoginForm />


                <div className="text-xs text-center text-gray-400 pt-2">&copy; Admin Dashboard. All rights reserved.</div>
            </div>
        </div>
    );
}