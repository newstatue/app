import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar.tsx"

export function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<Sidebar variant="inset">
				<SidebarHeader />
				<SidebarContent>
					<SidebarGroup />
					<SidebarGroup />
				</SidebarContent>
				<SidebarFooter />
			</Sidebar>
			<SidebarInset>
				<main>
					<SidebarTrigger size="icon" />
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
