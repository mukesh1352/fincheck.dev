"use client";

import React from "react";
import CpuChart from "@/app/components/metrics/CpuChart";
import GpuChart from "@/app/components/metrics/GpuChart";
import GpuVramChart from "@/app/components/metrics/GpuVramChart";
import RamChart from "@/app/components/metrics/RamChart";
import LatencyLive from "@/app/components/metrics/LatencyLive";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">

      {/* Header */}
      <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md z-20 py-4 px-2 mb-6 border-b border-slate-700">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">
          Real-Time Metrics Dashboard
        </h1>
        <p className="text-center text-slate-400 mt-1 text-sm">
          Live system performance & model inference analytics
        </p>
      </header>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Row 1 */}
        <div className="rounded-xl shadow-lg bg-slate-800/60 backdrop-blur-md p-4 border border-slate-700">
          <CpuChart />
        </div>

        <div className="rounded-xl shadow-lg bg-slate-800/60 backdrop-blur-md p-4 border border-slate-700">
          <GpuChart />
        </div>

        {/* Row 2 */}
        <div className="rounded-xl shadow-lg bg-slate-800/60 backdrop-blur-md p-4 border border-slate-700">
          <GpuVramChart />
        </div>

        <div className="rounded-xl shadow-lg bg-slate-800/60 backdrop-blur-md p-4 border border-slate-700">
          <RamChart />
        </div>

        {/* Full-width Footer Chart */}
        <div className="lg:col-span-2 rounded-xl shadow-lg bg-slate-800/60 backdrop-blur-md p-4 border border-slate-700">
          <LatencyLive />
        </div>
      </div>
    </main>
  );
}
