import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	tsr: {
		appDirectory: "./src",
	},
	server: {
		preset: "cloudflare-pages",
		unenv: cloudflare,
	},
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
});
