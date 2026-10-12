import { isTauri } from "@tauri-apps/api/core"
import { platform } from "@tauri-apps/plugin-os"
export const isMobilePlatform = (): boolean => {
	if (!isTauri()) return false
	const os = platform()
	return os === "ios" || os === "android"
}

export const isDesktopPlatform = (): boolean => {
	if (!isTauri()) return false
	const os = platform()
	return os === "macos" || os === "windows" || os === "linux"
}

export const isWindowsPlatform = (): boolean => {
	if (!isTauri()) return false
	const os = platform()
	return os === "windows"
}

export const isMacOSPlatform = (): boolean => {
	if (!isTauri()) return false
	const os = platform()
	return os === "macos"
}
