import { createMiddleware } from "hono/factory";
import { getAuth } from "./auth";

export const sessionMiddleware = createMiddleware(async (c, next) => {
  const auth = getAuth(c);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
