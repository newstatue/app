import { useSearch } from "@tanstack/react-router";
import { OtpForm } from "./components/OtpForm";

export function OtpPage() {
	const { email, type } = useSearch({ from: "/(auth)/otp" });
	return <OtpForm email={email} type={type} />;
}
