import torch
import numpy as np

from mnist_model import MNISTCNN

device = torch.device("cpu")

# -------------------------
# Load baseline model
# -------------------------
model = MNISTCNN().to(device)
model.load_state_dict(torch.load("baseline_mnist.pth", map_location=device))
model.eval()

# -------------------------
# Weight Sharing function
# -------------------------
def weight_sharing(param, bits=4):
    """
    Quantizes weights into 2^bits shared buckets
    """
    w = param.data.cpu().numpy()
    k = 2 ** bits

    min_w, max_w = w.min(), w.max()
    buckets = np.linspace(min_w, max_w, k)
    idx = np.digitize(w, buckets) - 1
    idx = np.clip(idx, 0, k - 1)

    shared_w = buckets[idx]
    return torch.tensor(shared_w, dtype=param.dtype)

# -------------------------
# Apply weight sharing
# -------------------------
for name, param in model.named_parameters():
    if "weight" in name:
        param.data = weight_sharing(param)

# -------------------------
# Save model
# -------------------------
torch.save(model.state_dict(), "ws_mnist.pth")
print("✅ ws_mnist.pth saved")
