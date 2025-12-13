// // -----------------------------
// // Prediction Quality Metrics
// // -----------------------------
// export interface PredictionQuality {
//   entropy?: number;
//   confidence_score?: number;
// }

// // -----------------------------
// // Root Metric Document
// // -----------------------------
// export interface MetricDocument {
//   timestamp: string;

//   system_metrics?: {
//     cpu_percent?: number;
//     ram_percent?: number;
//   };

//   inference_metrics?: {
//     avg_10run_latency?: number;
//   };

//   prediction_quality?: PredictionQuality; // ✅ CORRECT LOCATION

//   // -----------------------------
//   // MongoDB dot-notation fallbacks
//   // -----------------------------
//   "prediction_quality.entropy"?: number;
//   "prediction_quality.confidence_score"?: number;
// }


// -----------------------------
// Inference Metrics
// -----------------------------
export interface InferenceMetrics {
  avg_10run_latency?: number;
  cold_inference_time?: number;
  warm_inference_time?: number;
}

// -----------------------------
// Prediction Quality
// -----------------------------
export interface PredictionQuality {
  confidence_score?: number;
  entropy?: number;
}

// -----------------------------
// Model Analysis (✅ ADD THIS)
// -----------------------------
export interface ModelAnalysis {
  param_count?: number;
  model_size_mb?: number;
  approx_flops?: number;
  memory_footprint_mb?: number;
}

// -----------------------------
// System Metrics
// -----------------------------
export interface SystemMetrics {
  cpu_percent?: number;
  ram_percent?: number;
  gpu?: {
    utilization_percent?: number;
    memory_used_mb?: number;
    gpu_available?: boolean;
  };
}

// -----------------------------
// Root Metric Document
// -----------------------------
export interface MetricDocument {
  timestamp: string;
  job_id?: string;

  system_metrics?: {
    cpu_percent?: number;
    ram_percent?: number;
    gpu?: {
      utilization_percent?: number;
      memory_used_mb?: number;
      gpu_available?: boolean;
    };
  };

  inference_metrics?: {
    avg_10run_latency?: number;
    cold_start_latency?: number;
    warm_start_latency?: number;
    cpu_inference_time?: number;
    gpu_inference_time?: number;
  };

  prediction_quality?: PredictionQuality;
  model_analysis?: ModelAnalysis;

  // -----------------------------
  // Mongo dot-notation fallbacks
  // -----------------------------
  "system_metrics.cpu_percent"?: number;
  "system_metrics.ram_percent"?: number;
  "system_metrics.gpu.utilization_percent"?: number;
  "system_metrics.gpu.memory_used_mb"?: number;

  "inference_metrics.avg_10run_latency"?: number;
  "inference_metrics.cold_start_latency"?: number;
  "inference_metrics.warm_start_latency"?: number;
  "inference_metrics.cpu_inference_time"?: number;
  "inference_metrics.gpu_inference_time"?: number;

  "prediction_quality.confidence_score"?: number;
  "prediction_quality.entropy"?: number;

  "model_analysis.model_size_mb"?: number;
}
