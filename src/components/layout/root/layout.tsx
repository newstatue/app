import { TitleBar } from "@/components/layout/root/title-bar.tsx"

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TitleBar />
			<main className="bg-background">{children}</main>
		</>
	)
}
