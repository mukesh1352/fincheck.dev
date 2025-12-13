"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
import ChartWrapper from "./ChartWrapper";
import type { MetricDocument } from "@/types/metrics";

// ----------------------------
// Types
// ----------------------------
type Category = "system" | "performance" | "quality";

type MetricBar = {
  metric: string;
  value: number;
  category: Category;
};

// ----------------------------
// Constants
// ----------------------------
const COLORS: Record<Category, string> = {
  system: "#38bdf8",
  performance: "#22c55e",
  quality: "#f97316",
};

const SYSTEM: Category = "system";
const PERFORMANCE: Category = "performance";
const QUALITY: Category = "quality";

// ----------------------------
// Component
// ----------------------------
export default function OVERALLMODELPERFORMANCE() {
  const [latest, setLatest] = useState<MetricDocument | null>(null);

  useEffect(() => {
    axios.get<MetricDocument[]>("/api/metrics?limit=1").then((res) => {
      if (!res.data?.length) return;
      setLatest(res.data[0]);
    });
  }, []);

  // ============================
  // SNAPSHOT DATA (CURRENT ONLY)
  // ============================
  const snapshotData = useMemo<MetricBar[]>(() => {
    if (!latest) return [];

    const cpu = latest.system_metrics?.cpu_percent ?? 0;
    const ram = latest.system_metrics?.ram_percent ?? 0;

    const latencyMs =
      (latest.inference_metrics?.avg_10run_latency ?? 0) * 1000;

    const modelSize =
      latest.model_analysis?.model_size_mb ??
      latest["model_analysis.model_size_mb"] ??
      0;

    const confidence =
      (latest.prediction_quality?.confidence_score ?? 0) * 100;

    const entropy =
      latest.prediction_quality?.entropy ?? 0;

    return [
      { metric: "Entropy", value: Math.min(entropy * 40, 100), category: QUALITY },
      { metric: "Confidence", value: confidence, category: QUALITY },

      { metric: "Latency", value: Math.min(latencyMs * 50, 100), category: PERFORMANCE },
      { metric: "Model Size", value: Math.min(modelSize * 200, 100), category: PERFORMANCE },

      { metric: "RAM Load", value: ram, category: SYSTEM },
      { metric: "CPU Load", value: cpu, category: SYSTEM },
    ].sort((a, b) => b.value - a.value);
  }, [latest]);

  // ============================
  // Chart Renderer
  // ============================
  const renderChart = (data: MetricBar[]) => (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
        barCategoryGap={22}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis type="number" domain={[0, 100]} />

        <YAxis
          type="category"
          dataKey="metric"
          width={150}
          tick={{ fill: "#e5e7eb", fontSize: 13 }}
        />

        <Tooltip
          formatter={(v) =>
            typeof v === "number" ? v.toFixed(1) : ""
          }
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            color: "#e5e7eb",
          }}
        />

        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={26}>
          {data.map((d, i) => (
            <Cell key={i} fill={COLORS[d.category]} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(v) =>
              typeof v === "number" ? v.toFixed(1) : ""
            }
            fill="#e5e7eb"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  // ============================
  // Render
  // ============================
  return (
    <ChartWrapper title="Overall Model Performance — Current Snapshot">
      {renderChart(snapshotData)}
    </ChartWrapper>
  );
}
