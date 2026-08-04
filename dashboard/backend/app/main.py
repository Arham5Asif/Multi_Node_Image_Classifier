from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.core.config import APP_NAME, VERSION
from app.api.routes.prediction import router as prediction_router

app = FastAPI(

    title=APP_NAME,

    version=VERSION

)

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

app.include_router(

    health_router,

    prefix="/api"

)

app.include_router(

    prediction_router,

    prefix="/api"

)

@app.get("/")
def root():

    return {

        "message": APP_NAME,

        "version": VERSION

    }

