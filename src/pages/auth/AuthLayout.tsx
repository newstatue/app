import type { ReactNode } from "react";
import { Logo } from "#/pages/root/logo";

export function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<main className="relative flex min-h-svh items-center justify-center px-4 py-20">
			<div className="absolute left-8 top-8">
				<Logo showText />
			</div>
			{children}
		</main>
	);
}
