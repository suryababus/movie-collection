import { getAuthToken } from "@/api";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: () => {
    const token = getAuthToken();
    if (token) {
      throw redirect({ to: "/app/my_collections" });
    }
    throw redirect({
      to: "/auth/login",
    });
  },
});
