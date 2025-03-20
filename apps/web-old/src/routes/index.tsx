import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth-client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data, isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) return <Loader2Icon className="animate-spin" />;

  if (!data || !data.user) navigate({ to: "/signin" });

  return (
    <div className="p-2">
      <h3>Welcome Home {data?.user.name}!!!</h3>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>
  );
}
