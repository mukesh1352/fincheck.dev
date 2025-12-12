"use client";
import React, { useEffect, useState, useCallback } from "react";
import ChartWrapper from "./ChartWrapper";
import TimeSeriesChart from "./TimeSeriesChart";
import axios from "axios";
import useRealtime from "../../lib/useRealtime";
import type { MetricDocument } from "@/types/metrics";

export default function GpuChart() {
  const [data, setData] = useState<{ timestamp: string; value: number }[]>([]);

  // Load historical GPU utilization data
  useEffect(() => {
    axios.get<MetricDocument[]>("/api/metrics?chart=gpu_util").then((res) => {
      const mapped = res.data.map((doc) => ({
        timestamp: doc.timestamp,
        value: Number(
          doc.system_metrics?.gpu?.utilization_percent ??
          doc["system_metrics.gpu.utilization_percent"] ??
          0
        ),
      }));

      setData(mapped);
    });
  }, []);

  // Realtime GPU updates
  const onEvent = useCallback((data: unknown) => {
    if (!data || typeof data !== "object") return;

    const doc = data as MetricDocument;

    const gpuValue =
      doc.system_metrics?.gpu?.utilization_percent ??
      doc["system_metrics.gpu.utilization_percent"];

    if (gpuValue !== undefined) {
      setData((prev) => [
        ...prev.slice(-500),
        { timestamp: doc.timestamp, value: Number(gpuValue) },
      ]);
    }
  }, []);

  useRealtime(onEvent);

  return (
    <ChartWrapper title="GPU Utilization (%) - Real Time">
      <TimeSeriesChart data={data} />
    </ChartWrapper>
  );
}
