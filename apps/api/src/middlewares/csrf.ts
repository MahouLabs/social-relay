import { csrf } from "hono/csrf";

const ORIGINS = ["http://localhost:3001", "http://localhost:5173"];

export const csrfMiddleware = csrf({
	origin: ORIGINS,
});
