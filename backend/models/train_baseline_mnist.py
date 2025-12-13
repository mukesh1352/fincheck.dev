import torch
import torch.nn.functional as F
import torch.optim as optim

from mnist_model import MNISTCNN
from mnist_data import get_mnist_loaders

def main():
    device = torch.device("cpu")

    model = MNISTCNN().to(device)
    train_loader, _ = get_mnist_loaders(batch_size=64)

    optimizer = optim.Adam(model.parameters(), lr=0.001)

    for epoch in range(5):
        model.train()
        total_loss = 0

        for x, y in train_loader:
            x, y = x.to(device), y.to(device)

            optimizer.zero_grad()
            out = model(x)
            loss = F.cross_entropy(out, y)
            loss.backward()
            optimizer.step()

            total_loss += loss.item()

        print(f"Epoch {epoch+1}/5 | Loss: {total_loss:.4f}")

    torch.save(model.state_dict(), "baseline_mnist.pth")
    print("✅ baseline_mnist.pth saved")

if __name__ == "__main__":
    main()
