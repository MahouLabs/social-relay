import { SignIn } from "@/components/signin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-col min-h-screen items-center justify-center p-4">
      <SignIn />
    </section>
  );
}
