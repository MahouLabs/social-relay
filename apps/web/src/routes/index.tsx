import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/auth-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
