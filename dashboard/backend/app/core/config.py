from dotenv import load_dotenv
import os

load_dotenv()

APP_NAME = os.getenv("APP_NAME")
VERSION = os.getenv("VERSION")

HOST = os.getenv("HOST")
PORT = int(os.getenv("PORT"))

DEBUG = os.getenv("DEBUG") == "True"

MODEL_PATH = os.getenv("MODEL_PATH")

IMAGE_SIZE = int(os.getenv("IMAGE_SIZE"))

NUM_CLASSES = int(os.getenv("NUM_CLASSES"))


