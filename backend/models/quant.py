import torch
from torch.quantization import quantize_dynamic

from mnist_model import MNISTCNN

model = MNISTCNN()
model.load_state_dict(torch.load("baseline_mnist.pth", map_location="cpu"))
model.eval()

quant_model = quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

torch.save(quant_model.state_dict(), "quantized_mnist.pth")
print("✅ quantized_mnist.pth saved")
