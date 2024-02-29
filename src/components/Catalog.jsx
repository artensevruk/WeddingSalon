import goods from "../Catalog.json";
import { getData } from "../getData";
import { useQuery } from "react-query";

const ElementCatalog = ({ product }) => {
  const addBasket = () =>{
    fetch('http://localhost:8081/carts', {
    method: 'POST', // Здесь так же могут быть GET, PUT, DELETE
    body: JSON.stringify(product), // Тело запроса в JSON-формате
    headers: {
      // Добавляем необходимые заголовки
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(() => console.log("Hello"))
  }


  return (
    <div className="catalog">
      <h3>{product.name}</h3>
      <img src={product.image} />
      <p>{product.price} руб</p>
      <button onClick={addBasket} className="buy2">Добавить в корзину</button>
    </div>
  );
};

export const Catalog = () => {
  const query = useQuery("product", getData);
  return (
    <div className="catalogContainer">
      {(query.data || []).map((product) => (
        <ElementCatalog product={product} />
      ))}
    </div>
  );
};
