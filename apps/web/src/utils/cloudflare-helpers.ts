import { getEvent } from "vinxi/http";
import type { Env } from "worker-configuration";

type CfEnv = {
	env: Env;
	waitUntil: (promise: Promise<unknown>) => void;
};

const getDevProxy = async () => {
	const cf = await import("wrangler");
	return await cf.getPlatformProxy<Env>({ persist: true });
};

let ___devProxy: ReturnType<typeof getDevProxy> | undefined = undefined;

export const getCloudflareContext = async (): Promise<CfEnv> => {
	const event = getEvent();
	if (import.meta.env.DEV) {
		// Attach the cloudflare context
		if (!___devProxy) {
			___devProxy = getDevProxy();
		}
		const proxy = await ___devProxy;
		return {
			env: proxy.env,
			waitUntil: (promise: Promise<unknown>) => proxy.ctx.waitUntil(promise),
		};
	}

	return {
		env: event.context.cloudflare?.env as Env,
		waitUntil: (promise: Promise<unknown>) => {
			event.context.cloudflare?.context?.waitUntil(promise);
		},
	};
};
