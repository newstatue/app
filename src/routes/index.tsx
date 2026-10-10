import { createFileRoute } from "@tanstack/react-router"
import Root from "@/features/root/Root.tsx"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	return <Root />
}
