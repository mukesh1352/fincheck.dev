use argon2::{
  password_hash::{
      rand_core::OsRng,
      PasswordHasher,SaltString,
      Error as PasswordHashError
  },
  Argon2
};

pub fn hash_password(password: &str) -> Result<String,PasswordHashError>{
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2.hash_password(password.as_bytest(),&salt)?.to_string();
    Ok(password_hash)
}
pub fn verify_password(password: &str, hash: &str) -> bool {
    let parsed_hash = PasswordHash::new(hash);
    if parsed_hash.is_err() {
        return false;
    }

    Argon2::default()
        .verify_password(password.as_bytes(), &parsed_hash.unwrap())
        .is_ok()
}