// -----------------------------
// Prediction Quality Metrics
// -----------------------------
export interface PredictionQuality {
  entropy?: number;
  confidence_score?: number;
}

// -----------------------------
// Root Metric Document
// -----------------------------
export interface MetricDocument {
  timestamp: string;

  system_metrics?: {
    cpu_percent?: number;
    ram_percent?: number;
  };

  inference_metrics?: {
    avg_10run_latency?: number;
  };

  prediction_quality?: PredictionQuality; // ✅ CORRECT LOCATION

  // -----------------------------
  // MongoDB dot-notation fallbacks
  // -----------------------------
  "prediction_quality.entropy"?: number;
  "prediction_quality.confidence_score"?: number;
}
