import requests

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from schemas import DefaultResponse
from models import *
from auth import *


app = FastAPI()

security = CustomHTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=DefaultResponse, tags=["API", "HEAD"])
def root():
    return DefaultResponse()


@app.post("/register", response_model=DefaultResponse, tags=["API", "HEAD", "AUTH"])
def register():
    return DefaultResponse()


@app.post("/login", response_model=DefaultResponse, tags=["API", "HEAD", "AUTH"])
def login():
    return DefaultResponse()
