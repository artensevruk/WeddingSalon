import { Sequelize } from "sequelize"; //Импортируется модуль Sequelize из библиотеки sequelize, который используется для работы с базами данных с помощью ORM (Object-Relational Mapping).


export const sequelize = new Sequelize('mysql://root:12345678@localhost:3306/lera') //Создается новый экземпляр класса Sequelize с параметрами подключения к базе данных MySQL.
// В данном случае указаны данные для подключения к базе данных lera на локальном хосте (localhost) через порт 3306, с именем пользователя root и паролем 12345678.

try {
  await sequelize.authenticate();//Вызывается метод authenticate() для установления соединения с базой данных. Этот метод возвращает промис, который резолвится, если соединение установлено успешно, и реджектится в случае ошибки.
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
