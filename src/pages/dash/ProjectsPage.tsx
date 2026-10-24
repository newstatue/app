import { DashPage } from "./components/DashPage";
import { ProjectsCard } from "./components/ProjectsCard";

export function ProjectsPage() {
	return (
		<DashPage
			title="示例项目"
			description="这是侧边栏布局示例，以下内容均为演示数据。"
		>
			<ProjectsCard />
		</DashPage>
	);
}
