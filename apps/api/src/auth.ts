import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [
    process.env.NODE_ENV === "production"
      ? "https://app.social-relay.com"
      : "http://localhost:3001",
  ],
});
