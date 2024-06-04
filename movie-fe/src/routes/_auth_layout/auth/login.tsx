import { LoginForm } from "@/components/blocks/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth_layout/auth/login")({
  component: LoginForm,
});
