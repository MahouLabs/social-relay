import { Link, useLocation } from "@tanstack/react-router";

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <nav className="w-64 p-4">
      <ul className="space-y-2">
        <li>
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
        </li>
        <li>
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
        </li>
        <li>
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
        </li>
      </ul>
    </nav>
  );
}
