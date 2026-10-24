import type { ReactNode } from "react";

export function DashPage({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: ReactNode;
}) {
	return (
		<div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
				{description && (
					<p className="text-sm leading-6 text-muted">{description}</p>
				)}
			</div>
			{children}
		</div>
	);
}
