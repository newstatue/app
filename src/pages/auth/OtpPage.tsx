import { OtpForm } from "./components/OtpForm.tsx";
import { useSearch } from "@tanstack/react-router";

export function OtpPage() {
	const { email, type } = useSearch({ from: "/(auth)/otp" });
	return <OtpForm email={email} type={type} />;
}
