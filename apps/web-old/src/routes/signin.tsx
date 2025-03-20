import { SignIn } from "@/components/signin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    return {
      redirect: search.redirect as string,
    };
  },
});

function RouteComponent() {
  return (
    <section className="flex flex-col min-h-screen items-center justify-center p-4">
      <SignIn />
    </section>
  );
}
