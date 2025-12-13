"use client";

import React from "react";
import CpuChart from "../components/charts/CpuChart";
import GpuChart from "../components/charts/GpuChart";
import GpuVramChart from "../components/charts/GpuVramChart";
import RamChart from "../components/charts/RamChart";
import LatencyLive from "../components/charts/LatencyLive";
import CpuRamBarUsage from "../components/charts/CPURAMUSAGE";
import ENTROPYCONFIDENCESCORE from "../components/charts/ENTROPYCONFIDENCESCORE";
import OVERALLMODELPERFORMANCE from "../components/charts/OVERALLMODELPERFORMANCE";
import ColdWarmUsage from "../components/charts/ColdWarmUsage";
import LatencyDistributionUsage from "../components/charts/LatencyDistributionUsage";
import InferenceComparisonUsage from "../components/charts/InferenceComparisonUsage";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white px-6 pb-20">

      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 py-6 mb-14">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">
          Real-Time Metrics Dashboard
        </h1>
        <p className="text-center text-slate-400 mt-2 text-sm">
          Live system performance & model inference analytics
        </p>
      </header>

      {/* ===================== */}
      {/* DASHBOARD GRID */}
      {/* ===================== */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* ===================== */}
        {/* SYSTEM PERFORMANCE */}
        {/* ===================== */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            System Performance
          </h2>

          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <CpuChart />
          </div>

          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <RamChart />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="sr-only">GPU Metrics</h2>

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
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Resource Correlation
          </h2>

          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <CpuRamBarUsage />
          </div>
        </section>

        {/* ===================== */}
        {/* OVERALL MODEL PERFORMANCE */}
        {/* ===================== */}
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Overall Model Health
          </h2>

          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <OVERALLMODELPERFORMANCE />
          </div>
        </section>

        {/* ===================== */}
        {/* MODEL QUALITY */}
        {/* ===================== */}
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Prediction Quality
          </h2>

          <div className="rounded-2xl bg-slate-800/60 p-8 border border-slate-700 shadow-lg">
            <ENTROPYCONFIDENCESCORE />
          </div>
        </section>

        {/* ===================== */}
        {/* LATENCY */}
        {/* ===================== */}
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Latency Monitoring
          </h2>

          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <LatencyLive />
          </div>
        </section>

        {/* ===================== */}
        {/* INFERENCE ANALYTICS */}
        {/* ===================== */}
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Inference Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
              <ColdWarmUsage />
            </div>

            <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
              <LatencyDistributionUsage />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800/60 p-6 border border-slate-700 shadow-lg">
            <InferenceComparisonUsage />
          </div>
        </section>

      </div>
    </main>
  );
}
