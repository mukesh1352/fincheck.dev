from benchmarking.system_metrics import get_system_metrics
from benchmarking.calc_flops import calculate_flops
from benchmarking.get_memory_footprint import get_memory_footprint
from benchmarking.prediction_quality import compute_prediction_quality
import torch
from PIL import Image
import torchvision.transforms as transforms
import os


def preprocess_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])

    img = Image.open(image_path).convert("RGB")
    return transform(img).unsqueeze(0)


def collect_all_metrics(image_path: str):
    # Preprocess image for prediction metrics
    img_tensor = preprocess_image(image_path)

    # --- METRICS ---
    system_stats = get_system_metrics()
    flops = calculate_flops()
    memory = get_memory_footprint()
    prediction_stats = compute_prediction_quality(img_tensor)

    return {
        "system_metrics": system_stats,
        "model_flops": flops,
        "memory_usage": memory,
        "prediction_quality": prediction_stats
    }
