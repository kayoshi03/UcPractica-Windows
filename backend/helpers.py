import os
import shutil
import uuid

from models import add_icon


def upload_photo_process(session, app_id, file, user):
    """
        Функция добавления фотографии
    """

    if not os.path.exists("uploads"):
        os.mkdir("uploads")

    photo_path = os.path.join("uploads", str(uuid.uuid4()))
    with open(photo_path, 'wb') as image:
        shutil.copyfileobj(file.file, image)

    result = add_icon(session, app_id, photo_path, user)
    return result
