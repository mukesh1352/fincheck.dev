  "use client";
  import React, { useEffect, useState, useCallback } from "react";
  import ChartWrapper from "./ChartWrapper";
  import TimeSeriesChart from "./TimeSeriesChart";
  import axios from "axios";
  import useRealtime from "../../lib/useRealtime";
  import type { MetricDocument } from "@/types/metrics";

  export default function GpuVramChart() {
    const [data, setData] = useState<{ timestamp: string; value: number }[]>([]);

    // Load historical VRAM usage
    useEffect(() => {
      axios.get<MetricDocument[]>("/api/metrics?chart=gpu_vram").then((res) => {
        const mapped = res.data.map((doc) => ({
          timestamp: doc.timestamp,
          value: Number(
            doc.system_metrics?.gpu?.memory_used_mb ??
            doc["system_metrics.gpu.memory_used_mb"] ??
            0
          ),
        }));

        setData(mapped);
      });
    }, []);

    // Handle realtime VRAM usage updates
    const onEvent = useCallback((data: unknown) => {
      if (!data || typeof data !== "object") return;

      const doc = data as MetricDocument;

      const vram =
        doc.system_metrics?.gpu?.memory_used_mb ??
        doc["system_metrics.gpu.memory_used_mb"];

      if (vram !== undefined) {
        setData((prev) => [
          ...prev.slice(-500),
          { timestamp: doc.timestamp, value: Number(vram) },
        ]);
      }
    }, []);

    useRealtime(onEvent);

    return (
      <ChartWrapper title="GPU VRAM (MB) - Real Time">
        <TimeSeriesChart data={data} />
      </ChartWrapper>
    );
  }
