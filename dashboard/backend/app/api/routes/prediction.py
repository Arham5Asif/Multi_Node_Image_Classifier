from fastapi import APIRouter, UploadFile, File

from app.services.inference import predict

router = APIRouter()

@router.post("/predict")

async def predict_image(

    file: UploadFile = File(...)

):

    result = predict(file.file)

    return result