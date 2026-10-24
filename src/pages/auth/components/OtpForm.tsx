import { AuthFormCard, AuthSubmitButton } from "./AuthFormCard";
import { toast } from "@heroui/react";
import {
	FieldError,
	Label,
	TextField,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	REGEXP_ONLY_DIGITS,
} from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
const formSchema = z.object({
	otp: z.string().regex(/^\d{6}$/, "请输入六位数字验证码。"),
});

interface OtpFormProps {
	email: string;
	type: "signup" | "forgot-password";
}

export function OtpForm({ email, type }: OtpFormProps) {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			otp: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				if (type === "signup") {
					const { error } = await authClient.emailOtp.verifyEmail({
						email,
						otp: value.otp,
					});
					if (error) {
						toast.danger("验证码错误或已过期，请重试。", {
							description: error.message,
						});
						return;
					}
					toast.success("验证成功。");
					await navigate({ to: "/", replace: true });
					return;
				}
				const { error } = await authClient.emailOtp.checkVerificationOtp({
					email,
					otp: value.otp,
					type: "forget-password",
				});
				if (error) {
					toast.danger("验证码错误或已过期，请重试。", {
						description: error.message,
					});
					return;
				}
				toast.success("验证成功，请设置新密码。");
				await navigate({
					to: "/reset-password",
					search: { email, otp: value.otp },
					replace: true,
				});
			} catch (error) {
				toast.danger("验证请求异常，请检查网络后重试。", {
					description: error instanceof Error ? error.message : undefined,
				});
			}
		},
	});

	return (
		<AuthFormCard
			title="验证邮箱"
			description={<>验证码已发送至 {email}</>}
			onSubmit={() => form.handleSubmit()}
			footer={
				<>
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<AuthSubmitButton isSubmitting={isSubmitting}>
								验证
							</AuthSubmitButton>
						)}
					</form.Subscribe>
				</>
			}
		>
			<form.Field name="otp">
				{(field) => (
					<TextField
						name={field.name}
						isInvalid={field.state.meta.errors.length > 0}
					>
						<Label htmlFor={field.name}>验证码</Label>

						<InputOTP
							id={field.name}
							name={field.name}
							maxLength={6}
							value={field.state.value}
							onChange={field.handleChange}
							onBlur={field.handleBlur}
							pattern={REGEXP_ONLY_DIGITS}
							aria-invalid={field.state.meta.errors.length > 0}
							className="w-full justify-center"
							autoComplete="one-time-code"
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
							</InputOTPGroup>

							<InputOTPSeparator />

							<InputOTPGroup>
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>

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
