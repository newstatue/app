import { Button, Card, Link } from "@heroui/react";
import { createLink } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const AuthLink = createLink(Link);

interface AuthFormCardProps {
	title: string;
	description: ReactNode;
	children: ReactNode;
	footer: ReactNode;
	onSubmit: () => Promise<void>;
}

export function AuthFormCard({
	title,
	description,
	children,
	footer,
	onSubmit,
}: AuthFormCardProps) {
	return (
		<form
			className="w-full max-w-md"
			noValidate
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				void onSubmit();
			}}
		>
			<Card className="w-full gap-6 p-6">
				<Card.Header className="items-center gap-2 text-center">
					<Card.Title className="text-xl font-semibold tracking-tight">
						{title}
					</Card.Title>
					<Card.Description className="text-sm leading-6">
						{description}
					</Card.Description>
				</Card.Header>
				<Card.Content className="gap-5">{children}</Card.Content>
				<Card.Footer className="flex-col items-stretch gap-3">
					{footer}
				</Card.Footer>
			</Card>
		</form>
	);
}

export function AuthSubmitButton({
	isSubmitting,
	children,
}: {
	isSubmitting: boolean;
	children: ReactNode;
}) {
	return (
		<Button
			className="h-11 w-full"
			type="submit"
			isDisabled={isSubmitting}
			isPending={isSubmitting}
		>
			{children}
		</Button>
	);
}
