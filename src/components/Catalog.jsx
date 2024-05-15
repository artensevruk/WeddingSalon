import { getData  , addBasket } from "../api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";


const ElementCatalog = ({ product }) => {

  const addBasketProducts = () => addBasket(product)


  return (
    <div className="catalog">
      <h3>{product.name}</h3>
      <img src={`/${product.image}`} />
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
  const params = useParams();
  console.log(params.categoryId)
  const query = useQuery(["product", params.categoryId], () => getData(params.categoryId));
  return (
    <div className="catalogContainer">
      {(query.data || []).map((product) => (
        <ElementCatalog product={product} />
      ))}
    </div>
  );
};
