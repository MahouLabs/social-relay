import { AuthCard } from "@daveyplate/better-auth-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forgot")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <AuthCard view="forgotPassword" />
    </div>
  );
}
