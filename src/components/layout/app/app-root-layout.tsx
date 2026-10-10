import { AppSidebar } from "@/components/layout/app/app-sidebar.tsx"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx"

export function AppRootLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	)
}
