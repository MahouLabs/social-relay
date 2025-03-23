import { AuthCard } from "@daveyplate/better-auth-ui";
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

function RouteComponent() {
  const { pathname } = Route.useParams();

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <AuthCard pathname={pathname}  />
    </main>
  );
}
