import type { D1Database } from "@cloudflare/workers-types";
import { type Env, Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getAuth } from "./auth";
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
  const result = await c.env.DB.prepare("SELECT * FROM users").bind().all();
  console.log("RESULT:", result);
  return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  console.log("DB:", c.env.DB);
  console.log("AUTH:", getAuth(c));
  return getAuth(c).handler(c.req.raw);
});
// app.on(["POST", "GET"], "/api/auth/**", (c) => getAuth(c).handler(c.req.raw));

export default app;
