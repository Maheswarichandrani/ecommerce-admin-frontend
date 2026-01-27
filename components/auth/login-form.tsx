"use client";

import React, { useState, useActionState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  phone: z.string().min(10, "Enter a valid phone number").max(15),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const initialState = {
  error: "",
  status: "INITIAL",
  fieldErrors: {} as Record<string, string>,
};

async function handleLoginSubmit(prevState: typeof initialState, formData: FormData) {
  try {
    const values = {
      phone: formData.get("phone") as string,
      otp: formData.get("otp") as string,
    };
    await loginSchema.parseAsync(values);
    const res = await signIn("otp-login", {
      ...values,
      redirect: false,
      callbackUrl: "/admin",
    });
    if (res && res.error) {
      return { ...prevState, error: res.error, status: "ERROR", fieldErrors: {} };
    }
    if (res && res.ok) {
      window.location.href = "/admin";
      return { ...prevState, error: "", status: "SUCCESS", fieldErrors: {} };
    }
    return { ...prevState, error: "Login failed", status: "ERROR", fieldErrors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;
      const flatErrors: Record<string, string> = {};
      Object.entries(fieldErrors).forEach(([k, v]) => {
        if (v && v.length > 0) flatErrors[k] = v[0];
      });
      return { ...prevState, error: "Validation failed", status: "ERROR", fieldErrors: flatErrors };
    }
    return { ...prevState, error: "An unexpected error has occurred", status: "ERROR", fieldErrors: {} };
  }
}

export function LoginForm() {
  const [form, formAction, isPending] = useActionState(handleLoginSubmit, initialState);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Phone Number</label>
        <Input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          disabled={isPending}
        />
        {form.fieldErrors.phone && <p className="text-xs text-red-500 mt-1">{form.fieldErrors.phone}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">OTP</label>
        <Input
          type="text"
          name="otp"
          placeholder="Enter the OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          disabled={isPending}
        />
        {form.fieldErrors.otp && <p className="text-xs text-red-500 mt-1">{form.fieldErrors.otp}</p>}
      </div>
      {form.error && <div className="text-sm text-red-600 text-center">{form.error}</div>}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
