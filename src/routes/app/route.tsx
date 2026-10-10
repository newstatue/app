import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AppLayout } from "@/components/layout/app/app-layout.tsx"

export const Route = createFileRoute("/app")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<AppLayout>
			<Outlet />
		</AppLayout>
	)
}
