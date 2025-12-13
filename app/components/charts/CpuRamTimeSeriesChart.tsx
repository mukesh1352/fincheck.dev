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
import { format } from "date-fns";

type Props = {
  data: {
    timestamp: string;
    cpu: number;
    ram: number;
  }[];
};

export default function CpuRamTimeSeriesChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
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

        <Line
          type="monotone"
          dataKey="cpu"
          name="CPU (%)"
          stroke="#ef4444"
          dot={false}
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="ram"
          name="RAM (%)"
          stroke="#3b82f6"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

