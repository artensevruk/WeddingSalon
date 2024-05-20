import { getData, addBasket } from "../api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ElementCatalog = ({ product }) => {
  const addBasketProducts = () => addBasket(product);

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
  const query = useQuery(["product", params.categoryId], () =>
    getData(params.categoryId)
  );
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (query.data) {
      const productsCopy = [...query.data];
      const sortedByPriceDesc = productsCopy.sort((a, b) => b.price - a.price);
      setSortedProducts(sortedByPriceDesc);
    }
  }, [query.data]);

  const handleSortByAscending = () => {
    if (query.data) {
      const sortedByPriceAsc = [...query.data].sort((a, b) => a.price - b.price);
      setSortedProducts(sortedByPriceAsc);
    }
  };

  const handleSortByDescending = () => {
    if (query.data) {
      const sortedByPriceDesc = [...query.data].sort((a, b) => b.price - a.price);
      setSortedProducts(sortedByPriceDesc);
    }
  };

  return (
    <div>
  <div className="sortPrise"> 
  <button onClick={handleSortByAscending}>
        от меньшей к большей
      </button>
      <button onClick={handleSortByDescending}>
        от большей к меньшей
      </button>
      </div>
    <div className="catalogContainer">
     
      {(sortedProducts || []).map((product) => (
        <ElementCatalog product={product} />
      ))}
    </div>
    </div>
  );
};
