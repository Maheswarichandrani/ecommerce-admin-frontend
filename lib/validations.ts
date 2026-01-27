import { z } from "zod";


export const sendOtpSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  countryCode: z.string().min(1, "Country code is required"),
});



// OTP form validation schema
export const otpSchema = z.object({
  phone: z.string().min(10).max(15, "Invalid phone number"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});