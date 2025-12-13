import time
import torch

def get_inference_metrics(model, tensor, device="cpu"):
    """
    Computes:
    - Cold inference time
    - Warm inference time
    - 10-run avg latency
    """

    # Cold inference
    start = time.time()
    with torch.no_grad():
        _ = model(tensor)
    cold_time = time.time() - start

    # Warm inference
    start = time.time()
    with torch.no_grad():
        _ = model(tensor)
    warm_time = time.time() - start

    # 10-run average
    times = []
    for _ in range(10):
        start = time.time()
        with torch.no_grad():
            _ = model(tensor)
        times.append(time.time() - start)

    avg_latency = sum(times) / len(times)

    metrics = {
        "cold_start_latency": cold_time,
        "warm_start_latency": warm_time,
        "avg_10run_latency": avg_latency,
    }

    # Assign latency to specific device field
    if str(device) == "cpu":
        metrics["cpu_inference_time"] = avg_latency
        metrics["gpu_inference_time"] = 0
    else:
        metrics["cpu_inference_time"] = 0
        metrics["gpu_inference_time"] = avg_latency

    return metrics
