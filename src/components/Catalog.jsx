import goods from "../Catalog.json";
import { getData } from "../getData";
import { useQuery } from "react-query";

const ElementCatalog = ({ product }) => {
  return (
    <div className="catalog">
      <h1>{product.name}</h1>
      <img src="image/1.jpg" />
      <p>{product.price}</p>
      <button className="buy">Купить</button>
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
