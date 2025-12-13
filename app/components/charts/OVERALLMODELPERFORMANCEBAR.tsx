"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartWrapper from "./ChartWrapper";
import OverallModelPerformanceBarChart
  from "./OverallModelPerformanceBarChart";
import type { MetricDocument } from "@/types/metrics";

export default function OVERALLMODELPERFORMANCEBAR() {
  const [data, setData] = useState<
    { metric: string; value: number }[]
  >([]);

  useEffect(() => {
    axios.get<MetricDocument[]>("/api/metrics")
      .then((res) => {
        const latest = res.data[0];
        if (!latest) return;

        const cpu = latest.system_metrics?.cpu_percent ?? 0;
        const ram = latest.system_metrics?.ram_percent ?? 0;

        const latency =
          (latest.inference_metrics?.avg_10run_latency ?? 0) * 1000;

        const modelSize =
          latest.model_analysis?.model_size_mb ??
          latest["model_analysis.model_size_mb"] ??
          0;

        const confidence =
          (latest.prediction_quality?.confidence_score ?? 0) * 100;

        const entropy =
          latest.prediction_quality?.entropy ?? 0;

        setData([
          { metric: "CPU Load", value: cpu },
          { metric: "RAM Load", value: ram },
          { metric: "Latency", value: Math.min(latency * 50, 100) },
          { metric: "Model Size", value: Math.min(modelSize * 200, 100) },
          { metric: "Confidence", value: confidence },
          { metric: "Entropy", value: Math.min(entropy * 40, 100) },
        ]);
      });
  }, []);

  return (
    <ChartWrapper title="Overall Model Performance — Bar View">
      <OverallModelPerformanceBarChart data={data} />
    </ChartWrapper>
  );
}
