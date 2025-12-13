"use client";

import React from "react";
import CpuChart from "../components/charts/CpuChart";
import GpuChart from "../components/charts/GpuChart";
import GpuVramChart from "../components/charts/GpuVramChart";
import RamChart from "../components/charts/RamChart";
import LatencyLive from "../components/charts/LatencyLive";
import CpuRamBarUsage from "../components/charts/CPURAMUSAGE";
import ENTROPYCONFIDENCESCORE from "../components/charts/ENTROPYCONFIDENCESCORE";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white px-6 pb-12">

      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 py-6 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">
          Real-Time Metrics Dashboard
        </h1>
        <p className="text-center text-slate-400 mt-2 text-sm">
          Live system performance & model inference analytics
        </p>
      </header>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ===================== */}
        {/* SYSTEM PERFORMANCE */}
        {/* ===================== */}

        <section className="space-y-10">
          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <CpuChart />
          </div>

          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <RamChart />
          </div>
        </section>

        <section className="space-y-10">
          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <GpuChart />
          </div>

          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <GpuVramChart />
          </div>
        </section>

        {/* ===================== */}
        {/* RESOURCE CORRELATION */}
        {/* ===================== */}

        <section className="lg:col-span-2">
          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <CpuRamBarUsage />
          </div>
        </section>

        {/* ===================== */}
        {/* MODEL QUALITY */}
        {/* ===================== */}

        <section className="lg:col-span-2">
          <div className="rounded-2xl bg-slate-800/60 p-8 border border-slate-700 shadow-lg">
            <ENTROPYCONFIDENCESCORE />
          </div>
        </section>

        {/* ===================== */}
        {/* LATENCY FOOTER */}
        {/* ===================== */}

        <section className="lg:col-span-2">
          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <LatencyLive />
          </div>
        </section>

      </div>
    </main>
  );
}
