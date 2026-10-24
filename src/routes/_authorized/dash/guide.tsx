import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "#/pages/dash/GuidePage";

export const Route = createFileRoute("/_authorized/dash/guide")({
	component: GuidePage,
});
