import { authClient } from "@/utils/auth-client";
import {
  Link,
  Outlet,
  type ParsedLocation,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getWebRequest } from "@tanstack/react-start/server";

// export const getServerSession = createServerFn({ method: "GET" }).handler(
//   async () => {
//     const event = getWebRequest();
//     const cookie = getCookie("better-auth.session_token");
//     // Process the cookie as needed
//     return { cookie };
//   },
// );

const redirectToSignin = (location: ParsedLocation) => {
  throw redirect({
    to: "/signin",
    search: {
      redirect: location.href,
    },
  });
};

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      authClient.signOut().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: "/" });
        });
      });
    }
  };

  return (
    <div className="p-2 h-full">
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul className="py-2 flex gap-2">
        <li>
          <Link
            to="/dashboard"
            className="hover:underline data-[status='active']:font-semibold"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/route-a"
            className="hover:underline data-[status='active']:font-semibold"
          >
            Route A
          </Link>
        </li>
        <li>
          <Link
            to="/route-b"
            className="hover:underline data-[status='active']:font-semibold"
          >
            Route B
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
