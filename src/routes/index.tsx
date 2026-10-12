import { createFileRoute } from "@tanstack/react-router"
import { TitleBar } from "@/components/layout/root/title-bar.tsx"
import Root from "@/features/root/Root.tsx"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex h-full min-h-0 flex-col">
			<TitleBar />
			<div className="min-h-0 flex-1 overflow-hidden">
				<Root />
			</div>
		</div>
	)
}
