import torch
import torch.nn.functional as F
import os
from msgqueue.worker_models import SmallCNN

def load_model():
    backend_root = os.path.dirname(os.path.dirname(__file__))
    model_path = os.path.join(backend_root, "models", "model_best.pth")

    checkpoint = torch.load(model_path, map_location="cpu")

    if "student_state" in checkpoint:
        state_dict = checkpoint["student_state"]
    elif "model_state" in checkpoint:
        state_dict = checkpoint["model_state"]
    else:
        raise KeyError("No valid weights found in checkpoint.")

    model = SmallCNN(num_classes=10)
    model.load_state_dict(state_dict)
    model.eval()
    return model


def compute_prediction_quality(image_tensor):
    model = load_model()

    with torch.no_grad():
        logits = model(image_tensor)
        probs = F.softmax(logits, dim=1)

    top_prob, top_class = probs.max(dim=1)
    entropy = -(probs * probs.log()).sum().item()
    top3_probs, top3_idx = probs.topk(3)

    return {
        "predicted_class": int(top_class.item()),
        "confidence": float(top_prob.item()),
        "entropy": float(entropy),
        "top3_probabilities": top3_probs.squeeze().tolist(),
        "top3_classes": top3_idx.squeeze().tolist(),
    }
