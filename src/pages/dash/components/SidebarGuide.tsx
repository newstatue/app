import { Card, Kbd } from "@heroui/react";

export function SidebarGuide() {
	return (
		<Card className="p-5 sm:p-6">
			<Card.Header>
				<Card.Title>侧边栏交互</Card.Title>
				<Card.Description>桌面与移动端共享相同的导航内容。</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul className="space-y-4 text-sm leading-6">
					<li>点击顶部的侧栏按钮，在完整导航和图标导航之间切换。</li>
					<li>
						也可以使用 <Kbd>Ctrl / ⌘ + B</Kbd> 快捷键切换。
					</li>
					<li>导航支持方向键移动焦点，按 Enter 打开页面。</li>
					<li>
						窗口宽度小于 768px 时，侧栏切换为抽屉；选择导航、按 Esc
						或点击遮罩即可关闭。
					</li>
					<li>搜索框可以按名称筛选导航项目。</li>
				</ul>
			</Card.Content>
		</Card>
	);
}
