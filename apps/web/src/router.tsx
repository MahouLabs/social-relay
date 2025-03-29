import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import type { AppRouter } from "../../api/src/trpc";
import { routeTree } from "./routeTree.gen";
import { TRPCProvider } from "./utils/trpc";

const headers = createIsomorphicFn()
	.client(() => ({}))
	.server(() => getHeaders());

export function createRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 1000 * 60, // 1 minute
			},
		},
	});

	const trpcClient = createTRPCClient<AppRouter>({
		links: [
			httpBatchLink({
				url: `${import.meta.env.VITE_API_URL}/trpc`,
				headers,
			}),
		],
	});

	const trpc = createTRPCOptionsProxy<AppRouter>({
		client: trpcClient,
		queryClient,
	});

	return routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			context: { queryClient, trpc, trpcClient, user: null },
			defaultPreload: "intent",
			// react-query will handle data fetching & caching
			// https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#passing-all-loader-events-to-an-external-cache
			defaultPreloadStaleTime: 0,
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: NotFound,
			scrollRestoration: true,
			defaultStructuralSharing: true,
			Wrap: ({ children }) => (
				<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
					{children}
				</TRPCProvider>
			),
		}),
		queryClient,
	);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
