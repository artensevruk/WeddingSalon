import mysql from "mysql2/promise";

const connection = await mysql.createConnection(
  "mysql://root:12345678@localhost:3306/Lera"
);

const sql = 'SELECT * FROM `clients`';

const [rows, fields] = await connection.query(sql);

console.log(rows);
console.log(fields);

