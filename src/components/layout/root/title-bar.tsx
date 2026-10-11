import { Minus, Square, X } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {WindowButton} from "@/components/layout/root/windows-button.tsx";

const appWindow = getCurrentWindow();

export function TitleBar() {
	return (
		<header data-tauri-drag-region
				className="relative flex h-10 items-center justify-center">
		  <span className="pointer-events-none text-sm font-medium">
			Evorsio
		  </span>
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
		</header>
	);
}
