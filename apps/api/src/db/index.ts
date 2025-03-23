import { drizzle } from "drizzle-orm/d1";
import type { Context } from "hono";
import type { AppBindings } from "..";
import * as schema from "./schema";

export function getDb(c: Context<AppBindings>) {
  return drizzle(c.env.DB, { schema });
}
