import { SignupForm } from "@/components/blocks/signup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth_layout/auth/signup")({
  component: SignupForm,
});
