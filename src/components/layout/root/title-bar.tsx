export function TitleBar() {
	return (
		<header
			data-tauri-drag-region
			className="flex h-12 shrink-0 items-center justify-center border-b"
		>
			<span className="pointer-events-none text-sm font-medium">Evorsio</span>
		</header>
	)
}
