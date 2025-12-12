"use client";
import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function computeHistogram(values: number[], bins = 30) {
  if (!values.length) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = (max - min) / bins || 1;
  const out = Array.from({ length: bins }, (_, i) => ({ bin: `${Math.round(min + i * width)}-${Math.round(min + (i + 1) * width)}`, count: 0 }));
  values.forEach((v) => {
    const idx = Math.min(bins - 1, Math.floor((v - min) / width));
    out[idx].count += 1;
  });
  return out;
}

export default function LatencyHistogram({ values }: { values: number[] }) {
  const data = computeHistogram(values || [], 30);
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bin" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" />
      </BarChart>
    </ResponsiveContainer>
  );
}
