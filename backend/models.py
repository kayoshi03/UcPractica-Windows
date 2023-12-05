from contextlib import contextmanager
from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(50))
    password = Column(String(50))

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email}, password={self.password})>"

    def __str__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email}, password={self.password})>"


class Sites(Base):
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    url = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    def __repr__(self):
        return f"<Sites(id={self.id}, name={self.name}, url={self.url}, user_id={self.user_id})>"

    def __str__(self):
        return f"<Sites(id={self.id}, name={self.name}, url={self.url}, user_id={self.user_id})>"


engine = create_engine("postgresql://postgres:postgres@postgres:5432/headbase")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)


@contextmanager
def session_scope():
    """Provide a transactional scope around a series of operations."""
    session = Session()
    try:
        yield session
        session.commit()
    except Exception as ex:
        print(f"Error: {ex}")
        session.rollback()
        raise
    finally:
        session.close()
