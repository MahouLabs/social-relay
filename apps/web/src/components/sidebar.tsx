import { UserButton } from "@daveyplate/better-auth-ui";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { authClient } from "@/utils/auth-client";
import { useQueryClient } from "@tanstack/react-query";
export function Sidebar() {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  return (
    <nav className="w-64 p-4 flex flex-col gap-4">
      <Link
        to="/"
        className={`block px-4 py-2 rounded-lg transition-colors ${
          pathname === "/"
            ? "bg-gray-100 text-gray-900 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Home
      </Link>
      <Link
        to="/dashboard"
        className={`block px-4 py-2 rounded-lg transition-colors ${
          pathname === "/dashboard"
            ? "bg-gray-100 text-gray-900 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Dashboard
      </Link>
      <Link
        to="/settings"
        className={`block px-4 py-2 rounded-lg transition-colors ${
          pathname === "/settings"
            ? "bg-gray-100 text-gray-900 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Settings
      </Link>

      <UserButton size="full" className="cursor-pointer mt-auto" disableDefaultLinks />
      <Button
        onClick={() => {
          authClient.signOut();
          queryClient.invalidateQueries({ queryKey: ["user"] });
        }}
      >
        Sign Out
      </Button>
    </nav>
  );
}
