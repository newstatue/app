import { Card } from "@heroui/react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<main className="mx-auto max-w-2xl px-4 py-16">
			<Card>
				<Card.Header>
					<Card.Title>欢迎</Card.Title>
					<Card.Description>登录或创建账户以继续。</Card.Description>
				</Card.Header>
				<Card.Content className="flex gap-3">
					<Link to="/login" className="button button--primary">
						登录
					</Link>
					<Link to="/sign-up" className="button button--secondary">
						注册
					</Link>
				</Card.Content>
			</Card>
		</main>
	);
}
