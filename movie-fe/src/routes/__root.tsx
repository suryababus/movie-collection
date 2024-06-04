import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen w-screen bg-background dark text-foreground overflow-scroll">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
