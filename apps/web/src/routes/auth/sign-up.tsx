import { AuthCard } from "@daveyplate/better-auth-ui";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-up")({
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
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<AuthCard view="signUp" />
		</main>
	);
}
