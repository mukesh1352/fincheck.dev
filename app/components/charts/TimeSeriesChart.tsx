"use client";
import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function TimeSeriesChart({ data }: { data: { timestamp: string; value: number }[] }) {
  const mapped = data.map((d) => ({ timestamp: new Date(d.timestamp).toISOString(), value: Number(d.value) }));
  return (
    <ResponsiveContainer>
      <LineChart data={mapped}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tickFormatter={(v) => new Date(v).toLocaleTimeString()} />
        <YAxis />
        <Tooltip labelFormatter={(v) => new Date(v).toLocaleString()} />
        <Line type="monotone" dataKey="value" stroke="#2563eb" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
