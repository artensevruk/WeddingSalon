import mysql from "mysql2/promise";

const connection = await mysql.createConnection(
  "mysql://root:12345678@localhost:3306/lera"
);

const sql = 'SELECT * FROM `product`';

export const server = () =>{
  return connection.query(sql);
}

const sqlBasket = 'SELECT * FROM `cartProduct`';

export const serverToBasket = () =>{
  return connection.query(sqlBasket);
}




console.log(serverToBasket);
console.log(server);
