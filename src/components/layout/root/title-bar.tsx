import { getCurrentWindow } from "@tauri-apps/api/window"
import { Minus, Square, X } from "lucide-react"
import type { ReactNode } from "react"
import { WindowButton } from "@/components/layout/root/windows-button.tsx"
import { Menubar } from "@/components/ui/menubar.tsx"
import { isMacOSPlatform, isWindowsPlatform } from "@/lib/platform.ts"
import { cn } from "@/lib/utils.ts"

const appWindow = getCurrentWindow()

interface TitleBarMenuProps {
	menu?: ReactNode
}

export function TitleBar({ menu }: TitleBarMenuProps) {
	return (
		<header
			data-tauri-drag-region
			className="relative flex h-11 w-full shrink-0 items-center justify-center pb-1 text-foreground/50"
		>
			<Menubar className={cn("absolute border-0",
				"**:data-[slot=menubar-trigger]:hover:bg-foreground/5",
				"**:data-[slot=menubar-trigger]:aria-expanded:bg-foreground/5",
				isMacOSPlatform() ? "left-20" : "left-3")}
			>
				{menu}
			</Menubar>

			<span className="pointer-events-none text-sm font-medium">Evorsio</span>

			{isWindowsPlatform() && (
				<div className="absolute right-0 flex h-full">
					<WindowButton onClick={() => appWindow.minimize()}>
						<Minus size={16} />
					</WindowButton>

					<WindowButton onClick={() => appWindow.toggleMaximize()}>
						<Square size={14} />
					</WindowButton>

					<WindowButton type="close" onClick={() => appWindow.close()}>
						<X size={16} />
					</WindowButton>
				</div>
			)}
		</header>
	)
}

