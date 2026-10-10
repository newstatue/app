import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AppRootLayout } from "@/components/layout/app/app-root-layout.tsx"

export const Route = createFileRoute("/app")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<AppRootLayout>
			<Outlet />
		</AppRootLayout>
	)
}
