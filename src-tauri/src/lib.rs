use anyhow::Result;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod conf;
mod project;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn list_projects() -> Result<Vec<project::Project>, String> {
    project::list_projects().map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() -> Result<()> {
    conf::parse_config().expect("Failed to parse config");

    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            list_projects,
        ])
        .run(tauri::generate_context!())?;

    Ok(())
}
