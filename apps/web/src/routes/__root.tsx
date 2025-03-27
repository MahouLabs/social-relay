import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { type QueryClient, useQueryClient } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import appCss from "@/styles/globals.css?url";
import { authClient } from "@/utils/auth-client";
import { seo } from "@/utils/seo";

// const headers = createIsomorphicFn()
//     .client(() => ({}))
//     .server(() => getHeaders());

// const trpcClient = createTRPCClient<TRPCRouter>({
//     links: [
//         httpBatchLink({
//             // ...
//             headers,
//         }),
//     ],
// });

const getUser = createServerFn({ method: "GET" }).handler(async () => {
	// const headers = getHeaders();
	console.log("--- GET USER SERVER FUNCTION ---");
	const { headers } = getWebRequest()!;
	console.log({ headers });

	const session = await authClient.getSession({
		fetchOptions: { headers, credentials: "include" },
	});

	console.log({ session });

	return session.data?.user ?? null;
});

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	user: Awaited<ReturnType<typeof getUser>>;
}>()({
	// beforeLoad: async ({ context }) => {
	// 	const user = await context.queryClient.fetchQuery({
	// 		queryKey: ["user"],
	// 		// queryFn: ({ signal }) => getUser({ signal }),
	// 		queryFn: async () => {
	// 			const res = await fetch("http://localhost:5173/user", {
	// 				// headers: getHeaders(),
	// 				credentials: "include",
	// 			});
	// 			return res.json();
	// 		},
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

				<AuthUIProvider
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
						forgotPassword: "/forgot",
						resetPassword: "/reset",
					}}
					colorIcons
					emailVerification
					nameRequired
					rememberMe
				>
					<Button onClick={async () => await getUser()}>Get User</Button>
					<Button onClick={() => authClient.getSession()}>
						Get User on Client
					</Button>
					{children}
					<ReactQueryDevtools buttonPosition="bottom-left" />
					<TanStackRouterDevtools position="bottom-right" />
					<Scripts />
					<Toaster />
				</AuthUIProvider>
			</body>
		</html>
	);
}
