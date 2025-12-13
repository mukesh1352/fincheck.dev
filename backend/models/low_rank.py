import torch
import torch.nn as nn

from mnist_model import MNISTCNN

device = torch.device("cpu")

# -------------------------
# Load baseline model
# -------------------------
model = MNISTCNN().to(device)
model.load_state_dict(torch.load("baseline_mnist.pth", map_location=device))
model.eval()

# -------------------------
# Apply Low-Rank Factorization on fc1
# -------------------------
fc = model.fc1
W = fc.weight.data
b = fc.bias.data

# Choose rank (smaller = more compression)
rank = 32

# SVD
U, S, Vh = torch.linalg.svd(W, full_matrices=False)

U_r = U[:, :rank]
S_r = S[:rank]
V_r = Vh[:rank, :]

# New layers
fc1_lr = nn.Linear(V_r.shape[1], rank, bias=False)
fc2_lr = nn.Linear(rank, U_r.shape[0], bias=True)

fc1_lr.weight.data = V_r
fc2_lr.weight.data = torch.matmul(torch.diag(S_r), U_r.T)
fc2_lr.bias.data = b

# Replace original fc1
model.fc1 = nn.Sequential(fc1_lr, fc2_lr)

# -------------------------
# Save model
# -------------------------
torch.save(model.state_dict(), "lrf_mnist.pth")
print("✅ lrf_mnist.pth saved")
