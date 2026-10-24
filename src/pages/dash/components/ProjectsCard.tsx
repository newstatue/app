import { Card, Chip } from "@heroui/react";

const projects = [
	{
		name: "品牌官网",
		description: "整理品牌介绍与产品展示。",
		status: "进行中",
	},
	{
		name: "账户中心",
		description: "统一登录、注册与账户体验。",
		status: "待开始",
	},
	{
		name: "组件规范",
		description: "整理页面布局和交互规范。",
		status: "已完成",
	},
];

export function ProjectsCard() {
	return (
		<Card className="p-5 sm:p-6">
			<Card.Header>
				<Card.Title>示例项目</Card.Title>
				<Card.Description>点击左侧导航可以切换当前展示内容。</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul className="divide-y divide-separator">
					{projects.map((project) => (
						<li
							key={project.name}
							className="flex flex-wrap items-center justify-between gap-3 py-4"
						>
							<div className="space-y-1">
								<p className="text-sm font-medium">{project.name}</p>
								<p className="text-sm text-muted">{project.description}</p>
							</div>
							<Chip
								size="sm"
								variant="soft"
								color={project.status === "已完成" ? "success" : "default"}
							>
								{project.status}
							</Chip>
						</li>
					))}
				</ul>
			</Card.Content>
		</Card>
	);
}
