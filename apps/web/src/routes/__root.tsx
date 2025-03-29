import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
import {
	type QueryClient,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Outlet,
	redirect,
	ScriptOnce,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createIsomorphicFn, createServerFn } from "@tanstack/react-start";
import { getHeaders, getWebRequest } from "@tanstack/react-start/server";
import type { createTRPCClient } from "@trpc/client";
import type { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import appCss from "@/styles/globals.css?url";
import { authClient } from "@/utils/auth-client";
import { seo } from "@/utils/seo";
import { useTRPC } from "@/utils/trpc";
import type { AppRouter } from "../../../api/src/trpc";

// const headers = createIsomorphicFn()
//     .client(() => ({}))
//     .server(() => getHeaders());

// const trpcClient = createTRPCClient<AppRouter>({
//     links: [
//         httpBatchLink({
//             // ...
//             headers,
//         }),
//     ],
// });

const getUser = createServerFn({ method: "GET" }).handler(async () => {
	const headers = getHeaders();
	// const { headers } = getWebRequest()!;

	const session = await authClient.getSession({
		// @ts-ignore
		fetchOptions: { headers, credentials: "include" },
	});

	return session.data?.user ?? null;
});

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	trpc: ReturnType<typeof createTRPCOptionsProxy<AppRouter>>;
	trpcClient: ReturnType<typeof createTRPCClient<AppRouter>>;
	user: Awaited<ReturnType<typeof getUser>>;
}>()({
	// loader: async ({ context: { trpc, queryClient } }) => {
	// await queryClient.ensureQueryData(trpc.hello.queryOptions());
	// },

	// beforeLoad: async ({ context }) => {
	// 	const user = await context.queryClient.fetchQuery({
	// 		queryKey: ["user"],
	// 		queryFn: ({ signal }) => getUser({ signal }),
	// 	}); // we're using react-query for caching, see router.tsx

	// 	console.log({ user });
	// 	return { user };
	// },
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: "Social Relay",
				description:
					"Schedule and post to multiple social media accounts at once with our open source tool. Includes analytics support to track your social media performance.",
			}),
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const helloQuery = useQuery(trpc.hello.queryOptions());

	console.log({ helloQuery: helloQuery.data });

	return (
		// suppress since we're updating the "dark" class in a custom script below
		<html suppressHydrationWarning lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ScriptOnce>
					{`document.documentElement.classList.toggle(
          'dark',
          localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
          )`}
				</ScriptOnce>

				<AuthQueryProvider>
					<AuthUIProviderTanstack
						persistClient={false}
						onSessionChange={() =>
							queryClient.invalidateQueries({ queryKey: ["user"] })
						}
						authClient={authClient}
						navigate={(href) => router.navigate({ href })}
						replace={(href) => router.navigate({ href, replace: true })}
						LinkComponent={({ href, to, ...props }) => (
							<Link to={href} {...props} />
						)}
						providers={["google"]}
						defaultRedirectTo="/dashboard"
						viewPaths={{
							signIn: "/signin",
							signUp: "/signup",
							signOut: "/signout",
							forgotPassword: "/forgot",
							resetPassword: "/reset",
						}}
						colorIcons
						emailVerification
						nameRequired
						rememberMe
					>
						<TooltipProvider>{children}</TooltipProvider>
						<ReactQueryDevtools buttonPosition="top-right" />
						<TanStackRouterDevtools position="bottom-right" />
						<Scripts />
						<Toaster />
					</AuthUIProviderTanstack>
				</AuthQueryProvider>
			</body>
		</html>
	);
}
