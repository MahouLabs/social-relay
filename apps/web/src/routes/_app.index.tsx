import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: Home,
	loader: ({ context }) => {
		return { user: context.user };
	},
});

function Home() {
	const { queryClient } = Route.useRouteContext();
	const { user } = Route.useLoaderData();
	const router = useRouter();

	return (
		<div className="h-full w-full flex items-center justify-center">
			hello from index
		</div>
	);
}
