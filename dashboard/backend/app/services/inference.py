import time

import torch

from PIL import Image

from torchvision import transforms

from app.models.efficientnet import load_model

from app.core.config import IMAGE_SIZE

MODEL = load_model()

CLASS_NAMES = [

    "Buildings",

    "Forest",

    "Glacier",

    "Mountain",

    "Sea",

    "Street"

]

transform = transforms.Compose([

    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),

    transforms.ToTensor(),

    transforms.Normalize(

        mean=[0.485,0.456,0.406],

        std=[0.229,0.224,0.225]

    )

])

def predict(image_file):

    image = Image.open(image_file).convert("RGB")

    tensor = transform(image).unsqueeze(0)

    start = time.time()

    with torch.no_grad():

        output = MODEL(tensor)

        probs = torch.softmax(output,dim=1)

        confidence,pred = torch.max(probs,1)

    inference_time = time.time()-start

    return {

        "prediction":CLASS_NAMES[pred.item()],

        "confidence":round(confidence.item()*100,2),

        "inference_time":round(inference_time,4)

    }