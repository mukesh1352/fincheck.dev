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
        gpu: number;
    }[];
};

export default function LatencyDistributionChart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(t) => format(new Date(t), "HH:mm:ss")}
                    stroke="#94a3b8"
                />

                <YAxis unit="ms" stroke="#94a3b8" />

                <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155" }}
                    labelFormatter={(label) => format(new Date(label), "HH:mm:ss")}
                />

                <Legend />

                <Line
                    type="monotone"
                    dataKey="cpu"
                    name="CPU Latency (ms)"
                    stroke="#ef4444"
                    dot={false}
                    strokeWidth={2}
                />

                <Line
                    type="monotone"
                    dataKey="gpu"
                    name="GPU Latency (ms)"
                    stroke="#8b5cf6"
                    dot={false}
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
