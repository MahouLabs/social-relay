import { RedirectToSignIn } from "@daveyplate/better-auth-ui";
import { SignedIn } from "@daveyplate/better-auth-ui";
import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { Sidebar } from "@/components/sidebar";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
	// beforeLoad: async ({ context }) => {
	//   if (!context.user) {
	//     // @ts-ignore
	//     throw redirect({ to: "/auth/signin" });
	//   }

	//   // `context.queryClient` is also available in our loaders
	//   // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
	//   // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
	// },
});

function RouteComponent() {
	// const { isLoading } = useQuery({
	//   queryKey: ["user"],
	//   queryFn: () => authClient.getSession(),
	// });

	// if (isLoading) {
	//   return <div>Loading...</div>;
	// }

	return (
		<>
			<RedirectToSignIn />

			<SignedIn>
				<main className="h-screen max-h-screen overflow-y-auto md:overflow-hidden">
					<Sidebar />
					<section className="container relative flex w-full flex-col items-center rounded-2xl border-gray-800 px-4 md:m-2 md:h-[calc(100vh-1rem)] md:overflow-y-auto md:border md:px-8 md:shadow-sm">
						<Outlet />
					</section>
				</main>
			</SignedIn>
		</>
	);
}
