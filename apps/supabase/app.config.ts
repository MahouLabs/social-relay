import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "unenv";

export default defineConfig({
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
		appDirectory: "./src",
	},

	server: {
		preset: "cloudflare-module",
		unenv: cloudflare,
	},
});
