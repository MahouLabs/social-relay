import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "./schema";
import { getDrizzle } from "./db";
import type { D1Database } from "@cloudflare/workers-types";
import type { Env } from "worker-configuration";

export function getAuth(env: Env) {
	return betterAuth({
		// trustedOrigins: ["http://localhost:3001", "https://app.social-relay.com"],
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 5 * 60, // 5 minutes
			},
		},

		database: drizzleAdapter(getDrizzle(env.DB), {
			schema,
			provider: "sqlite",
			usePlural: true,
		}),
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
		socialProviders: {
			google: {
				clientId: env.AUTH_GOOGLE_CLIENT_ID,
				clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
			},
		},
	});
}
