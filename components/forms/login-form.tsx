"use client";

import { useState, useActionState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { sendOtp } from "@/lib/actions/send-otp";
import { sendOtpSchema } from "@/lib/validations";



export function LoginForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const countryCode = "+91"; // Static country code
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        phone: formData.get("phone") as string,
        countryCode: formData.get("countryCode") as string,
      };

      await sendOtpSchema.parseAsync(formValues);

      const result = await sendOtp({
        phone: formValues.phone,
        countryCode: formValues.countryCode,
      });

      if (result.success) {
        toast.success(result.data?.message || "OTP sent successfully to your phone");

        // Navigate to verify-otp page with phone and countryCode in state
        router.push(`/verify-otp?phone=${encodeURIComponent(formValues.phone)}&countryCode=${encodeURIComponent(formValues.countryCode)}`);
        
        return { ...prevState, error: "", status: "SUCCESS" };
      }

      toast.error(result.error || "Failed to send OTP");

      return { ...prevState, error: result.error || "Failed to send OTP", status: "ERROR" };
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
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Phone Number
        </label>
        <div className="relative">
          {/* Static Country Code */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {countryCode}
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
          </div>
          {/* Hidden input for form submission */}
          <input type="hidden" name="countryCode" value={countryCode} />
          {/* Phone Input with padding for country code */}
          <Input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isPending}
            required
            className="pl-16"
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>

      {state.error && (
        <div className="text-sm text-red-600 text-center">{state.error}</div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sending OTP..." : "Send OTP"}
      </Button>
    </form>
  );
}
