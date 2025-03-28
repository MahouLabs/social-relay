import { cors } from "hono/cors";

export const corsMiddleware = cors({
	origin: "https://app.social-relay.com",
	allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowHeaders: ["Content-Type", "Cookie", "Authorization"],
	credentials: true,
	maxAge: 86400,
});
