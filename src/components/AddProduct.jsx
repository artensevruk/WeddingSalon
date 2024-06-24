import { useQuery } from "react-query";
import { getDataCategories, getSubCategories, addProduct } from "../api";
import { Select } from "./Select";
import { useState } from "react";

export const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
 

  const fetchCategories = async () => {
    const data = await getDataCategories();
    setCategories(data);
  };

  const fetchSubCategories = async (categoryId) => {
    const data = await getSubCategories(categoryId);
    setSubCategories(data);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    fetchSubCategories(categoryId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    addProduct(data);
  };

  useQuery("categories", fetchCategories);

  return (
    <div className="addingProductPlatform">
      <h1>ДОБАВИТЬ ТОВАР</h1>
      <form onSubmit={handleSubmit}>
        <div className="addingProductPanel">
          <h2>Наименование товара</h2>
          <input placeholder="Наименование" name="name" />
        </div>
        <div className="addingProductPanel">
          <h2>Картинка</h2>
          <input placeholder="Картинка" name="image" />
        </div>
        <div className="addingProductPanel">
          <h2>Цена</h2>
          <input placeholder="Цена" name="price" />
        </div>
        <div className="addingProductPanel">
          <h2>Выберите категорию</h2>
          <Select
            onChange={handleCategoryChange}
            items={categories}
            name="categoryId"
            displayKey="categories"
          />
        </div>
        {subCategories && subCategories.length > 0 && (
          <div className="addingProductPanel">
            <h2>Выберите подкатегорию</h2>
            <Select
              items={subCategories}
              name="subCategoryId"
              displayKey="name"
            />
          </div>
        )}
        <button className="addProductToDataBase">Добавить товар в базу данных</button>
      </form>
    </div>
  );
};
