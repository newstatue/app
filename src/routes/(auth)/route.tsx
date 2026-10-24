import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Logo } from "#/pages/root/logo.tsx";

export const Route = createFileRoute("/(auth)")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<main className="relative flex min-h-svh items-center justify-center px-4 py-20">
			<div className="absolute left-8 top-8">
				<Logo showText />
			</div>
			<Outlet />
		</main>
	);
}
