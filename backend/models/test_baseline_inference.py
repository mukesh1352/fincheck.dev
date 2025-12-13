import torch
from mnist_model import MNISTCNN
from mnist_data import get_mnist_loaders

device = torch.device("cpu")

model = MNISTCNN().to(device)
model.load_state_dict(torch.load("baseline_mnist.pth", map_location=device))
model.eval()

_, test_loader = get_mnist_loaders(batch_size=64)

correct = 0
total = 0

with torch.no_grad():
    for x, y in test_loader:
        x, y = x.to(device), y.to(device)
        out = model(x)
        preds = out.argmax(dim=1)
        correct += (preds == y).sum().item()
        total += y.size(0)

acc = 100 * correct / total
print(f"Baseline MNIST Accuracy: {acc:.2f}%")
