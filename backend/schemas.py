from typing import Optional, Any, List
from pydantic import BaseModel


class DefaultResponse(BaseModel):
    error: Optional[bool] = False
    message: Optional[str] = "OK"
    payload: Any = []


class UserAuthRequest(BaseModel):
    username: Optional[str]
    password: Optional[str]


class ApplicationElement(BaseModel):
    id: Optional[int]
    name: Optional[str]
    url: Optional[str]
    user_id: Optional[int]
    photo_path: Optional[str]


class CreateApplicationRequest(BaseModel):
    name: Optional[str] = None
    url: Optional[str] = None


class CreateApplicationResponse(DefaultResponse):
    payload: Optional[ApplicationElement] = None


class ApplicationListResponse(DefaultResponse):
    payload: Optional[List[ApplicationElement]] = None


class AddIconResponse(DefaultResponse):
    payload: Optional[ApplicationElement]
