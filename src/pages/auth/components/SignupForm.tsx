import { FieldError, Input, Label, TextField, toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client.ts";
import {AuthFormCard, AuthLink, AuthSubmitButton} from "./auth-form-card";

const formSchema = z
	.object({
		email: z.email({
			error: (iss) =>
				iss.input === "" ? "请输入邮箱。" : "请输入正确的邮箱地址。",
		}),
		password: z.string().min(1, "请输入密码。").min(8, "密码长度至少8位。"),
		confirmPassword: z.string().min(1, "请确认您的密码。"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "两次输入的密码不匹配。",
		path: ["confirmPassword"],
	});

export function SignupForm() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const seed = crypto.randomUUID();
				const { error } = await authClient.signUp.email({
					name: value.email.split("@")[0],
					email: value.email,
					password: value.password,
					image: `https://api.dicebear.com/10.x/waves/svg?seed=${seed}`,
				});
				if (error) {
					toast.danger("创建账户失败。", { description: error.message });
					return;
				}

				const { error: otpError } =
					await authClient.emailOtp.sendVerificationOtp({
						email: value.email,
						type: "email-verification",
					});
				if (otpError) {
					toast.danger("账户已创建，但验证码发送失败", {
						description: otpError.message,
					});
					return;
				}
				toast.success(`请验证邮箱：${value.email}`);
				await navigate({
					to: "/otp",
					search: { email: value.email, type: "signup" },
				});
			} catch (error) {
				toast.danger(
					"注册流程请求异常，请检查网络；如果账户已创建，请尝试登录。",
					{ description: error instanceof Error ? error.message : undefined },
				);
			}
		},
	});

	return (
		<AuthFormCard
			title="创建账户"
			description={
				<>
					已经有账户了？<AuthLink to="/login">登录</AuthLink>
				</>
			}
			onSubmit={() => form.handleSubmit()}
			footer={
				<>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<AuthSubmitButton isSubmitting={isSubmitting}>
								注册
							</AuthSubmitButton>
						)}
					</form.Subscribe>
				</>
			}
		>
			<form.Field name="email">
				{(field) => (
					<TextField
						name={field.name}
						isInvalid={field.state.meta.errors.length > 0}
					>
						<Label htmlFor={field.name}>邮箱</Label>
						<Input
							id={field.name}
							name={field.name}
							type="email"
							placeholder="m@example.com"
							autoComplete="email"
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

			<form.Field name="password">
				{(field) => (
					<TextField
						name={field.name}
						isInvalid={field.state.meta.errors.length > 0}
					>
						<Label htmlFor={field.name}>密码</Label>
						<Input
							id={field.name}
							name={field.name}
							type="password"
							placeholder="请输入密码"
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
						<Label htmlFor={field.name}>确认密码</Label>
						<Input
							id={field.name}
							name={field.name}
							type="password"
							placeholder="请输入密码"
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
