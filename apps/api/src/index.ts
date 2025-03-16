import { Hono } from "hono";
import { logger } from "hono/logger";
import { auth } from "./auth";
import { sessionContext } from "./middleware";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(logger());
app.use("*", sessionContext);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  console.log(process.env.BETTER_AUTH_URL, process.env.BETTER_AUTH_SECRET);
  return auth.handler(c.req.raw);
});
// app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app;
