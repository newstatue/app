import { SidebarCollapser } from "@/components/layout/app/sidebar-collapser.tsx"
import { TitleBar } from "@/components/layout/root/title-bar.tsx"
import {
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar.tsx"
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
		<div className="flex h-full min-h-0 flex-col">
			<SidebarProvider className="flex-1 min-h-0 has-data-[variant=inset]:bg-transparent **:data-[slot=sidebar]:block!">
				<TitleBar
					menu={
						<div>
							<SidebarTrigger size="icon" />
							<MenubarMenu>
								<MenubarTrigger>文件</MenubarTrigger>
								<MenubarContent>
									<MenubarItem>新建资源</MenubarItem>
									<MenubarItem>打开</MenubarItem>
									<MenubarItem>退出</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</div>
					}
				/>
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

				<SidebarInset
					className="min-w-0 bg-background
				peer-data-[variant=inset]:m-2
				peer-data-[variant=inset]:rounded-xl
				peer-data-[variant=inset]:shadow-sm"
				>
					<main>{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
