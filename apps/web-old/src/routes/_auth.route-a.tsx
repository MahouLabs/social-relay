import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/route-a")({
  component: LayoutAComponent,
});

function LayoutAComponent() {
  return <div>I'm A!</div>;
}
