import { getData  , addBasket } from "../api";
import { useQuery } from "react-query";



const ElementCatalog = ({ product }) => {

  const addBasketProducts = () => addBasket(product)


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


      <button onClick={addBasketProducts} className="bay2">
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
