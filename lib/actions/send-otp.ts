"use server";

import { SendOtpResponse } from "@/types/auth";
import API_URL from "@/constants/api";

interface SendOtpParams {
    phone: string;
    countryCode: string;
}

interface SendOtpResult {
    success: boolean;
    data?: SendOtpResponse;
    error?: string;
}

/**
 * Server action to send OTP
 * @param params - Object containing phone and countryCode
 * @returns Promise with send OTP result
 */
export async function sendOtp(params: SendOtpParams): Promise<SendOtpResult> {
    try {
        const { phone, countryCode } = params;

        const response = await fetch(`${API_URL}/auth/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone : countryCode + phone, countryCode }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: "Failed to send OTP"
            }));

            console.error("Error during sending OTP:", error);
            return {
                success: false,
                error: error.message || "Failed to send OTP",
            };
        }

        const data: SendOtpResponse = await response.json();

        if (!data.success) {
            return {
                success: false,
                error: data.message || "Failed to send OTP",
            };
        }

        return {
            success: true,
            data,
        };

    } catch (error) {
        console.error("Error during sending OTP:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unexpected error occurred",
        };
    }
}


