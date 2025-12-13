"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import ChartWrapper from "./ChartWrapper";
import EntropyConfidenceLineChart from "./EntropyConfidenceLineChart";
import EntropyConfidenceComparisonBarChart
  from "./EntropyConfidenceComparisonBarChart";
import useRealtime from "../../lib/useRealtime";
import type { MetricDocument } from "@/types/metrics";

type Point = {
  entropy: number;
  confidence: number;
};

export default function ENTROPYCONFIDENCESCORE() {
  const [data, setData] = useState<Point[]>([]);

  // ----------------------------
  // Load historical data
  // ----------------------------
  useEffect(() => {
    axios
      .get<MetricDocument[]>("/api/metrics?chart=entropy_confidence")
      .then((res) => {
        const mapped = res.data
          .map((doc) => {
            const entropy =
              doc.prediction_quality?.entropy ??
              doc["prediction_quality.entropy"];

            const confidence =
              doc.prediction_quality?.confidence_score ??
              doc["prediction_quality.confidence_score"];

            if (entropy === undefined || confidence === undefined) {
              return null;
            }

            return {
              entropy: Number(entropy),
              confidence: Number(confidence),
            };
          })
          .filter(Boolean) as Point[];

        setData(mapped);
      });
  }, []);

  // ----------------------------
  // Realtime updates
  // ----------------------------
  const onEvent = useCallback((payload: unknown) => {
    if (!payload || typeof payload !== "object") return;

    const doc = payload as MetricDocument;

    const entropy =
      doc.prediction_quality?.entropy ??
      doc["prediction_quality.entropy"];

    const confidence =
      doc.prediction_quality?.confidence_score ??
      doc["prediction_quality.confidence_score"];

    if (entropy === undefined || confidence === undefined) return;

    setData((prev) => [
      ...prev.slice(-500),
      {
        entropy: Number(entropy),
        confidence: Number(confidence),
      },
    ]);
  }, []);

  useRealtime(onEvent);

  // ----------------------------
  // CATEGORIZED LINE DATA
  // ----------------------------
  const lineData = useMemo(() => {
    if (data.length === 0) return [];

    const entropyThreshold =
      data.reduce((s, d) => s + d.entropy, 0) / data.length;

    const confidenceThreshold = 0.3;

    let ideal = 0;
    let unsure = 0;
    let underconfident = 0;
    let highRisk = 0;

    return data.map((d, index) => {
      if (d.entropy < entropyThreshold && d.confidence >= confidenceThreshold)
        ideal++;
      else if (d.entropy >= entropyThreshold && d.confidence < confidenceThreshold)
        unsure++;
      else if (d.entropy < entropyThreshold && d.confidence < confidenceThreshold)
        underconfident++;
      else highRisk++;

      return {
        index: index + 1,
        ideal,
        unsure,
        underconfident,
        highRisk,
      };
    });
  }, [data]);

  // ----------------------------
  // DIRECT COMPARISON DATA
  // ----------------------------
  const comparisonData = useMemo(() => {
    return data.map((d, index) => ({
      index: index + 1,
      entropy: d.entropy,
      confidence: d.confidence,
    }));
  }, [data]);

  return (
    <>
      {/* Categorized LINE plot */}
      <ChartWrapper title="Entropy–Confidence Comparison (Categorized)">
        <EntropyConfidenceLineChart data={lineData} />
      </ChartWrapper>

      {/* Raw numeric comparison */}
      <ChartWrapper title="Entropy vs Confidence — Direct Comparison">
        <EntropyConfidenceComparisonBarChart data={comparisonData} />
      </ChartWrapper>
    </>
  );
}
