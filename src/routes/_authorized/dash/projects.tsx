import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "#/pages/dash/ProjectsPage";

export const Route = createFileRoute("/_authorized/dash/projects")({
	component: ProjectsPage,
});
