import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth/signin" });
    }
    // `context.queryClient` is also available in our loaders
    // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
    // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
  },
});

function RouteComponent() {
  return (
    <main className="h-screen max-h-screen overflow-y-auto md:overflow-hidden">
      <SidebarProvider>
        {/* <AppSidebar /> */}
        <Sidebar />
        {/* <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Home</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
          </SidebarContent>
        </Sidebar> */}
        <section className="container relative flex w-full flex-col items-center rounded-2xl border-gray-800 px-4 md:m-2 md:h-[calc(100vh-1rem)] md:overflow-y-auto md:border md:px-8 md:shadow-sm">
          <Outlet />
        </section>
      </SidebarProvider>
    </main>
  );
}
