import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashLayout } from "#/pages/dash/DashLayout";

export const Route = createFileRoute("/_authorized/dash")({
	component: DashRoute,
	head: () => ({ meta: [{ title: "侧边栏示例 · Evorsio" }] }),
});

function DashRoute() {
	const { user } = Route.useRouteContext();
	return (
		<DashLayout user={user}>
			<Outlet />
		</DashLayout>
	);
}
