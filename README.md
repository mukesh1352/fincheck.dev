## 🧰 Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Rust](https://www.rust-lang.org/tools/install)

---
## 🏃 Getting Started

### 1️⃣ Run the Frontend Development Server

```bash
pnpm dev
```
### PostgreSQL Setup (macOS / Linux)
Start the PostgreSQL service:
```bash
brew services start postgresql
```
**Check PostgreSQL version:**
```bash
postgres --version
```
### Install and Configure Rust
**Install Rust:**
```bash
curl https://sh.rustup.rs -sSf | sh
```
**Load Rust environment for the current session:(making it permanent)**
```bash
echo '. "$HOME/.cargo/env"' >> ~/.zshrc
```
## BUILD THE RUST PROJECT
**build**
```bash
cargo build
```
**clean and build if needed**
```bash
cargo clean
cargo build
```
### DATABASE CONFIGURATION
**Set your database connection URL:**
```bash
DATABASE_URL=postgres://mukesh1:mukesh123@localhost:5432/authdb
```
- add this to the .env file
## CREATE TABLE Users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
# GENERATE ENTITIES
```bash
sea-orm-cli generate entity \
  -u postgres://mukesh1:mukesh123@localhost:5432/authdb \
  -o src/entity
```
## Rust Service

- **Build the Rust backend:**
```bash
cargo build
```

- **Run the Rust backend:**
```bash
cargo run
```


- **Clean build artifacts:**
```bash
cargo clean
```
