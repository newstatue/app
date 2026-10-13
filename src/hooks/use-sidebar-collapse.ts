import * as React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { isMobilePlatform } from "@/lib/platform"

const SIDEBAR_BREAKPOINT = 768

export function useSidebarCollapse() {
	const { setOpen } = useSidebar()
	const setOpenRef = React.useRef(setOpen)

	React.useEffect(() => {
		setOpenRef.current = setOpen
	}, [setOpen])

	React.useEffect(() => {
		if (isMobilePlatform()) return

		const mql = window.matchMedia(`(max-width: ${SIDEBAR_BREAKPOINT - 1}px)`)

		const onChange = () => {
			setOpenRef.current(!mql.matches)
		}

		mql.addEventListener("change", onChange)
		onChange()

		return () => mql.removeEventListener("change", onChange)
	}, [])
}
