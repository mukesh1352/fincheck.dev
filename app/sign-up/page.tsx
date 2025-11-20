"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");

    if (!username || !password || !confirmPassword)
      return setError("Please fill in all fields");

    if (password !== confirmPassword)
      return setError("Passwords do not match");

    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return setError(await res.text());

    alert("Account created! Please sign in.");
    router.push("/sign-in");
  };

  return (
    <div className="page-container">
      <button className="back-button" onClick={() => router.push("/intro")}>
        Back
      </button>

      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>

        <div className="auth-form">
          <input className="form-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

          <input className="form-input" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

          <input className="form-input" placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" onClick={handleSubmit}>Sign Up</button>
        </div>

        <div className="auth-footer">
          <p className="footer-text">Already have an account?</p>
          <button className="link-button" onClick={() => router.push("/sign-in")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
