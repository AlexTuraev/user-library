ToRead application

Install dependencies modules - npm install
Start development mode - npm start

1. Реализован горячий поиск (задержка запроса по последней нажатой клавише)
2. Реализован Local Storage
3. Реализована постраничная выдача (Next, Prev). Выдача по 100 книг (или меньше).
4. Реализован Scroll и подгрузка новых книг. Внимание! Постраничные кнопки выдадут данные опять порцией, то есть книги добавленные при скроле пропадут.
5. Реализована возможность добавления книг в список пользователя (на Local Storage).
6. Реализованы возможности:
    6.1. Отметить книгу прочитанной
    6.2. Снять отметку от прочтении
    6.3. Удалить из пользовательского списка
7. Нажатие кнопки Enter на поиске или кнопки Go в приложении перезагрузят запрос (отправят повторно).
8. При наличии активного неисполненного до конца запроса, следующий запрос отменяет предыдущий (сам запрос продолжает работать, но на данные не повлияет).
    Таким образом гарантируется, что более длительный ранний запрос не испортит данные последнего запроса.
9. Реализована проверка на дубль при добавлении в список пользователя