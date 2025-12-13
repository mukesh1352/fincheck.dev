import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMongo } from "@/lib/mongodb";

type MetricDoc = Record<string, unknown>;

function parseRange(params: URLSearchParams) {
  const since = params.get("since");
  const until = params.get("until");

  const filter: Record<string, unknown> = {};

  if (since || until) {
    const timeFilter: Record<string, Date> = {};
    if (since) timeFilter.$gte = new Date(since);
    if (until) timeFilter.$lte = new Date(until);
    filter.timestamp = timeFilter;
  }

  return filter;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const chart = url.searchParams.get("chart");
    const jobId = url.searchParams.get("job_id");

    const db = await getMongo();
    const col = db.collection<MetricDoc>("metrics");

    const baseMatch: Record<string, unknown> = {
      ...parseRange(url.searchParams),
    };

    if (jobId) baseMatch.job_id = jobId;

    switch (chart) {
      case "cpu_usage":
        return NextResponse.json(
          await col
            .find(baseMatch, {
              projection: {
                timestamp: 1,
                "system_metrics.cpu_percent": 1,
              },
            })
            .sort({ timestamp: 1 })
            .toArray()
        );

      case "ram_usage":
        return NextResponse.json(
          await col
            .find(baseMatch, {
              projection: {
                timestamp: 1,
                "system_metrics.ram_percent": 1,
              },
            })
            .sort({ timestamp: 1 })
            .toArray()
        );

      case "gpu_util":
        return NextResponse.json(
          await col
            .find(baseMatch, {
              projection: {
                timestamp: 1,
                "system_metrics.gpu.utilization_percent": 1,
              },
            })
            .sort({ timestamp: 1 })
            .toArray()
        );

      case "gpu_vram":
        return NextResponse.json(
          await col
            .find(baseMatch, {
              projection: {
                timestamp: 1,
                "system_metrics.gpu.memory_used_mb": 1,
              },
            })
            .sort({ timestamp: 1 })
            .toArray()
        );

      case "latency":
        return NextResponse.json(
          await col
            .find(baseMatch, {
              projection: {
                timestamp: 1,
                "inference_metrics.avg_10run_latency": 1,
              },
            })
            .sort({ timestamp: 1 })
            .toArray()
        );

      case "inference":
        return NextResponse.json(
          await col
            .find(baseMatch, {
              projection: {
                timestamp: 1,
                "inference_metrics.cold_start_latency": 1,
                "inference_metrics.warm_start_latency": 1,
                "inference_metrics.cpu_inference_time": 1,
                "inference_metrics.gpu_inference_time": 1,
              },
            })
            .sort({ timestamp: 1 })
            .toArray()
        );

      case "errors":
        return NextResponse.json(
          await col
            .aggregate([
              { $match: baseMatch },
              { $group: { _id: "$error", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
            ])
            .toArray()
        );

      default:
        return NextResponse.json(
          await col
            .find(baseMatch)
            .sort({ timestamp: -1 })
            .limit(200)
            .toArray()
        );
    }
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
