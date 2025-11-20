"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    const res = await signIn("credentials", { username, password, redirect: false });

    if (res?.error) {
      setError("Invalid username or password");
      return;
    }

    router.push("/main");
  };

  return (
    <div className="page-container">
      <button className="back-button" onClick={() => router.push("/intro")}>
        Back
      </button>

      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>

        <div className="auth-form">
          <input
            className="form-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="form-input"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" onClick={handleSubmit}>Sign In</button>
        </div>

        <div className="auth-footer">
          <p className="footer-text">Don't have an account?</p>
          <button className="link-button" onClick={() => router.push("/sign-up")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
