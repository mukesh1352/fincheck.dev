"use client";

import React, { useEffect, useState, useCallback } from "react";
import ChartWrapper from "./ChartWrapper";
import LatencyHistogram from "./LatencyHistogram";
import axios from "axios";
import useRealtime from "../../lib/useRealtime";
import type { MetricDocument } from "@/types/metrics";

export default function LatencyLive() {
  const [values, setValues] = useState<number[]>([]);

  // Load historical latency metrics
  useEffect(() => {
    axios.get<MetricDocument[]>("/api/metrics?chart=latency").then((res) => {
      const arr = res.data.map((doc: MetricDocument) =>
        Number(
          doc.inference_metrics?.avg_10run_latency ??
            doc["inference_metrics.avg_10run_latency"] ??
            0
        )
      );
      setValues(arr);
    });
  }, []);

  // Realtime updates
  const onEvent = useCallback((data: unknown) => {
    if (!data || typeof data !== "object") return;

    const doc = data as MetricDocument;

    const lat =
      doc.inference_metrics?.avg_10run_latency ??
      doc["inference_metrics.avg_10run_latency"];

    if (lat !== undefined) {
      setValues((old) => [...old.slice(-2000), Number(lat)]);
    }
  }, []);

  useRealtime(onEvent);

  return (
    <ChartWrapper title="Latency Distribution (avg_10run_latency)">
      <LatencyHistogram values={values} />
    </ChartWrapper>
  );
}
