// types/metrics.ts

export interface InferenceMetrics {
  avg_10run_latency?: number;
}

export interface SystemMetrics {
  cpu_percent?: number;
  ram_percent?: number;
  gpu?: {
    utilization_percent?: number;
    memory_used_mb?: number;
  };
}

export interface MetricDocument {
  timestamp: string;

  system_metrics?: SystemMetrics;
  inference_metrics?: InferenceMetrics;   // ✅ FIXED

  // dot-notation fallback fields from MongoDB projections
  "system_metrics.cpu_percent"?: number;
  "system_metrics.ram_percent"?: number;
  "system_metrics.gpu.utilization_percent"?: number;
  "system_metrics.gpu.memory_used_mb"?: number;

  // dot-notation inference fallback
  "inference_metrics.avg_10run_latency"?: number; // ✅ FIXED
}
