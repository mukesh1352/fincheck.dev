"use client";
import React, { useEffect, useState, useCallback } from "react";
import ChartWrapper from "./ChartWrapper";
import TimeSeriesChart from "./TimeSeriesChart";
import axios from "axios";
import useRealtime from "../../lib/useRealtime";
import type { MetricDocument } from "@/types/metrics";

export default function CpuChart() {
  const [data, setData] = useState<{ timestamp: string; value: number }[]>([]);

  // Load historical data
  useEffect(() => {
    axios.get<MetricDocument[]>("/api/metrics?chart=cpu_usage").then((res) => {
      const mapped = res.data.map((doc) => ({
        timestamp: doc.timestamp,
        value: Number(
          doc.system_metrics?.cpu_percent ??
          doc["system_metrics.cpu_percent"] ??
          0
        ),
      }));
      setData(mapped);
    });
  }, []);

  // Type-Safe realtime handler
  const onEvent = useCallback((data: unknown) => {
    if (!data || typeof data !== "object") return;

    const doc = data as MetricDocument;

    const cpu =
      doc.system_metrics?.cpu_percent ??
      doc["system_metrics.cpu_percent"];

    if (cpu !== undefined) {
      setData((prev) => [
        ...prev.slice(-500),
        { timestamp: doc.timestamp, value: Number(cpu) },
      ]);
    }
  }, []);

  useRealtime(onEvent);

  return (
    <ChartWrapper title="CPU Usage (%) - Real Time">
      <TimeSeriesChart data={data} />
    </ChartWrapper>
  );
}
