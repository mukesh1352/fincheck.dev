"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: {
    metric: string;
    value: number;
  }[];
};

export default function OverallModelPerformanceBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 10,
          right: 30,
          left: 40,
          bottom: 10,
        }}
        barCategoryGap={22}   // 👈 KEY: spacing between bars
      >
        {/* Softer grid */}
        <CartesianGrid
          strokeDasharray="3 6"
          stroke="rgba(255,255,255,0.15)"
        />

        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fill: "#cbd5f5", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          type="category"
          dataKey="metric"
          width={140}
          tick={{ fill: "#e5e7eb", fontSize: 13 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.05)" }}
          contentStyle={{
            backgroundColor: "#020617",
            border: "1px solid #334155",
            borderRadius: 8,
            color: "#e5e7eb",
          }}
          formatter={(value: number) => [`${value.toFixed(1)} / 100`, "Score"]}
        />

        <Bar
          dataKey="value"
          fill="#60a5fa"
          radius={[0, 8, 8, 0]}
          maxBarSize={34}   // 👈 prevents fat bars
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
