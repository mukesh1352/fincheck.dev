"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = {
  data: {
    index: number;
    entropy: number;
    confidence: number;
  }[];
};

export default function EntropyConfidenceComparisonBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="index" name="Sample" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="entropy"
          name="Entropy"
          fill="#ef4444"   // red
        />

        <Bar
          dataKey="confidence"
          name="Confidence"
          fill="#22c55e"   // green
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
