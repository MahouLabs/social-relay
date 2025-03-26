import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardIndex,
});

function DashboardIndex() {
  return (
    <div className="flex flex-col gap-1">
      Dashboard index page
      <div className="my-4">
        <h2 className="text-xl font-bold mb-2">Scrollable Content</h2>
        <ul className="space-y-2">
          {Array.from({ length: 50 }, (_, i) => (
            <li
              key={i}
              className="p-4 border rounded-md bg-background shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Item {i + 1}</span>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
              <p className="text-muted-foreground mt-2">
                This is a dummy item to demonstrate scrolling. Click to expand
                for more details.
              </p>
            </li>
          ))}
        </ul>
      </div>
      <pre className="rounded-md border bg-card p-1 text-card-foreground">
        routes/dashboard/index.tsx
      </pre>
    </div>
  );
}
