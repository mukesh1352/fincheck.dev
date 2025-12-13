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
        cold: number;
        warm: number;
    }[];
};

export default function ColdWarmBarChart({ data }: Props) {
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
                    dataKey="cold"
                    name="Cold Start (ms)"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                />

                <Bar
                    dataKey="warm"
                    name="Warm Start (ms)"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
