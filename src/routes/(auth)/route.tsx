import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthLayout } from "#/pages/auth/AuthLayout";

export const Route = createFileRoute("/(auth)")({
	component: AuthRoute,
});

function AuthRoute() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}
