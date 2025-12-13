"use client";

import {
  LineChart,
  Line,
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
    ideal: number;
    unsure: number;
    underconfident: number;
    highRisk: number;
  }[];
};

export default function EntropyConfidenceLineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="index" name="Sample" />
        <YAxis allowDecimals={false} />

        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="ideal"
          name="Ideal"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="unsure"
          name="Unsure"
          stroke="#eab308"
          strokeWidth={2}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="underconfident"
          name="Underconfident"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="highRisk"
          name="High Risk"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
