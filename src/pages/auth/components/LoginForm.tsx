import { FieldError, Input, Label, TextField, toast } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { authClient } from "@/lib/auth-client.ts";
import { AuthFormCard, AuthLink, AuthSubmitButton } from "./AuthFormCard";

const formSchema = z.object({
	email: z.email({
		error: (iss) =>
			iss.input === "" ? "请输入邮箱。" : "请输入正确的邮箱地址。",
	}),
	password: z.string().min(1, "请输入密码。").min(8, "密码长度至少8位。"),
});

export function LoginForm() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const { error } = await authClient.signIn.email({
					email: value.email,
					password: value.password,
				});
				if (error) {
					toast.danger("登录失败，请稍后重试。", {
						description: error.message,
					});
					return;
				}
				toast.success(`欢迎回来，${value.email}！`);
				await navigate({ to: "/", replace: true });
			} catch (error) {
				toast.danger("登录请求异常，请检查网络后重试。", {
					description: error instanceof Error ? error.message : undefined,
				});
			}
		},
	});

	return (
		<AuthFormCard
			title="欢迎回来"
			description={
				<>
					还没有账户？<AuthLink to="/sign-up">注册</AuthLink>
				</>
			}
			onSubmit={() => form.handleSubmit()}
			footer={
				<>
					<AuthLink to="/forgot-password" className="text-sm">
						忘记密码了？
					</AuthLink>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<AuthSubmitButton isSubmitting={isSubmitting}>
								登录
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
							autoComplete="email"
							placeholder="m@example.com"
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
							autoComplete="current-password"
							placeholder="请输入密码"
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
