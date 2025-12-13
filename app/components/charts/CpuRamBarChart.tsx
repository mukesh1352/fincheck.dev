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
import { format } from "date-fns";

type Props = {
  data: {
    timestamp: string;
    cpu: number;
    ram: number;
  }[];
};

export default function CpuRamBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="timestamp"
          tickFormatter={(t) => format(new Date(t), "HH:mm:ss")}
        />

        <YAxis domain={[0, 100]} unit="%" />

        <Tooltip
          labelFormatter={(label) =>
            format(new Date(label), "HH:mm:ss")
          }
        />

        <Legend />

        <Bar
          dataKey="cpu"
          name="CPU (%)"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
        />

        <Bar
          dataKey="ram"
          name="RAM (%)"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

