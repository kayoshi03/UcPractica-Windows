import os
import shutil

from models import add_icon


def upload_photo_process(session, file, user):
    """
        Функция добавления фотографии
    """

    if not os.path.exists("uploads"):
        os.mkdir("uploads")

    photo_path = os.path.join("uploads", user.name)
    with open(photo_path, 'wb') as image:
        shutil.copyfileobj(file.file, image)

    result = add_icon(session, photo_path, user)
    return result
