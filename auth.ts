import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { otpSchema } from "./lib/validations";
import { verifyOtp } from "./lib/actions/verify-otp";



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
          const { phone, otp } = await otpSchema.parseAsync(credentials);

          // Use the server action to verify OTP
          const result = await verifyOtp({ phone, otp });

          if (!result.success || !result.data) {
            throw new Error(result.error || "Failed to verify OTP");
          }

          const { user, accessToken } = result.data;

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