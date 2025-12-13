"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ChartWrapper from "./ChartWrapper";
import CpuRamBarChart from "./CpuRamBarChart";
import useRealtime from "../../lib/useRealtime";
import type { MetricDocument } from "../../../types/metrics";

type Point = {
  timestamp: string;
  cpu: number;
  ram: number;
};

export default function CpuRamBarUsage() {
  const [data, setData] = useState<Point[]>([]);

  // Load historical data
  useEffect(() => {
    axios.get<MetricDocument[]>("/api/metrics?chart=cpu_ram").then((res) => {
      setData(
        res.data.map((doc) => ({
          timestamp: doc.timestamp,
          cpu: Number(
            doc.system_metrics?.cpu_percent ??
              doc["system_metrics.cpu_percent"] ??
              0
          ),
          ram: Number(
            doc.system_metrics?.ram_percent ??
              doc["system_metrics.ram_percent"] ??
              0
          ),
        }))
      );
    });
  }, []);

  // Realtime updates
  const onEvent = useCallback((payload: unknown) => {
    if (!payload || typeof payload !== "object") return;

    const doc = payload as MetricDocument;

    const cpu =
      doc.system_metrics?.cpu_percent ??
      doc["system_metrics.cpu_percent"];

    const ram =
      doc.system_metrics?.ram_percent ??
      doc["system_metrics.ram_percent"];

    if (cpu !== undefined && ram !== undefined) {
      setData((prev) => [
        ...prev.slice(-500),
        {
          timestamp: doc.timestamp,
          cpu: Number(cpu),
          ram: Number(ram),
        },
      ]);
    }
  }, []);

  useRealtime(onEvent);

  return (
    <ChartWrapper title="CPU vs RAM Usage (%) — Bar Graph">
      <CpuRamBarChart data={data} />
    </ChartWrapper>
  );
}
