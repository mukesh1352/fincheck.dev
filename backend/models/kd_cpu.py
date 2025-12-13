import torch
import torch.nn.functional as F
import torch.optim as optim

from mnist_model import MNISTCNN
from mnist_data import get_mnist_loaders

device = torch.device("cpu")

teacher = MNISTCNN().to(device)
teacher.load_state_dict(torch.load("baseline_mnist.pth", map_location=device))
teacher.eval()

student = MNISTCNN().to(device)

train_loader, _ = get_mnist_loaders(batch_size=64)
optimizer = optim.Adam(student.parameters(), lr=0.001)

T = 4.0
alpha = 0.7

for epoch in range(5):
    student.train()
    total_loss = 0

    for x, y in train_loader:
        x, y = x.to(device), y.to(device)
        optimizer.zero_grad()

        s_logits = student(x)
        with torch.no_grad():
            t_logits = teacher(x)

        ce = F.cross_entropy(s_logits, y)
        kd = F.kl_div(
            F.log_softmax(s_logits / T, dim=1),
            F.softmax(t_logits / T, dim=1),
            reduction="batchmean"
        ) * (T * T)

        loss = alpha * kd + (1 - alpha) * ce
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    print(f"Epoch {epoch+1}/5 | KD Loss: {total_loss:.4f}")

torch.save(student.state_dict(), "kd_mnist.pth")
print("✅ kd_mnist.pth saved")
