import { DashPage } from "./components/DashPage";
import { SidebarGuide } from "./components/SidebarGuide";

export function GuidePage() {
	return (
		<DashPage
			title="使用说明"
			description="试试收起导航，或缩窄窗口查看抽屉模式。"
		>
			<SidebarGuide />
		</DashPage>
	);
}
