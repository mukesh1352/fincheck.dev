"use client";

import { useState } from "react";
import AuthCard from "@/app/components/AuthCard";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!username.trim() || !password.trim() || !confirm.trim()) {
      return setErrorMsg("Fill all fields");
    }

    if (password !== confirm) {
      return setErrorMsg("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setErrorMsg(text || "Error creating user");
        setLoading(false);
        return;
      }

      setSuccessMsg("Account created! Redirecting...");
      setLoading(false);

      setTimeout(() => router.push("/sign-in"), 1200);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <button type="button" className="back-button" onClick={() => router.push("/intro")}>
        Back
      </button>

      <AuthCard>
        <input
          className="form-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="form-input"
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <button
          type="button"
          className="primary-button"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <button type="button" className="link-button" onClick={() => router.push("/sign-in")}>
          Already have an account? Sign In
        </button>
      </AuthCard>
    </div>
  );
}
