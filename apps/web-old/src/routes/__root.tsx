import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  ScriptOnce,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  redirect,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, getHeaders } from "@tanstack/react-start/server";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "@/components/ui/sonner";
import appCss from "@/styles/globals.css?url";
import { authClient } from "@/utils/auth-client";
import { seo } from "@/utils/seo";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";

const getUser = createServerFn({ method: "GET" }).handler(async () => {
  // biome-ignore lint/style/noNonNullAssertion: it does exist
  const { headers } = getWebRequest()!;
  const session = await authClient.getSession({
    fetchOptions: { headers, credentials: "include" },
  });

  return session.data?.user ?? null;
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: Awaited<ReturnType<typeof getUser>>;
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: ({ signal }) => getUser({ signal }),
    }); // we're using react-query for caching, see router.tsx
    return { user };
  },
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
