import { platform } from "@tauri-apps/plugin-os"
import { isTauri } from "@tauri-apps/api/core"
export const isMobilePlatform = ():boolean => {
    if(!isTauri()) return false
    const os = platform()
    return os === "ios" || os === "android"
}

export const isDesktopPlatform = ():boolean => {
    if(!isTauri()) return false
    const os = platform()
    return os === "macos" || os === "windows" || os === "linux"
}