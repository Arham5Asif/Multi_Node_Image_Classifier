import torch

MODEL_PATH = "../../checkpoints/efficientnet_b0_best.pth"

checkpoint = torch.load(MODEL_PATH, map_location="cpu")

print("=" * 50)
print("Checkpoint loaded successfully!")
print("=" * 50)

print("Type:", type(checkpoint))

if isinstance(checkpoint, dict):
    print("✓ State Dictionary Detected")
    print("Total Layers:", len(checkpoint))
else:
    print("Unexpected checkpoint type:", type(checkpoint))