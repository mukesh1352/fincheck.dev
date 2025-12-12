# backend/benchmarking/ably_publisher.py
import os
import json
from ably import AblyRest

ABLY_KEY = os.getenv("ABLY_API_KEY")  # server-side Ably key
ABLY_CHANNEL = os.getenv("ABLY_CHANNEL", "metrics-stream")

if not ABLY_KEY:
    raise RuntimeError("Please set ABLY_API_KEY in backend environment")

ably = AblyRest(ABLY_KEY)
channel = ably.channels.get(ABLY_CHANNEL)

def publish_metric(doc: dict):
    """
    Publish the metric document to Ably channel.
    Uses event name 'metrics'.
    """
    try:
        # ensure doc is JSON-serializable (datetime -> iso string)
        payload = json.loads(json.dumps(doc, default=str))
        channel.publish("metrics", payload)
        # optional: print for backend debug
        print("[ABLY] Published metric")
    except Exception as e:
        print("[ABLY] Failed to publish metric:", e)
