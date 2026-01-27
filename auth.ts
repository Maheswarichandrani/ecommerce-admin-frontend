import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { AuthResponse } from "./types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const otpSchema = z.object({
  phone: z.string().min(10).max(15, "Invalid phone number"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "otp-login",
      name: "OTP Login",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "Enter your phone number" },
        otp: { label: "OTP", type: "text", placeholder: "Enter the OTP" },
      },
      async authorize(credentials) {
        try {
          const { phone, otp } = otpSchema.parse(credentials);

          const response = await fetch(`${API_URL}/auth/verify-otp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone, otp }),
          });

          if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "Invalid OTP" }));
            throw new Error(error.message || "Failed to verify OTP");
          }

          const data: AuthResponse = await response.json();
          const user = data.user;
          const accessToken = data.accessToken; // Adjust according to your API response

          if (!user || !accessToken) {
            return null;
          }

          return {
            id: user.id,
            phone: user.phone,
            countryCode: user.countryCode,
            phoneVerified: user.phoneVerified,
            email: user.email,
            username: user.username,
            role: user.role,
            isActive: user.isActive,
            accessToken: accessToken,
            emailVerified: user.emailVerified ?? null, // Ensure emailVerified is present
          }
        } catch (error) {
          console.error("Error during OTP verification:", error);
          return null;
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          phone: user.phone,
          countryCode: user.countryCode,
          phoneVerified: user.phoneVerified,
          email: user.email,
          emailVerified: user.emailVerified as boolean,
          username: user.username,
          role: user.role,
          isActive: user.isActive,
        };
      }

      return token;
    },

    async session({ session, token }) {
      // Add custom fields to session
      session.accessToken = token.accessToken as string;
      // Remove emailVerified if it's a boolean, as AdapterUser expects a Date or null
      const { emailVerified, ...restUser } = token.user || {};
      session.user = {
        ...session.user,
        ...restUser,
        email: restUser.email ?? "",
      };

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login on error
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 24 * 60 * 60, // 5 days to match your refresh token
  },
  trustHost: true,
})