import { createFileRoute } from "@tanstack/react-router";
import SignupPage from "#/pages/auth/SignupPage";

export const Route = createFileRoute("/(auth)/sign-up")({
	component: SignupPage,
});
