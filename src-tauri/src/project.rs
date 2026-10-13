use std::process::Command;
use anyhow::{bail, Context, Result};
use serde::Serialize;
use std::path::Path;
use tabled::Tabled;
use ts_rs::TS;

#[derive(Debug, Serialize, Tabled, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, rename_all = "camelCase")]
pub struct Project{
    pub name: String,
    pub path: String,
}

pub fn list_projects() -> Result<Vec<Project>>{
    let output = Command::new("mise")
        .args(["config", "ls", "--tracked-configs"])
        .output()
        .context("Failed to run mise")?;

    if !output.status.success() {
        bail!("{}",String::from_utf8_lossy(&output.stderr));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);

    let projects = stdout.lines()
        .map(|line| {
            let path = Path::new(line);

            Project{
                name: path.parent()
                    .and_then(|p| p.file_name())
                    .unwrap()
                    .to_string_lossy()
                    .to_string(),
                path: path.parent()
                    .unwrap()
                    .to_string_lossy()
                    .to_string(),
            }
        })
        .collect();

    Ok(projects)
}

#[cfg(test)]
mod tests {
    use tabled::settings::Style;
    use tabled::Table;
    use super::*;

    #[test]
    fn test_list_projects() {
        let projects = list_projects().unwrap();
        println!("{:?}", projects);

        assert!(!projects.is_empty());
    }

    #[test]
    fn test_list_projects_print() {
        println!("{}", Table::new(list_projects().unwrap()).with(Style::rounded()));
    }
}