from contextlib import contextmanager
from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import Column, Integer, String, ForeignKey, func

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False, unique=True)
    email = Column(String(50))
    password = Column(String(50), nullable=False)
    max_applications = Column(Integer, default=3)

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email}, password={self.password})>"

    def __str__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email}, password={self.password})>"


class Applications(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    url = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    photo_path = Column(String)

    def __repr__(self):
        return f"<Sites(id={self.id}, name={self.name}, url={self.url}, user_id={self.user_id})>"

    def __str__(self):
        return f"<Sites(id={self.id}, name={self.name}, url={self.url}, user_id={self.user_id})>"


engine = create_engine("postgresql://postgres:postgres@postgres_base:5432/headbase")
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)


def get_user(session: Session, name: str):
    user = session.query(User).filter(User.name == name).first()
    return user if user else False


def add_icon(session: Session, app_id, photo_path: str, user):
    try:
        site: Applications = session.query(Applications).filter(
            Applications.user_id == user.id,
            Applications.id == app_id
        ).first()
        if site:
            site.photo_path = photo_path
            session.commit()
            return "Иконка успешно добавлена", False
        return "Приложение не найдено", True
    except Exception as ex:
        return str(ex), True


def add_user(session: Session, new_user):
    try:
        if get_user(session, new_user.username):
            return "Пользователь существует", True

        user = User(name=new_user.username, password=new_user.password)
        session.add(user)
        session.commit()
        return f"Пользователь успешно создан", False
    except Exception as ex:
        return f"Не удалось добавить пользователя [{ex}]", True


def new_application(session: Session, request):
    try:
        print(
            session.query(func.count(Applications.id)).filter(Applications.user_id == request.user_id).scalar()
        )
        if session.query(func.count(Applications.id)).filter(Applications.user_id == request.user_id).scalar() >= 3:
            return "Превышен лимит приложений", True
        application = Applications(
            name=request.name,
            url=request.url,
            user_id=request.user_id
        )
        session.add(application)
        session.commit()
        return "Приложение успешно добавлено", False
    except Exception as ex:
        return str(ex), True


@contextmanager
def SessionManager():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception as ex:
        print(f"Ошибка: {ex}")
        session.rollback()
        raise
    finally:
        session.close()
