import { DefaultSession } from "next-auth";


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            phone: string;
            countryCode: string;
            phoneVerified: boolean;
            email?: string | null;
            username?: string | null;
            role: "CUSTOMER" | "ADMIN";
            isActive: boolean;
        }

        accessToken: string;

    }

    interface User {
        id: string;
        phone: string;
        countryCode: string;
        phoneVerified: boolean;
        email?: string | null;
        emailVerified: boolean;
        username?: string | null;
        role: "CUSTOMER" | "ADMIN";
        isActive: boolean;
        accessToken: string;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        accessToken: string;
        user: {
            id: string;
            phone: string;
            countryCode: string;
            phoneVerified: boolean;
            email?: string | null;
            emailVerified: boolean;
            username?: string | null;
            role: "CUSTOMER" | "ADMIN";
            isActive: boolean;
        };
    }
}


