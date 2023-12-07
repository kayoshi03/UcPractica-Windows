import requests

from fastapi import FastAPI, HTTPException, Depends, status, UploadFile
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import Response

from schemas import DefaultResponse, UserAuthRequest
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


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = decoded_token.get("username")
        if username:
            return decoded_token
    except jwt.exceptions.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )


@app.get("/", response_model=DefaultResponse, tags=["API", "HEAD"])
def root(current_user: dict = Depends(get_current_user)):
    """
        Маршрут для запроса информации с других проектов

        Отправляет запрос по маршрутам `/get-achievements`
        который возвращает JSON
    """
    return DefaultResponse()


@app.post("/register", response_model=DefaultResponse, tags=["API", "HEAD", "AUTH"])
def register(request: UserAuthRequest):
    with SessionManager() as session:
        username = request.username.strip()
        password = request.password.strip()

        if not username or not password:
            return DefaultResponse(error=True, message="Пустые поля", payload=[])

        new_user = add_user(session, request)

        return DefaultResponse(error=new_user[0], message=new_user[1], payload=[])


@app.post("/login", response_model=DefaultResponse, tags=["API", "HEAD", "AUTH"])
def login(request: UserAuthRequest, response: Response):
    """
        Маршрут авторизации пользователя создает токен авторизации
    """
    with SessionManager() as session:
        username = request.username.strip()
        password = request.password.strip()

        if not username or not password:
            return DefaultResponse(error=True, message="Пустые поля", payload=[])

        user: User = get_user(session, username)

        if isinstance(user, tuple):
            return DefaultResponse(error=user[0], message=user[1], payload=[])
        elif user:
            if username == user.name and user.password == password:
                token = create_access_token(
                    {
                        "id": user.id,
                        "name": user.name,
                        "password": user.password,
                    }
                )
                response.set_cookie("access_token_cookie", token, httponly=True)
                return DefaultResponse(error=False, message="OK", payload=token)
            else:
                return DefaultResponse(error=True, message="Неверный логин или пароль", payload=None)

        return DefaultResponse(error=True, message="Пользователь не найден", payload=None)
