import { AuthFormCard, AuthSubmitButton } from "./AuthFormCard";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "@heroui/react";
import { FieldError, Input, Label, TextField } from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
	email: z.email({
		error: (issue) =>
			issue.input === "" ? "请输入邮箱。" : "请输入正确的邮箱地址。",
	}),
});

export function ForgotPasswordForm() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const { error } = await authClient.emailOtp.requestPasswordReset({
					email: value.email,
				});
				if (error) {
					toast.danger("发送邮件失败，请稍后重试。", {
						description: error.message,
					});
					return;
				}
				toast.success("邮件已发送", {
					description: `验证码已发送到 ${value.email}`,
				});
				await navigate({
					to: "/otp",
					search: { email: value.email, type: "forgot-password" },
				});
			} catch (error) {
				toast.danger("发送邮件请求异常，请检查网络后重试。", {
					description: error instanceof Error ? error.message : undefined,
				});
			}
		},
	});

	return (
		<AuthFormCard
			title="忘记密码了？"
			description={<>输入你的邮箱地址，我们将发送验证码帮助你重置密码。</>}
			onSubmit={() => form.handleSubmit()}
			footer={
				<>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<AuthSubmitButton isSubmitting={isSubmitting}>
								继续
							</AuthSubmitButton>
						)}
					</form.Subscribe>
				</>
			}
		>
			<form.Field name="email">
				{(field) => {
					const isInvalid =
						field.state.meta.isTouched && field.state.meta.errors.length > 0;

					return (
						<TextField
							name={field.name}
							type="email"
							value={field.state.value}
							onChange={field.handleChange}
							onBlur={field.handleBlur}
							isInvalid={isInvalid}
						>
							<Label>邮箱</Label>
							<Input placeholder="m@example.com" />

							{isInvalid && (
								<FieldError>
									{field.state.meta.errors
										.map((error) => error?.message)
										.join("、")}
								</FieldError>
							)}
						</TextField>
					);
				}}
			</form.Field>
		</AuthFormCard>
	);
}
