"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ChartWrapper from "./ChartWrapper";
import InferenceComparisonChart from "./InferenceComparisonChart";
import useRealtime from "../../lib/useRealtime";
import type { MetricDocument } from "../../../types/metrics";

type Point = {
    timestamp: string;
    cpu: number;
    gpu: number;
};

export default function InferenceComparisonUsage() {
    const [data, setData] = useState<Point[]>([]);

    // Load historical data
    useEffect(() => {
        axios.get<MetricDocument[]>("/api/metrics?chart=inference").then((res) => {
            setData(
                res.data.map((doc) => ({
                    timestamp: doc.timestamp,
                    cpu: Number(doc.inference_metrics?.cpu_inference_time ?? 0),
                    gpu: Number(doc.inference_metrics?.gpu_inference_time ?? 0),
                }))
            );
        });
    }, []);

    // Realtime updates
    const onEvent = useCallback((payload: unknown) => {
        if (!payload || typeof payload !== "object") return;

        const doc = payload as MetricDocument;
        const cpu = doc.inference_metrics?.cpu_inference_time;
        const gpu = doc.inference_metrics?.gpu_inference_time;

        if (cpu !== undefined || gpu !== undefined) {
            setData((prev) => [
                ...prev.slice(-50),
                {
                    timestamp: doc.timestamp,
                    cpu: Number(cpu ?? 0),
                    gpu: Number(gpu ?? 0),
                },
            ]);
        }
    }, []);

    useRealtime(onEvent);

    return (
        <ChartWrapper title="Inference Time Comparison (CPU vs GPU)">
            <InferenceComparisonChart data={data} />
        </ChartWrapper>
    );
}
