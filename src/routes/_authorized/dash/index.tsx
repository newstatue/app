import { createFileRoute } from "@tanstack/react-router";
import { OverviewPage } from "#/pages/dash/OverviewPage";

export const Route = createFileRoute("/_authorized/dash/")({
	component: OverviewPage,
});
