import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<main className="flex min-h-svh items-center justify-center px-4 py-12">
			<Outlet />
		</main>
	);
}
