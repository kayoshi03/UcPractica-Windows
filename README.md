# Стандарты разработки

Требуемы маршруты:

Получение достижений - *host*/get-achivments

Формат возврат JSON:


{
  "achivments": [],
  "score": 100,
  "hours_spent": 36
}


Вопрос: Как связать пользователей?

Ответ: Вместе с запросом к маршруту *get-achivments* будет отправляться JWT токен, соответственно его нужно у вас расшифровать пароль от аккаунта рабочего стола = ключю расшифрования JWT токена, который уазан к вас и расшироваывается в *get-achivments*.

Это сделано для безопасности
