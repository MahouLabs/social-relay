import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
	AUTH_GOOGLE_CLIENT_ID: string;
	AUTH_GOOGLE_CLIENT_SECRET: string;
	VARIABLE_1: string
	VITE_BASE_URL: string
	CLOUDFLARE_ACCOUNT_ID: string
	CLOUDFLARE_DATABASE_ID: string
	CLOUDFLARE_D1_TOKEN: string
	BETTER_AUTH_SECRET: string
	DB: D1Database;
}
