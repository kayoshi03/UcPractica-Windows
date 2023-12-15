import io
import os

from PIL import Image
from fastapi import FastAPI, Depends, status, UploadFile
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import Response, StreamingResponse
from fastapi.params import File
from helpers import upload_photo_process
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
        if decoded_token:
            return User(id=decoded_token["id"], name=decoded_token["name"], password=decoded_token["password"])
    except jwt.exceptions.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )


@app.on_event("startup")
def startup():
    """
        Начальное насыщение
    """
    with SessionManager() as session:
        if not session.query(User).all():
            admin = User(name="admin", email="admin@admin.ru", password="admin")
            session.add(admin)
            session.commit()

            site = Sites(name="admin", url="https://www.google.com", user_id=admin.id, photo_path=None)
            session.add(site)
            session.commit()


@app.get("/", response_model=DefaultResponse, tags=["API", "HEAD"])
def root(current_user: User = Depends(get_current_user)):
    """
        Маршрут для запроса информации с других проектов

        Отправляет запрос по маршрутам `/get-achievements`
        который возвращает JSON
    """
    with SessionManager() as session:
        applications: list[Sites] = session.query(Sites).all()

        result = []
        for application in applications:
            result.append(
                {
                    "id": application.user_id,
                    "name": application.name,
                    "url": application.url,
                    "photo_path": application.photo_path
                }
            )

    return DefaultResponse(payload=result)


@app.post("/register", response_model=DefaultResponse, tags=["API", "HEAD", "AUTH"])
def register(request: UserAuthRequest):
    with SessionManager() as session:
        username = request.username.strip()
        password = request.password.strip()

        if not username or not password:
            return DefaultResponse(error=True, message="Пустые поля", payload=[])

        new_user = add_user(session, request)

        return DefaultResponse(error=new_user[1], message=new_user[0], payload=[])


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
            return DefaultResponse(error=user[1], message=user[0], payload=[])
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
        else:
            return DefaultResponse(error=True, message="Пользователь не найден", payload=None)


@app.post("/add_icon")
def add_icon(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    """
        Добавление иконки
    """
    with SessionManager() as session:
        message, error = upload_photo_process(session, file, current_user)
        return DefaultResponse(error=error, message=message, payload=[])


@app.get("/get_icon", tags=["API", "Пользователь"])
def get_image(user_id: int):
    """
        Получение иконки
    """
    with SessionManager() as session:
        site: Sites = session.query(Sites).filter(Sites.user_id == user_id).first()
        if site:
            if site.photo_path and os.path.exists(site.photo_path):
                img = Image.open(site.photo_path)
                img = img.convert("RGB")
                img_byte_array = io.BytesIO()
                img.save(img_byte_array, format="JPEG")
                img_byte_array.seek(0)

                try:
                    return StreamingResponse(io.BytesIO(img_byte_array.getvalue()), media_type="image/jpeg")
                except:
                    return DefaultResponse(error=True, message="Недопустимый формат файла", payload=None)
            else:
                return DefaultResponse(error=True, message="Изображение не найдено", payload=None)
        else:
            return DefaultResponse(error=True, message="Изображение по пользователю не найдено", payload=None)


@app.get("/get_achievements")
def get_achievements(url: str):
    """
        Запрос серверу на получение достижений.
        Возможные достижения: https://github.com/kayoshi03/UcPractica-Windows/blob/main/README.md
    """
    return DefaultResponse()


@app.get("/labels")
def labels():
    """
        Маршрут предназначен для возврата labels приложения.
        Возможные лейблы: https://github.com/kayoshi03/UcPractica-Windows/blob/main/Label.md
    """
    return DefaultResponse()
