import { Link } from "@tanstack/react-router";

export function Sidebar() {
  return (
    <nav className="w-64 p-4">
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
