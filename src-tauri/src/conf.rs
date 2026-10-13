use anyhow::Result;
use config::{Environment, File};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Config {
    pub app: AppConfig,
}

#[derive(Debug, Deserialize)]
pub struct AppConfig {
    pub name: String,
    pub debug: bool,
}

pub fn parse_config() -> Result<Config> {
    let settings = config::Config::builder()
        .add_source(File::with_name("conf"))
        .add_source(Environment::with_prefix("APP").separator("__"))
        .build()?;

    let conf: Config = settings.try_deserialize()?;
    
    Ok(conf)
}