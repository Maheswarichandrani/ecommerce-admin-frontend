"use client";

import { useState, useActionState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { otpSchema } from "@/lib/validations";

interface VerifyOtpFormProps {
  phone: string;
  countryCode: string;
}

export function VerifyOtpForm({ phone, countryCode }: VerifyOtpFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        phone: formData.get("phone") as string,
        otp: formData.get("otp") as string,
      };

      await otpSchema.parseAsync(formValues);

      const result = await signIn("otp-login", {
        phone: countryCode + formValues.phone,
        otp: formValues.otp,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || "Failed to verify OTP");
        return { ...prevState, error: result.error, status: "ERROR" };
      }

      if (result?.ok) {
        toast.success("Login successful! Redirecting...");
        router.replace("/");
        return { ...prevState, error: "", status: "SUCCESS" };
      }

      toast.error("Failed to verify OTP");
      return { ...prevState, error: "Failed to verify OTP", status: "ERROR" };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error has occurred");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Display Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {countryCode}
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
          </div>
          <input type="hidden" name="phone" value={phone} />
          <Input
            type="text"
            value={phone}
            disabled
            className="pl-16 bg-gray-50 dark:bg-gray-800"
          />
        </div>
      </div>

      {/* OTP Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          OTP Code
        </label>
        <Input
          type="text"
          name="otp"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={isPending}
          required
          maxLength={6}
          className="text-center text-lg tracking-widest"
        />
        {errors.otp && (
          <p className="text-xs text-red-500 mt-1">{errors.otp}</p>
        )}
      </div>

      {state.error && (
        <div className="text-sm text-red-600 text-center">{state.error}</div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Verifying..." : "Verify OTP"}
      </Button>

      {/* Resend OTP Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-sm text-primary hover:underline"
          disabled={isPending}
        >
          Didn't receive OTP? Request again
        </button>
      </div>
    </form>
  );
}
