"use client";
import React, { useEffect, useState, useCallback } from "react";
import ChartWrapper from "./ChartWrapper";
import TimeSeriesChart from "./TimeSeriesChart";
import axios from "axios";
import useRealtime from "../../lib/useRealtime";
import type { MetricDocument } from "@/types/metrics";

export default function RamChart() {
  const [data, setData] = useState<{ timestamp: string; value: number }[]>([]);

  // Load historical RAM usage
  useEffect(() => {
    axios.get<MetricDocument[]>("/api/metrics?chart=ram_usage").then((res) => {
      const mapped = res.data.map((doc) => ({
        timestamp: doc.timestamp,
        value: Number(
          doc.system_metrics?.ram_percent ??
          doc["system_metrics.ram_percent"] ??
          0
        ),
      }));
      setData(mapped);
    });
  }, []);

  // Realtime RAM usage listener
  const onEvent = useCallback((data: unknown) => {
    if (!data || typeof data !== "object") return;

    const doc = data as MetricDocument;

    const ramValue =
      doc.system_metrics?.ram_percent ??
      doc["system_metrics.ram_percent"];

    if (ramValue !== undefined) {
      setData((prev) => [
        ...prev.slice(-500),
        { timestamp: doc.timestamp, value: Number(ramValue) },
      ]);
    }
  }, []);

  useRealtime(onEvent);

  return (
    <ChartWrapper title="RAM Usage (%) - Real Time">
      <TimeSeriesChart data={data} />
    </ChartWrapper>
  );
}
