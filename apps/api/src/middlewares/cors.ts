import { cors } from "hono/cors";

const ORIGINS = ["http://localhost:3001", "http://localhost:5173"];

export const corsMiddleware = cors({
	origin: ORIGINS,
	allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowHeaders: ["Content-Type", "Cookie", "Authorization"],
	credentials: true,
	maxAge: 86400,
});

// app.use(
// 	"*",
// 	cors({
// 		origin: "https://app.social-relay.com",
// 		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// 		allowHeaders: ["Content-Type", "Authorization"],
// 		credentials: true,
// 		maxAge: 600,
// 	}),
// );
