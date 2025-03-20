import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/route-b")({
  component: LayoutBComponent,
});

function LayoutBComponent() {
  return <div>I'm B!</div>;
}
