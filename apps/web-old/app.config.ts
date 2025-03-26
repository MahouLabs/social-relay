import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";

import reactRefresh from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { createApp } from "vinxi";

export default defineConfig({
	server: {
		preset: "cloudflare-worker", // change to 'netlify' or 'bun' or anyof the supported presets for nitro (nitro.unjs.io)
		experimental: {
			asyncContext: true,
		},
	},
	routers: {
		client: {
			base: "./index.html",
			target: "browser",
			plugins: () => [
				TanStackRouterVite({
					target: "react",
					autoCodeSplitting: true,
					routesDirectory: "./src/routes",
					generatedRouteTree: "./src/routeTree.gen.ts",
				}),
			],
		},
	},
	// 		type: "static",
	// 		name: "public",
	// 		dir: "./public",
	// 	},
	// 	{
	// 		type: "http",
	// 		name: "trpc",
	// 		base: "/trpc",
	// 		handler: "./trpc-server.handler.ts",
	// 		target: "server",
	// 		plugins: () => [],
	// 	},
	// 	{
	// 		type: "spa",
	// 		name: "client",
	// 		handler: "./index.html",
	// 		target: "browser",
	// 		plugins: () => [
	// 			TanStackRouterVite({
	// 				target: "react",
	// 				autoCodeSplitting: true,
	// 				routesDirectory: "./src/routes",
	// 				generatedRouteTree: "./src/routeTree.gen.ts",
	// 			}),
	// 			reactRefresh(),
	// 		],
	// 	},
	// ],
});

const appconfig = defineConfig({
	vite: {
		plugins: [
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			tailwindcss(),
		],
	},

	// https://react.dev/learn/react-compiler
	react: {
		babel: {
			plugins: [
				[
					"babel-plugin-react-compiler",
					{
						target: "19",
					},
				],
			],
		},
	},

	tsr: {
		// https://github.com/TanStack/router/discussions/2863#discussioncomment-12458714
		appDirectory: "./src",
	},

	server: {
		// https://tanstack.com/start/latest/docs/framework/react/hosting#deployment
		preset: "cloudlare-module",
		unenv: cloudflare,
	},
});
