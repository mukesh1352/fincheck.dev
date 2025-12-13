import torch
import torch.nn.utils.prune as prune

from mnist_model import MNISTCNN

device = torch.device("cpu")

model = MNISTCNN().to(device)
model.load_state_dict(torch.load("baseline_mnist.pth", map_location=device))

prune.l1_unstructured(model.fc1, name="weight", amount=0.3)
prune.remove(model.fc1, "weight")

torch.save(model.state_dict(), "pruned_mnist.pth")
print("✅ pruned_mnist.pth saved")
