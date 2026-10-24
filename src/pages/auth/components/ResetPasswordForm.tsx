import { FieldError, Input, Label, TextField, toast } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
	AuthFormCard,
	AuthSubmitButton,
} from "./AuthFormCard";
import { authClient } from "@/lib/auth-client";

const formSchema = z
	.object({
		password: z.string().min(1, "请输入新密码。").min(8, "密码长度至少8位。"),
		confirmPassword: z.string().min(1, "请再次输入新密码。"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "两次输入的密码不一致。",
		path: ["confirmPassword"],
	});

interface ResetPasswordFormProps {
	email: string;
	otp: string;
}

export function ResetPasswordForm({ email, otp }: ResetPasswordFormProps) {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const { error } = await authClient.emailOtp.resetPassword({
					email,
					otp,
					password: value.password,
				});
				if (error) {
					toast.danger("密码重置失败，验证码可能已过期。", {
						description: error.message,
					});
					return;
				}
				toast.success("密码重置成功，请重新登录。");
				await navigate({ to: "/login", replace: true });
			} catch (error) {
				toast.danger("重置密码请求异常，请检查网络后重试。", {
					description: error instanceof Error ? error.message : undefined,
				});
			}
		},
	});

	return (
		<AuthFormCard
			title="重置密码"
			description={<>请设置一个新的密码。</>}
			onSubmit={() => form.handleSubmit()}
			footer={
				<>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<AuthSubmitButton isSubmitting={isSubmitting}>
								重置密码
							</AuthSubmitButton>
						)}
					</form.Subscribe>
				</>
			}
		>
			<form.Field name="password">
				{(field) => (
					<TextField
						name={field.name}
						isInvalid={field.state.meta.errors.length > 0}
					>
						<Label htmlFor={field.name}>新密码</Label>
						<Input
							id={field.name}
							name={field.name}
							type="password"
							placeholder="至少8位密码"
							autoComplete="new-password"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							aria-invalid={field.state.meta.errors.length > 0}
						/>
						<FieldError>
							{field.state.meta.errors
								.map((error) => error?.message)
								.join("、")}
						</FieldError>
					</TextField>
				)}
			</form.Field>

			<form.Field name="confirmPassword">
				{(field) => (
					<TextField
						name={field.name}
						isInvalid={field.state.meta.errors.length > 0}
					>
						<Label htmlFor={field.name}>确认新密码</Label>
						<Input
							id={field.name}
							name={field.name}
							type="password"
							placeholder="再次输入新密码"
							autoComplete="new-password"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							aria-invalid={field.state.meta.errors.length > 0}
						/>
						<FieldError>
							{field.state.meta.errors
								.map((error) => error?.message)
								.join("、")}
						</FieldError>
					</TextField>
				)}
			</form.Field>
		</AuthFormCard>
	);
}
