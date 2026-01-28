
export interface AdminUser {
  id: string;
  username: string | null;
  email: string | null;
  countryCode: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface AuthResponse {
    user: User;
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