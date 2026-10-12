import { TitleBar } from "@/components/layout/root/title-bar.tsx"
export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-dvh flex-col overflow-hidden">
			<TitleBar />
			<main className="min-h-0 flex-1 overflow-hidden">{children}</main>
		</div>
	)
}
