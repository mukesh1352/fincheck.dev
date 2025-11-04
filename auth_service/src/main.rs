use sea_orm::Database;
use dotenvy::dotenv;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL")?;
    let _db = Database::connect(&database_url).await?;
    println!("Connected successfully!!");
    Ok(())
}
