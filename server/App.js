import express, { request } from "express";
import cors from "cors";
import { Product } from "./productModel.js";
import { SubCategories } from "./subcategories.js";
// import { Size } from "./productModel.js";
// import { Basket } from "./productModel.js";
import { CartProduct } from "./cartModel.js";
import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import { queries } from "@testing-library/react";
import { Size } from "./sizeModel.js";
import { Color } from "./colorModel.js";
import { User } from "./userModel.js";
import { Categories } from "./categoriesModel.js";
import { sequelize } from "./connectDatabase.js";
import jwt from "jsonwebtoken";

//Импортируются необходимые модули express, cors, модели (Product, CartProduct, Size, Color, Categories)
// и функции из библиотеки @testing-library/react.

const JwtSECRET = "1234578912";
const port = 8081;
const app = express(); //Создается экземпляр приложения Express с помощью вызова функции express().
app.use(cors()); //Добавляется middleware cors для обработки CORS (Cross-Origin Resource Sharing).
app.use(express.json()); //Добавляется middleware express.json() для обработки JSON данных.

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Предполагается, что токен передается как "Bearer token"

    jwt.verify(token, JwtSECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Неверный токен" });
      }

      try {
        const user = await User.findOne({ where: { email: decoded.email } }); // Предположим, что в токене зашифрован логин пользователя
        console.log(user);
        if (!user) {
          return res.status(404).json({ message: "Пользователь не найден" });
        }

        req.user = user; // Добавляем объект пользователя в объект запроса для дальнейшего использования
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при поиске пользователя" });
      }
    });
  } else {
    res.status(401).json({ message: "Отсутствует заголовок Authorization" });
  }
}

app.get("/product/:id" , async function (req, res){
  const { id } = req.params;
 const result =  await Product.findOne({
  where: { id : id},
})
res.send(result);
})

app.post("/product/:id", async function (req, res){
  const { name ,  image , price  , categoryId , subCategoryId } = req.body;
  

  const { id } = req.params;

  const result = await Product.update({ name: name , image:image ,price:price ,categoryId:categoryId   }, {
    where: {
      id: id //  идентификатор продукта, который вы хотите обновить
    },
    returning: true

  });
 //toDo ------------- ;)
  // Отправьте ответ клиенту
  res.send(result)
})


app.get("/product", async function (req, res) {
  let query = { include: [Size, Color] , where: {
    // Добавить условие для поиска продуктов со статусом false
    deleted: false,
  }, };

  if (req.query.subCategoryId) {
    query.where.subCategoryId =  req.query.subCategoryId ;
  } else if (req.query.categoryId) {
    query.where.categoryId =  req.query.categoryId ;
  }
  const result = await Product.findAll(query);
  res.send(result);
});
//Объявляются роуты:
//- GET /product: Возвращает все продукты с информацией о размере, цвете и категории и выводит их в фомате json на порте 8081.

app.get("/categories", async function (req, res) {
  const result = await Categories.findAll({
    include: [SubCategories], // Включаем связанную модель Subcategory
  });
  res.send(result);
});

app.get("/cartProduct", authenticateJWT, async function (req, res) {
  const user = req.user;
  const result = await CartProduct.findAll({
    where: { userId: user.id },
    include: [Product ,Size, Color],
  });
  res.send(result);
}); // GET /cartProduct: Возвращает все продукты в корзине с информацией о продукте.

app.get("/currentUser", authenticateJWT, function (req, res) {
  const user = req.user; // Получаем информацию о пользователе из объекта запроса
  res.send(user); // Отправляем информацию о пользователе на фронтенд
});

app.post("/entrance", async function (req, res) {
  //req - запрос res - ответ
  const { email, password } = req.body; // Получение введенных данных из запроса

  const secretKey = JwtSECRET;
  const token = jwt.sign({ email }, secretKey);

  try {
    const user = await User.findOne({
      where: { email: email, password: password },
    }); // Поиск пользователя по имени и паролю

    if (user) {
      res.send({ token }); // Если пользователь найден, отправить сообщение об успешном входе
    } else {
      res.status(401).send("Неверное имя пользователя или пароль"); // Если пользователь не найден, отправить сообщение об ошибке
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Ошибка при выполнении запроса к базе данных" });
  }
  console.log(token);
});

app.delete("/cartProduct/:id", authenticateJWT, async function (req, res) {
  await CartProduct.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).send();
}); // - DELETE /cartProduct/:id: Удаляет продукт из корзины по его идентификатору.

app.delete("/product/:id" , authenticateJWT , async function (req, res){
  await Product.update({ deleted: true  } ,{
    where: {
      id: req.params.id,
    },
  })
  res.status(204).send();
})


app.post("/carts", authenticateJWT, async function (req, res) {
  const user = req.user;
  const { productId, sizeId, colorId } = req.body;

  await CartProduct.create({
    userId: user.id,
    quantity: 1,
    productId,
    sizeId,
    colorId
  });
  res.status(201).send();
}); //- POST /carts: Добавляет продукт в корзину по идентификатору продукта.

app.post("/registration", async (req, res) => {
  
  try {
    
    const { name, surname, email, password } = req.body;

    // Проверка наличия пользователя в базе данныхф
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ error: 'Пользователь с таким email уже существует' });
    }

    // Если пользователя нет, регистрируем его
    await User.create({ name, surname, email, password });
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Произошла ошибка при регистрации пользователя");
  }
});

app.listen(port, () => {
  //Устанавливается прослушивание порта 8081 с помощью метода app.listen().
  console.log(`Example app listening on port ${port}`);
});
