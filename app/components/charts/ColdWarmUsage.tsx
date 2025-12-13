"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ChartWrapper from "./ChartWrapper";
import ColdWarmBarChart from "./ColdWarmBarChart";
import useRealtime from "../../lib/useRealtime";
import type { MetricDocument } from "../../../types/metrics";

type Point = {
    timestamp: string;
    cold: number;
    warm: number;
};

export default function ColdWarmUsage() {
    const [data, setData] = useState<Point[]>([]);

    // Load historical data
    useEffect(() => {
        axios.get<MetricDocument[]>("/api/metrics?chart=inference").then((res) => {
            setData(
                res.data.map((doc) => ({
                    timestamp: doc.timestamp,
                    cold: Number(doc.inference_metrics?.cold_start_latency ?? 0),
                    warm: Number(doc.inference_metrics?.warm_start_latency ?? 0),
                }))
            );
        });
    }, []);

    // Realtime updates
    const onEvent = useCallback((payload: unknown) => {
        if (!payload || typeof payload !== "object") return;

        const doc = payload as MetricDocument;
        const cold = doc.inference_metrics?.cold_start_latency;
        const warm = doc.inference_metrics?.warm_start_latency;

        if (cold !== undefined || warm !== undefined) {
            setData((prev) => [
                ...prev.slice(-50),
                {
                    timestamp: doc.timestamp,
                    cold: Number(cold ?? 0),
                    warm: Number(warm ?? 0),
                },
            ]);
        }
    }, []);

    useRealtime(onEvent);

    return (
        <ChartWrapper title="Cold vs Warm Inference Time">
            <ColdWarmBarChart data={data} />
        </ChartWrapper>
    );
}
