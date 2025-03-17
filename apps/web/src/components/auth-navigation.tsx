import { cn } from "@/utils/cn";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function AuthNavigation() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-row items-center justify-start mt-0 [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar border-x w-full border-t max-w-max bg-opacity-0">
      <Link to="/signin">
        <Button
          className={cn(
            "relative px-4 py-2 rounded-none opacity-80 hover:opacity-100",
            {
              "bg-accent text-accent-foreground dark:bg-accent/50":
                pathname === "/signin",
            },
          )}
          variant="ghost"
        >
          Sign In
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          className={cn(
            "relative px-4 py-2 rounded-none opacity-80 hover:opacity-100",
            {
              "bg-accent text-accent-foreground dark:bg-accent/50":
                pathname === "/signup",
            },
          )}
          variant="ghost"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
