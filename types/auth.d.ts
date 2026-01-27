
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
