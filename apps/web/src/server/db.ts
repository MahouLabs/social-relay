import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import type { D1Database } from "@cloudflare/workers-types";

export function getDrizzle(db: D1Database) {
	return drizzle(db, { schema });
}
