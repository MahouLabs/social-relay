import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	driver: "d1-http",
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
		token: process.env.CLOUDFLARE_D1_TOKEN!,
	},
	out: "./drizzle",
	schema: "./src/server/schema/index.ts",
});

// export default {
//   out: "./drizzle",
//   schema: "./src/lib/server/schema/index.ts",
//   breakpoints: true,
//   verbose: true,
//   strict: true,
//   dialect: "postgresql",
//   casing: "snake_case",
//   dbCredentials: {
//     url: process.env.DATABASE_URL as string,
//   },
// } satisfies Config;
