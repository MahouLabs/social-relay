import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction
  ? "https://app.social-relay.com"
  : "http://localhost:3001";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${baseUrl}/dashboard`,
    },
  },

  emailAndPassword: {
    enabled: true,
    // sendResetPassword: async ({ user, url, token }, request) => {
    //   await sendEmail({
    //     to: user.email,
    //     subject: "Reset your password",
    //     text: `Click the link to reset your password: ${url}`,
    //   });
    // },
  },
  trustedOrigins: [baseUrl],
});
