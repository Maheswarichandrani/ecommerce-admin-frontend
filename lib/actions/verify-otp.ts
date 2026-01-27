"use server";

import { VerifyOtpResponse } from "@/types/auth";
import API_URL from "@/constants/api";


interface VerifyOtpParams {
    phone: string;
    otp: string;
}

interface VerifyOtpResult {
    success: boolean;
    data?: VerifyOtpResponse;
    error?: string;
}

/**
 * Server action to verify OTP
 * @param params - Object containing phone and otp
 * @returns Promise with verification result
 */
export async function verifyOtp(params: VerifyOtpParams): Promise<VerifyOtpResult> {
    try {
        const { phone, otp } = params;

        const response = await fetch(`${API_URL}/auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone, otp }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: "Invalid OTP"
            }));

            console.error("Error during OTP verification:", error);
            return {
                success: false,
                error: error.message || "Failed to verify OTP",
            };
        }

        const data: VerifyOtpResponse = await response.json();

        if (!data.user || !data.accessToken) {
            return {
                success: false,
                error: "Invalid response from server",
            };
        }

        return {
            success: true,
            data,
        };


    } catch (error) {
        console.error("Error during OTP verification:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unexpected error occurred",
        };
    }
}
