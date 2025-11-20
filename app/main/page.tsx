"use client";

import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="page-container">
      <button className="signout-button" onClick={() => router.push("/intro")}>
        Sign Out
      </button>

      <div className="content-card">
        <h1 className="welcome-title">Welcome to the Main Page</h1>
        <p className="welcome-text">You have successfully signed in!</p>
      </div>
    </div>
  );
}
