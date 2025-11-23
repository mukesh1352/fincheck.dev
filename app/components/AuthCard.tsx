"use client";
import type { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="auth-card">
      <h2 className="auth-title">Sign In</h2>
      <div className="auth-form">{children}</div>
    </div>
  );
}
