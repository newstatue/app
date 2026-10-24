import { Card } from "@heroui/react";

export function OverviewStats() {
	return (
		<div className="grid gap-4 sm:grid-cols-3">
			{[
				["示例项目", "3"],
				["进行中", "1"],
				["已完成", "1"],
			].map(([label, value]) => (
				<Card key={label} className="p-5">
					<Card.Header>
						<Card.Description>{label}</Card.Description>
					</Card.Header>
					<Card.Content>
						<span className="text-3xl font-semibold tabular-nums">{value}</span>
					</Card.Content>
				</Card>
			))}
		</div>
	);
}
