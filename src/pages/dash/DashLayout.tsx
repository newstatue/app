import { BookOpen, Folder, House, LayoutCellsLarge } from "@gravity-ui/icons";
import { Avatar, Label } from "@heroui/react";
import { useLocation, useRouter } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { RouterProvider as AriaRouterProvider } from "react-aria-components";
import { Logo } from "#/pages/root/logo";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
} from "#/pages/root/sidebar";

const sections = [
	{
		id: "overview",
		to: "/dash",
		label: "概览",
		icon: LayoutCellsLarge,
	},
	{
		id: "projects",
		to: "/dash/projects",
		label: "示例项目",
		icon: Folder,
	},
	{
		id: "guide",
		to: "/dash/guide",
		label: "使用说明",
		icon: BookOpen,
	},
] as const;

interface DashLayoutProps {
	children: ReactNode;
	user: { name: string; email: string; image?: string | null };
}

export function DashLayout({ children, user }: DashLayoutProps) {
	const router = useRouter();
	return (
		<AriaRouterProvider
			navigate={(href) => {
				void router.navigate({ to: href });
			}}
		>
			<SidebarProvider>
				<DashLayoutContent user={user}>{children}</DashLayoutContent>
			</SidebarProvider>
		</AriaRouterProvider>
	);
}

function DashLayoutContent({ children, user }: DashLayoutProps) {
	const { state, isMobile, setOpenMobile } = useSidebar();
	const router = useRouter();
	const pathname = useLocation({
		select: (location) => location.pathname.replace(/\/$/, ""),
	});
	const [query, setQuery] = useState("");
	const current = sections.find((item) => item.to === pathname) ?? sections[0];
	const showText = isMobile || state === "expanded";
	const filteredSections = sections.filter(
		(item) => !showText || item.label.includes(query.trim()),
	);

	useEffect(
		() => router.subscribe("onResolved", () => setOpenMobile(false)),
		[router, setOpenMobile],
	);

	return (
		<>
			<Sidebar collapsible="icon" variant="inset">
				<SidebarHeader className="py-4">
					<div className="flex min-h-8 items-center px-1">
						<Logo showText={showText} />
					</div>
					{showText && (
						<SidebarInput
							aria-label="搜索导航"
							placeholder="搜索导航…"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
						/>
					)}
				</SidebarHeader>
				<SidebarSeparator />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>工作空间</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu
								aria-label="工作空间导航"
								selectionMode="none"
								items={filteredSections}
								dependencies={[current.id, showText]}
								renderEmptyState={() => (
									<p className="px-2 py-3 text-sm text-muted">没有匹配的导航</p>
								)}
							>
								{(item) => (
									<SidebarMenuItem
										id={item.id}
										href={item.to}
										textValue={item.label}
										isActive={current.id === item.id}
									>
										<item.icon className="size-4 shrink-0" aria-hidden="true" />
										<Label>{item.label}</Label>
									</SidebarMenuItem>
								)}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarSeparator />
				<SidebarFooter>
					<SidebarMenu aria-label="快捷导航" selectionMode="none">
						<SidebarMenuItem
							id="home"
							href="/"
							textValue="返回首页"
							aria-label="返回首页"
						>
							<House className="size-4 shrink-0" aria-hidden="true" />
							<Label>返回首页</Label>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset className="min-w-0">
				<header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-6">
					<SidebarTrigger />
					<span className="text-sm text-muted">工作空间 /</span>
					<span className="text-sm font-medium">{current.label}</span>
					<Avatar
						size="sm"
						className="ml-auto"
						aria-label={user.name || user.email}
					>
						{user.image && (
							<Avatar.Image src={user.image} alt={user.name || user.email} />
						)}
						<Avatar.Fallback>
							{Array.from(user.name.trim() || user.email)[0]?.toUpperCase()}
						</Avatar.Fallback>
					</Avatar>
				</header>
				{children}
			</SidebarInset>
		</>
	);
}
