import { getData, addBasket } from "../api";
import { useQuery } from "react-query";
import { useParams , useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { isUserAuth } from "../utils";
import { ScrollButton } from "./btnUp";
import { user } from "../api";
import { Select } from "./Select";
import { deleteCatalog } from "../api";
import { useMutation , useQueryClient } from "react-query";


const ElementCatalog = ({ product , isAuth  , params }) => {
  const navigate = useNavigate();
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [colorId, setColorId] = useState(product.colors[0].id);
  const addBasketProducts = () => addBasket(product , sizeId , colorId);

  const { data: userData } = useQuery('user', user);
 
  const handleSubCategoryChange = () => {
    navigate(`/catalog/editproduct/${product.id}`); // Перенаправляем пользователя на URL с информацией о выбранной подкатегории
  
  };

  const queryClient = useQueryClient();

  const removingProduct = () => deleteCatalog(product);
  const mutation = useMutation(removingProduct, {
    onSuccess: () => {
      queryClient.refetchQueries(["product" , params]);
    },
  });

  return (
    <div className="catalog">
      <h3>{product.name}</h3>
      <img src={`/${product.image}`} />
      <p>
      <Select onChange={setSizeId}  items={product.sizes} name={"size"} displayKey="size" />
      
      </p>
      <p>
        <Select onChange={setColorId}  items={product.colors} name={"color"}  displayKey="color"/>
      </p>
      <p>{product.price} руб</p>

      <button disabled={!isAuth} onClick={addBasketProducts} className="bay2">
        Добавить в корзину
      </button>
      
      {userData?.isAdmin && <button className="editing" onClick={handleSubCategoryChange}>Редактировать</button>}
      {userData?.isAdmin && <button className="editing" onClick={mutation.mutate}>Удалить товар из базы</button>}
      
    </div>
    
  );
};

export const Catalog = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);




  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  };

  const query = useQuery(["product", params], () =>
    getData(params)
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
      const sortedByPriceAsc = [...query.data].sort(
        (a, b) => a.price - b.price
      );
      setSortedProducts(sortedByPriceAsc);
    }
  };

  const handleSortByDescending = () => {
    if (query.data) {
      const sortedByPriceDesc = [...query.data].sort(
        (a, b) => b.price - a.price
      );
      setSortedProducts(sortedByPriceDesc);
    }
  };

  return (
    <div>
      <hr></hr>
      <ScrollButton  ></ScrollButton>
      <div className="FilterName">Фильтр</div>
      <div className="sortPrice">
        <select
          className="filter"
          onChange={(e) => {
            if (e.target.value === "asc") {
              handleSortByAscending();
            } else if (e.target.value === "desc") {
              handleSortByDescending();
            }
          }}
        >
          <option value="">Сортировка по цене</option>
          <option value="asc">От меньшей к большей</option>
          <option value="desc">От большей к меньшей</option>
        </select>
      </div>
      <div>
    
</div>
<div className="searchContainer">
  <input
    type="text"
    className="search"
    placeholder="Поиск по названию товара"
    value={searchQuery}
    onChange={handleSearch}
  />
  </div>
      <div className="catalogContainer">
      {(searchQuery ? searchResults : sortedProducts).map((product) => (
    <ElementCatalog key={product.id} params = {params} product={product} isAuth ={isUserAuth()} />
  ))}
      </div>
    </div>
  );
};
