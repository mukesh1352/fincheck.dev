"use client";

import { useState } from "react";
import AuthCard from "@/app/components/AuthCard";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setErrorMsg("");

    if (!username.trim() || !password.trim()) {
      return setErrorMsg("Fill all fields");
    }

    setLoading(true);

    const res = await signIn("credentials", {
      username: username.trim(),
      password: password.trim(),
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      return setErrorMsg("Invalid username or password");
    }

    router.push("/main");
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

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <button
          type="button"
          className="primary-button"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <button
          type="button"
          className="link-button"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </button>
      </AuthCard>
    </div>
  );
}
