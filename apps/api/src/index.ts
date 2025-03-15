import { Hono } from "hono";
import { auth } from "./auth"; // path to your auth file
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost:3001", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app;
