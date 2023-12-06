from typing import Optional, Any
from pydantic import BaseModel


class DefaultResponse(BaseModel):
    error: Optional[bool] = False
    message: Optional[str] = "OK"
    payload: Any = []


class UserAuthRequest(BaseModel):
    username: Optional[str]
    password: Optional[str]
