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
import {SidebarCollapser} from "@/components/layout/app/sidebar-collapser.tsx";

export function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider
			className="h-full min-h-0 has-data-[variant=inset]:bg-transparent **:data-[slot=sidebar]:block!"
		>
			<SidebarCollapser />

			<Sidebar
				variant="inset"
				collapsible="icon"
				className="flex! **:data-[slot=sidebar-inner]:bg-transparent"
			>
				<SidebarHeader />
				<SidebarContent>
					<SidebarGroup />
					<SidebarGroup />
				</SidebarContent>
				<SidebarFooter />
			</Sidebar>

			<SidebarInset className="min-w-0 bg-background
				peer-data-[variant=inset]:m-2
				peer-data-[variant=inset]:rounded-xl
				peer-data-[variant=inset]:shadow-sm">
				<main>
					<SidebarTrigger size="icon" />
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}