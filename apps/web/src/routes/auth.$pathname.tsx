import { AuthCard, type AuthView } from "@daveyplate/better-auth-ui";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/$pathname")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

const pathnameToViewMap: Record<string, AuthView> = {
  signin: "signIn",
  signup: "signUp",
  forgot: "forgotPassword",
  reset: "resetPassword",
};

function RouteComponent() {
  const { pathname } = Route.useParams();
  const view = pathnameToViewMap[pathname] || "signin";

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <AuthCard view={view} />
    </main>
  );
}
