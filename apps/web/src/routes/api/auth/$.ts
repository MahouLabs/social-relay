import { getAuth } from "@/server/auth";
import { getCloudflareContext } from "@/utils/cloudflare-helpers";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/auth/$")({
	GET: async ({ request }) => {
		const { env } = await getCloudflareContext();
		return getAuth(env).handler(request);
	},
	POST: async ({ request }) => {
		const { env } = await getCloudflareContext();
		return getAuth(env).handler(request);
	},
});
