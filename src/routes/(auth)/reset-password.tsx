import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { ResetPasswordPage } from "#/pages/auth/ResetPasswordPage";

const searchSchema = z.object({
	email: z.email(),
	otp: z.string().regex(/^\d{6}$/),
});

export const Route = createFileRoute("/(auth)/reset-password")({
	validateSearch: (search) => {
		const result = searchSchema.safeParse(search);
		if (!result.success) throw redirect({ to: "/forgot-password" });
		return result.data;
	},
	component: ResetPasswordPage,
});
