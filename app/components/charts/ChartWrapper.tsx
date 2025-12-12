"use client";
import React from "react";

export default function ChartWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-4">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div style={{ width: "100%", height: 300 }}>{children}</div>
    </div>
  );
}
