import { useSearch } from "@tanstack/react-router";
import { ResetPasswordForm } from "./components/ResetPasswordForm";

export function ResetPasswordPage() {
	const { email, otp } = useSearch({ from: "/(auth)/reset-password" });

	return <ResetPasswordForm email={email} otp={otp} />;
}
