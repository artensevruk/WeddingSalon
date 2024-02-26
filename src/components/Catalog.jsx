import goods from "../Catalog.json";
import { getData } from "../getData";
import { useQuery } from "react-query";

const ElementCatalog = ({ product }) => {
  return (
    <div className="catalog">
      <h3>{product.name}</h3>
      <img src={product.image} />
      <p>{product.price} руб</p>
      <button className="buy">Добавить в корзину</button>
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
