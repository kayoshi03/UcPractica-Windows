# Стандарты разработки

Требуемы маршруты:

Должен быть маршрут получение достижений - *host*/get-achivments

Формат возврат JSON:


{

  "achivments": [
  
    "Научился пользоваться GitHub",
    
    "Научился пользоваться СУБД"
    
  ],
  
  "score": 100,
  
  "hours_spent": 36
  
}


Возврат должен содержать основные ваши достижения о работе, которую вы выполнили.


Вопрос: Как связать пользователей?

Ответ: Вместе с запросом к маршруту *get-achivments* будет отправляться JWT токен, соответственно его нужно у вас расшифровать пароль от аккаунта рабочего стола = ключю расшифрования JWT токена, который уазан к вас и расшироваывается в *get-achivments*.

Это сделано для безопасности

Лучше всего пользоваться Python(FastApi, sqlalchemy), JavaScript(express.js, mysql) для работы с бэком и базой
