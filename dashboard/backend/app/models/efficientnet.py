import torch
import torch.nn as nn
from torchvision.models import efficientnet_b0

from app.core.config import MODEL_PATH, NUM_CLASSES


def load_model():

    # Create the same architecture used during training
    model = efficientnet_b0(weights=None)

    # Replace classifier for your dataset (6 classes)
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(in_features, NUM_CLASSES)

    # Load trained weights
    state_dict = torch.load(MODEL_PATH, map_location="cpu")

    model.load_state_dict(state_dict)

    model.eval()

    return model