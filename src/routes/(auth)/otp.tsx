import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { OtpPage } from "#/pages/auth/OtpPage";

const searchSchema = z.object({
	email: z.email(),
	type: z.enum(["signup", "forgot-password"]),
});

export const Route = createFileRoute("/(auth)/otp")({
	validateSearch: (search) => {
		const result = searchSchema.safeParse(search);
		if (!result.success) throw redirect({ to: "/login" });
		return result.data;
	},
	component: OtpPage,
});
