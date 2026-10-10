import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Layout } from "@/components/layout/root/layout.tsx"

export const Route = createRootRoute({
	component: RootLayout,
})

function RootLayout() {
	return (
		<Layout>
			<Outlet />
			<TanStackRouterDevtools />
		</Layout>
	)
}
