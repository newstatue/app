import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router"
import React from "react"
import ReactDOM from "react-dom/client"
import { routeTree } from "@/routeTree.gen.ts"

const hashHistory = createHashHistory()
const router = createRouter({
	routeTree,
	history: hashHistory,
	defaultPreload: "intent",
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
