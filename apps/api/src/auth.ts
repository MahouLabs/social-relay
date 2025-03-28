import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { Context } from "hono";
import type { AppBindings } from ".";
import getDb from "./db";
import * as schema from "./schema";

export function getAuth(c: Context<AppBindings>) {
	const isProduction = c.env.ENVIRONMENT === "production";

	return betterAuth({
		trustedOrigins: isProduction
			? ["https://app.social-relay.com"]
			: ["http://localhost:3001"],
		basePath: "/auth",
		baseUrl: c.env.BETTER_AUTH_URL,
		database: drizzleAdapter(getDb(c), {
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
				clientId: c.env.AUTH_GOOGLE_CLIENT_ID,
				clientSecret: c.env.AUTH_GOOGLE_CLIENT_SECRET,
			},
		},
		advanced: {
			crossSubDomainCookies: {
				enabled: isProduction,
				domain: ".social-relay.com",
			},
		},
	});
}
