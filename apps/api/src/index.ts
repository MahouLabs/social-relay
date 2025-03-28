import type { D1Database } from "@cloudflare/workers-types";
import { trpcServer } from "@hono/trpc-server";
import { type Env, Hono } from "hono";
import { env } from "hono/adapter";
import { logger } from "hono/logger";
import { getAuth } from "./auth";
import { corsMiddleware } from "./middlewares/cors";
import { csrfMiddleware } from "./middlewares/csrf";
import { sessionMiddleware } from "./middlewares/session";
import { appRouter } from "./trpc";

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

app
	.use(corsMiddleware)
	.use(csrfMiddleware)
	.use("*", sessionMiddleware)
	.use(logger())
	.use("/trpc/*", trpcServer({ router: appRouter }));

app.get("/", async (c) => {
	console.log("--- REACHED API ---");
	return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/auth/**", (c) => {
	console.log({ raw: c.req.raw });
	return getAuth(c).handler(c.req.raw);
});

// app.on("GET", "/user", (c) => {
// 	return c.json({ user: c.get("user") });
// });

export default app;
