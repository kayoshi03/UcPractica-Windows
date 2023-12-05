import requests

from fastapi import FastAPI
from schemas import DefaultResponse
from models import *


app = FastAPI()


@app.get("/", response_model=DefaultResponse, tags=["API", "HEAD"])
def root():
    return DefaultResponse()


@app.post("/register", response_model=DefaultResponse, tags=["API", "HEAD", "AUTH"])
def register():
    return DefaultResponse()


@app.post("/login", response_model=DefaultResponse, tags=["API", "HEAD", "AUTH"])
def login():
    return DefaultResponse()
