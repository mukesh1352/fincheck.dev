import psutil
import subprocess
import shutil

from benchmarking.calc_flops import calculate_flops
from benchmarking.get_memory_footprint import get_memory_footprint


def get_gpu_metrics():
    """Check NVIDIA GPU availability."""
    if shutil.which("nvidia-smi") is None:
        return {"gpu_available": False}

    try:
        result = subprocess.check_output(
            [
                "nvidia-smi",
                "--query-gpu=utilization.gpu,memory.used,memory.total",
                "--format=csv,noheader,nounits",
            ]
        ).decode().strip()

        util_str, mem_used_str, mem_total_str = result.split(", ")
        return {
            "gpu_available": True,
            "utilization": int(util_str),
            "memory_used_mb": int(mem_used_str),
            "memory_total_mb": int(mem_total_str),
        }
    except:
        return {"gpu_available": False}


def get_system_metrics():
    """Return CPU, RAM, GPU, FLOPs, and model memory footprint."""
    metrics = {
        "cpu_percent": psutil.cpu_percent(interval=0.1),
        "ram_percent": psutil.virtual_memory().percent,
        "gpu": get_gpu_metrics(),
    }

    # FLOPs
    try:
        metrics["model_flops"] = calculate_flops()
    except Exception as e:
        metrics["model_flops"] = {"error": str(e)}

    # Memory footprint
    try:
        metrics["model_memory"] = get_memory_footprint()
    except Exception as e:
        metrics["model_memory"] = {"error": str(e)}

    return metrics
