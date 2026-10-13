import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Layout } from "@/components/layout/root/layout.tsx"
import { Toaster } from "@/components/ui/toast.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"

export const Route = createRootRoute({
	component: RootLayout,
})

function RootLayout() {
	return (
		<Layout>
			<TooltipProvider>
				<Outlet />
				<Toaster />
				<TanStackRouterDevtools />
			</TooltipProvider>
		</Layout>
	)
}
