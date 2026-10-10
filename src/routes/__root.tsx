import { createRootRoute, Outlet } from "@tanstack/react-router"
import { AppRootLayout } from "@/components/layout/app-root-layout.tsx"

export const Route = createRootRoute({
	component: RootLayout,
})

function RootLayout() {
	return (
		<AppRootLayout>
			<Outlet />
		</AppRootLayout>
	)
}
