import type { D1Database } from "@cloudflare/workers-types";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./auth";
import { sessionMiddleware } from "./middleware";

type Variables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Variables: Variables; Bindings: Bindings }>();

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

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app;
