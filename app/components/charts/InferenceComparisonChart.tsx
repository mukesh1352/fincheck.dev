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
        gpu: number;
    }[];
};

export default function InferenceComparisonChart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} barGap={4}>
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

                <Bar
                    dataKey="cpu"
                    name="CPU Inference (ms)"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                />

                <Bar
                    dataKey="gpu"
                    name="GPU Inference (ms)"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
