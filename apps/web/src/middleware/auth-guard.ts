import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest, setResponseStatus } from "@tanstack/react-start/server";
import { getAuth } from "@/server/auth";
import { getCloudflareContext } from "@/utils/cloudflare-helpers";

// https://tanstack.com/start/latest/docs/framework/react/middleware
// This is a sample middleware that you can use in your server functions.

/**
 * Middleware to force authentication on a server function, and add the user to the context.
 */
export const authMiddleware = createMiddleware().server(
	async ({ next, context }) => {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const { headers } = getWebRequest()!;
		const { env } = await getCloudflareContext();
		const auth = getAuth(env);

		const session = await auth.api.getSession({
			headers,
			query: {
				// ensure session is fresh
				// https://www.better-auth.com/docs/concepts/session-management#session-caching
				disableCookieCache: true,
			},
		});

		if (!session) {
			setResponseStatus(401);
			throw new Error("Unauthorized");
		}

		return next({ context: { user: session.user } });
	},
);
