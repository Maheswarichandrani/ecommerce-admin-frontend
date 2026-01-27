
export interface User {
    id: string; // UUID
    phone: string;
    countryCode: string;
    phoneVerified: boolean;
    phoneVerifiedAt: string | null; // ISO date string or null
    email: string;
    emailVerified: boolean;
    username: string;
    role: UserRole;
    isActive: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    failedLoginAttempts: number;
    lockedUntil: string | null; // ISO date string or null
}

export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface AuthResponse {
    user: User;
    accessToken: string;
    tokenType: string; // typically 'Bearer'
    expiresIn: number; // in seconds
    message?: string;
}



// Request to send OTP
export interface SendOtpRequest {
    phone: string;
    countryCode: string;
}

// Response after sending OTP
export interface SendOtpResponse {
    success: boolean;
    message?: string;
    expiresIn: number; // seconds
    maskedPhone: string; // +91****3210
}


// Verify OTP request
export interface VerifyOtpRequest {
    phone: string;
    otp: string;
}

// Verify OTP response
export type VerifyOtpResponse = AuthResponse;