import express, { request } from "express";
import cors from "cors";
import { Product } from "./productModel.js";
// import { Size } from "./productModel.js";
// import { Basket } from "./productModel.js";
import { CartProduct } from "./cartModel.js";
import { queries } from "@testing-library/react";

const port = 8081;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/product", async function (req, res) {
  const result = await Product.findAll({ raw: true });
  res.send(result);
});

app.get("/cartProduct", async function (req, res) {
  const result = await CartProduct.findAll({ include: [Product] });
  res.send(result);
});

app.delete("/cartProduct/:id" , async function(req , res){
 await CartProduct.destroy({
  where:{
    id: req.params.id
  }
})
res.end()
});

app.post("/carts", async function (req, res) {
  const product = await Product.findOne({ where: { id: req.body.id } });

  await CartProduct.create(
    { quantity: 1, productId: req.body.id  }
  );
  res.end()
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
