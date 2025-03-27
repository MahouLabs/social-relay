import type { D1Database } from "@cloudflare/workers-types";
import { type Env, Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getAuth } from "./auth";
import getDb, { users } from "./db";
import { sessionMiddleware } from "./middleware";

type Auth = ReturnType<typeof getAuth>;

export interface AppBindings extends Env {
	Bindings: {
		AUTH_URL: string;
		AUTH_SECRET: string;
		AUTH_GOOGLE_CLIENT_ID: string;
		AUTH_GOOGLE_CLIENT_SECRET: string;
		DB: D1Database;
	};
	Variables: {
		user: Auth["$Infer"]["Session"]["user"] | null;
		session: Auth["$Infer"]["Session"]["session"] | null;
	};
}

const app = new Hono<AppBindings>();

app.use(
	"*",
	cors({
		origin: "https://app.social-relay.com",
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
		maxAge: 600,
	}),
);

app.use(logger());
app.use("*", sessionMiddleware);

app.get("/", async (c) => {
	return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/auth/**", (c) => {
	console.log({ env: env(c), headers: c.req.raw.headers });
	return getAuth(c).handler(c.req.raw);
});

// app.on("GET", "/user", (c) => {
// 	return c.json({ user: c.get("user") });
// });

export default app;
