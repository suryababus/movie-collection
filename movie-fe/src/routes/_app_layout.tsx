import {
  Link,
  Outlet,
  createFileRoute,
  useRouter,
} from "@tanstack/react-router";

import { Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setAuthToken } from "@/api";

export const Route = createFileRoute("/_app_layout")({
  component: AuthWrapper,
});
function AuthWrapper() {
  const router = useRouter();

  const onLogout = () => {
    setAuthToken("");
    router.navigate({
      to: "/auth/login",
    });
  };

  return (
    <div className="h-screen w-screen bg-background dark flex  flex-col">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 flex-row w-full">
        <nav className="hidden flex-col gap-6 py-8 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 flex-1">
          <Link
            href=""
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Movie Spa</span>
          </Link>
          <Link
            to="/app/collection"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Collections
          </Link>
          <Link
            to="/app/my_collections"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            My Collections
          </Link>
          <Link
            to="/app/movies"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Movies
          </Link>
        </nav>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button size={"sm"} onClick={onLogout}>
            Log out
          </Button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
