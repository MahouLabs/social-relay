import { UserErrorComponent } from "@/components/user-error";
import { NotFound } from "@/components/not-found";
import type { User } from "@/utils/users";
import { DEPLOY_URL } from "@/utils/users";
import { createFileRoute } from "@tanstack/react-router";
import axios from "redaxios";

export const Route = createFileRoute("/users/$userId")({
  loader: async ({ params: { userId } }) => {
    return await axios
      .get<User>(`${DEPLOY_URL}/api/users/${userId}`)
      .then((r) => r.data)
      .catch(() => {
        throw new Error("Failed to fetch user");
      });
  },
  errorComponent: UserErrorComponent,
  component: UserComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>;
  },
});

function UserComponent() {
  const user = Route.useLoaderData();

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{user.name}</h4>
      <div className="text-sm">{user.email}</div>
    </div>
  );
}
