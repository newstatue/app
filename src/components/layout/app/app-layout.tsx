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
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar.tsx"
import {
	Clock,
	FileText,
	Folder,
	Home,
	Settings,
	Star,
	User,
	ChevronDown,
	Plus,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import type { Project } from "@/bindings/Project.ts"
import { invoke } from "@tauri-apps/api/core"
import { ScrollArea } from "@/components/ui/scroll-area.tsx"
import { toast } from "@/components/ui/toast.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarGroups = [
	{
		label: "工作空间",
		items: [
			{ id: "home", label: "概览", icon: Home },
			{ id: "resources", label: "所有资源", icon: FileText },
			{ id: "recent", label: "最近打开", icon: Clock },
			{ id: "favorites", label: "收藏", icon: Star },
		],
	},
	{
		label: "示例项目",
		items: [
			{ id: "design", label: "设计素材", icon: Folder },
			{ id: "notes", label: "学习笔记", icon: Folder },
			{ id: "personal", label: "个人项目", icon: Folder },
		],
	},
]

export function AppLayout({ children }: { children: React.ReactNode }) {
	const [activeItem, setActiveItem] = useState("home")
	const [projects, setProjects] = useState<Project[]>([])

	const refreshProjects = useCallback(async () => {
		const result = await invoke<Project[]>("list_projects")
		setProjects(result)
	}, [])

	useEffect(() => {
		void refreshProjects().catch((error) => {
			toast.add({
				type: "error",
				data: `Failed to refresh projects: ${String(error)}`,
			})
		})
	}, [refreshProjects])

	return (
		<div className="flex h-full min-h-0 flex-col">
			<SidebarProvider
				style={{ "--sidebar-width-icon": "2.75rem" } as React.CSSProperties}
				className="flex-1 min-h-0 flex-col
			has-data-[variant=inset]:bg-transparent
			**:data-[slot=sidebar]:block!"
			>
				<TitleBar
					menu={
						<div className="flex items-center gap-2">
							<SidebarTrigger
								size="icon"
								className="hover:bg-foreground/5 aria-expanded:bg-foreground/5"
							/>
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

				<div className="flex min-h-0 w-full flex-1">
					<Sidebar
						variant="inset"
						collapsible="icon"
						className="top-11! h-[calc(100dvh-2.75rem)]! text-foreground/50
						**:data-[slot=sidebar-inner]:bg-transparent
						**:data-[slot=dropdown-menu-trigger]:hover:bg-foreground/5
        				**:data-[slot=dropdown-menu-trigger]:data-active:bg-foreground/5
						**:data-[slot=sidebar-menu-button]:hover:bg-foreground/5
        				**:data-[slot=sidebar-menu-button]:data-active:bg-foreground/5"
					>
						<SidebarHeader>
							<SidebarMenu>
								<SidebarMenuItem>
									<DropdownMenu>
										<DropdownMenuTrigger render={<SidebarMenuButton />}>
											<Folder />
											<span>Projects</span>
											<ChevronDown className="ml-auto group-data-[collapsible=icon]:hidden" />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<ScrollArea className="h-50">
												{projects.map((project) => (
													<Tooltip>
														<TooltipTrigger
															render={<DropdownMenuItem key={project.path} className="min-w-0" />}
														>
															<span className="shrink-0 font-medium">{project.name}</span>
														</TooltipTrigger>
														<TooltipContent side="right" align="center">
															<p className="max-w-80 break-all">{project.path}</p>
														</TooltipContent>
													</Tooltip>
												))}
											</ScrollArea>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Plus />
												<span>New Project</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarHeader>
						<SidebarContent>
							{sidebarGroups.map((group) => (
								<SidebarGroup key={group.label}>
									<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
									<SidebarMenu className="gap-1">
										{group.items.map((item) => (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton
													tooltip={item.label}
													isActive={activeItem === item.id}
													onClick={() => setActiveItem(item.id)}
												>
													<item.icon />
													<span>{item.label}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroup>
							))}
						</SidebarContent>
						<SidebarFooter>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip="设置"
										isActive={activeItem === "settings"}
										onClick={() => setActiveItem("settings")}
									>
										<Settings />
										<span>设置</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton tooltip="本地用户" size="lg" disabled>
										<User />
										<span>本地用户</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarFooter>
					</Sidebar>

					<SidebarInset className="m-1! min-w-0 bg-background">
						<main>{children}</main>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	)
}
