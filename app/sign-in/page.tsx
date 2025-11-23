"use client";

import { useState } from "react";
import AuthCard from "@/app/components/AuthCard";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [e, setE] = useState("");
  const router = useRouter();

  return (
    <div className="page-container">
      <button type="button" className="back-button" onClick={() => router.push("/intro")}>
        Back
      </button>

      <AuthCard>
        <input className="form-input" placeholder="Username" onChange={(e) => setU(e.target.value)} />
        <input className="form-input" type="password" placeholder="Password" onChange={(e) => setP(e.target.value)} />

        {e && <p className="error-message">{e}</p>}

        <button
          type="button"
          className="primary-button"
          onClick={async () => {
            if (!u || !p) return setE("Fill all fields");
            const res = await signIn("credentials", { username: u, password: p, redirect: false });
            if (res?.error) return setE("Invalid credentials");
            router.push("/main");
          }}
        >
          Sign In
        </button>

        <button type="button" className="link-button" onClick={() => router.push("/sign-up")}>
          Sign Up
        </button>
      </AuthCard>
    </div>
  );
}
