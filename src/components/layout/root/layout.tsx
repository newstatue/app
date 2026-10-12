export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-dvh flex-col overflow-hidden">
			<main className="min-h-0 flex-1 overflow-hidden">{children}</main>
		</div>
	)
}
