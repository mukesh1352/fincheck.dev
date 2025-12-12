# # backend/benchmarking/store_metrics.py
# import json
# import os
# from datetime import datetime
# from backend.benchmarking.mongo_client import get_metrics_collection

# METRICS_DIR = os.path.join(os.path.dirname(__file__), "results")
# os.makedirs(METRICS_DIR, exist_ok=True)

# def store_metrics(job_id, metrics):
#     """
#     Store metrics in:
#     1. Local JSON file
#     2. MongoDB
#     """

#     metrics_with_ts = {
#         "job_id": job_id,
#         "timestamp": datetime.utcnow().isoformat(),
#         **metrics,
#     }

#     # Save JSON
#     out_path = os.path.join(METRICS_DIR, f"{job_id}_metrics.json")
#     with open(out_path, "w") as f:
#         json.dump(metrics_with_ts, f, indent=2)

#     # Save to MongoDB
#     try:
#         col = get_metrics_collection()
#         col.insert_one(metrics_with_ts)
#         print(f"[MongoDB] Metrics stored for {job_id}")
#     except Exception as e:
#         print(f"[MongoDB] FAILED to store metrics: {e}")



# backend/benchmarking/store_metrics.py
import json
import os
from datetime import datetime
from backend.benchmarking.mongo_client import get_metrics_collection

# import the Ably publisher (new)
try:
    from backend.benchmarking.ably_publisher import publish_metric
except Exception:
    # If Ably not configured, warn but continue
    publish_metric = None

METRICS_DIR = os.path.join(os.path.dirname(__file__), "results")
os.makedirs(METRICS_DIR, exist_ok=True)

def store_metrics(job_id, metrics):
    """
    Store metrics in:
    1. Local JSON file
    2. MongoDB
    3. Publish to Ably (real-time)
    """

    metrics_with_ts = {
        "job_id": job_id,
        "timestamp": datetime.utcnow().isoformat(),
        **metrics,
    }

    # Save JSON locally (for offline debugging / reproducibility)
    out_path = os.path.join(METRICS_DIR, f"{job_id}_metrics.json")
    with open(out_path, "w") as f:
        json.dump(metrics_with_ts, f, indent=2, default=str)

    # Save to MongoDB
    try:
        col = get_metrics_collection()
        result = col.insert_one(metrics_with_ts)
        print(f"[MongoDB] Metrics stored for {job_id} (id={result.inserted_id})")

        # Publish to Ably (if available)
        if publish_metric:
            try:
                publish_metric(metrics_with_ts)
            except Exception as e:
                print(f"[ABLY] publish failed: {e}")

    except Exception as e:
        print(f"[MongoDB] FAILED to store metrics: {e}")

