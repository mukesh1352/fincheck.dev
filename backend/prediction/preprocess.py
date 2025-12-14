import cv2
import numpy as np
import torch

def preprocess_image(image_path):
    """
    Returns a list of torch.FloatTensor digits ready for MNISTCNN:
    Each tensor has shape (1,28,28) and normalized [0,1].
    """
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError("Image not found or invalid path")

    # Otsu threshold + invert
    _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Morphology
    kernel = np.ones((3, 3), np.uint8)
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

    # Contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    digit_boxes = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if h > 20 and w > 5:
            digit_boxes.append((x, y, w, h))

    # Sort left to right
    digit_boxes = sorted(digit_boxes, key=lambda b: b[0])

    digits = []
    for x, y, w, h in digit_boxes:
        digit = thresh[y:y+h, x:x+w]

        # Make square
        size = max(w, h)
        padded = np.zeros((size, size), dtype=np.uint8)
        x_offset = (size - w) // 2
        y_offset = (size - h) // 2
        padded[y_offset:y_offset+h, x_offset:x_offset+w] = digit

        # Resize to 28x28
        resized = cv2.resize(padded, (28, 28), interpolation=cv2.INTER_AREA)

        # Normalize and convert to torch tensor
        tensor = torch.from_numpy(resized.astype(np.float32) / 255.0)
        tensor = tensor.unsqueeze(0)  # Shape: (1, 28, 28) → correct channels

        digits.append(tensor)

    return digits  # List of tensors, each (1,28,28)
