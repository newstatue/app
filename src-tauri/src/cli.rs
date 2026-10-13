use anyhow::Result;
use clap::{Parser, Subcommand};
use tabled::Table;
use tabled::settings::Style;

mod conf;
mod project;


#[derive(Parser)]
#[command(name = "devcli", version, about = "Developer CLI")]
pub struct Args {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]
pub enum Commands {
    Infra {
        #[command(subcommand)]
        command: InfraCommands,
    },
    Project {
        #[command(subcommand)]
        command: ProjectCommands,
    },
}

#[derive(Subcommand)]
pub enum InfraCommands {
    List,
}

#[derive(Subcommand)]
pub enum ProjectCommands {
    List,
}

fn run() -> Result<()> {
    let args = Args::parse();
    match args.command {
        Commands::Infra { command } => match command {
            InfraCommands::List => {
                print!("{}", "TODO");
            },
        },
        Commands::Project { command } => match command {
            ProjectCommands::List => {
                Table::new(project::list_projects()?).with(Style::rounded());
            },
        },
    }

    Ok(())
}

fn main() -> Result<()> {
    conf::parse_config()?;
    run()?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use indoc::indoc;
    use tabled::{Table, Tabled};
    use tabled::assert::assert_table;
    use tabled::settings::Style;

    #[derive(Tabled)]
    struct Hello{
        line1: String,
        line2: String,
    }
    #[test]
    fn test_table_print() {
        let table = Table::new([
            Hello {
                line1: "hello".into(),
                line2: "world".into(),
            },
            Hello {
                line1: "world".into(),
                line2: "hello".into(),
            },
        ]).with(Style::rounded())
            .to_string();

        assert_table!(
            table,
            indoc!(r#"
                ╭───────┬───────╮
                │ line1 │ line2 │
                ├───────┼───────┤
                │ hello │ world │
                │ world │ hello │
                ╰───────┴───────╯
            "#)
        );
    }
}