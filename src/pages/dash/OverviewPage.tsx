import { DashPage } from "./components/DashPage";
import { OverviewStats } from "./components/OverviewStats";
import { ProjectsCard } from "./components/ProjectsCard";

export function OverviewPage() {
	return (
		<DashPage
			title="概览"
			description="这是侧边栏布局示例，以下内容均为演示数据。"
		>
			<OverviewStats />
			<ProjectsCard />
		</DashPage>
	);
}
