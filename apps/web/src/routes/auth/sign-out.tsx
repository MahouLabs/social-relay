import { AuthCard } from "@daveyplate/better-auth-ui";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-out")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<AuthCard view="signOut" />
		</main>
	);
}
