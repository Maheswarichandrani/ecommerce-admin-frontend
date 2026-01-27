import { VerifyOtpForm } from "@/components/forms/verify-otp-form";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Verify OTP | Admin Dashboard",
};

export default async function VerifyOTPPage({
    searchParams
}: {
    searchParams: Promise<{ phone?: string; countryCode?: string }>;
}) {
    const params = await searchParams;
    const phone = params.phone;
    const countryCode = params.countryCode || "+91";

    // Redirect to login if phone is not provided
    if (!phone) {
        redirect("/login");
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Verify OTP
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                        We've sent a verification code to<br />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            {countryCode} {phone}
                        </span>
                    </p>
                </div>

                <VerifyOtpForm phone={phone} countryCode={countryCode} />

                <div className="text-xs text-center text-gray-400 pt-2">
                    &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
                </div>
            </div>
        </div>
    );
}