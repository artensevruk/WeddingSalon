import goods from "../Catalog.json";
import { getData } from "../getData";
import { useQuery } from "react-query";

const ElementCatalog = ({ product }) => {
  const addBasket = () => {
    fetch("http://localhost:8081/carts", {
      method: "POST", // Здесь так же могут быть GET, PUT, DELETE
      body: JSON.stringify(product), // Тело запроса в JSON-формате
      headers: {
        // Добавляем необходимые заголовки
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => console.log("Hello"));
  };

  return (
    <div className="catalog">
      <h3>{product.name}</h3>
      <img src={product.image} />
      <p>{product.categories.map((element) => element.categories)}</p>
      <p>
        <select className="select">
          {product.sizes.map((element) => (
            <option key={product.id} defaultValue={product.id}>
              {element.size}
            </option>
          ))}
        </select>
      </p>
      <p>
        <select className="select">
          {product.colors.map((element) => (
            <option key={product.id} defaultValue={product.id}>
              {element.color}
            </option>
          ))}
        </select>
      </p>
      <p>{product.price} руб</p>


      <button onClick={addBasket} className="bay2">
        Добавить в корзину
      </button>
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
