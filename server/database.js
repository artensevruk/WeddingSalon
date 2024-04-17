import mysql from "mysql2/promise"; //Импортируется модуль mysql2/promise, который предоставляет возможность работы с базой данных MySQL с использованием промисов.

const connection = await mysql.createConnection(
  "mysql://root:12345678@localhost:3306/lera" //Создается подключение к базе данных MySQL с помощью метода createConnection из модуля mysql2/promise.
);

const sql = "SELECT * FROM `product`"; // Запрашивается данные из таблицы product с помощью SQL запроса SELECT * FROM product.

export const server = () => { //Создаются две функции server и serverToBasket, которые выполняют запросы к базе данных и возвращают результат.
  return connection.query(sql);
};

const sqlBasket = "SELECT * FROM `cartProduct`";

export const serverToBasket = () => {
  return connection.query(sqlBasket);
};

console.log(serverToBasket);
console.log(server);
