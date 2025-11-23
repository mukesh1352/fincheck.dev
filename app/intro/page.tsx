"use client";
import IntroCard from "../components/IntroCard";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();
  return (
    <div className="page-container">
      <IntroCard onEnter={() => router.push("/sign-in")} />
    </div>
  );
}
