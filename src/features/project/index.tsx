import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"
import type { Project } from "@/bindings/Project.ts"

export function Index() {
	const [projects, setProjects] = useState<Project[]>([])
	useEffect(() => {
		invoke<Project[]>("list_projects").then(setProjects).catch(console.error)
	}, [])
	return (
		<ul>
			{projects.map((project) => (
				<li key={project.path}>
					{project.name} — {project.path}
				</li>
			))}
		</ul>
	)
}
