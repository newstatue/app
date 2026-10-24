import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

const getSession = createServerFn({ method: "GET" }).handler(async () => {
	const { auth } = await import("#/server/auth/auth");
	return auth.api.getSession({ headers: getRequestHeaders() });
});

export const Route = createFileRoute("/_authorized")({
	beforeLoad: async () => {
		const session = await getSession();
		if (!session) {
			throw redirect({ to: "/login" });
		}
		return { user: session.user };
	},
	component: Outlet,
});
