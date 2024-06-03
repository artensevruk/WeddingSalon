import { getDataCategories } from "../api";
import { useQuery } from "react-query";
import { NavLink, useParams ,useNavigate  } from "react-router-dom";



const Category = ({ category }) => {
  const navigate = useNavigate();

const {subCategoryId} = useParams();
console.log(subCategoryId)
  const handleSubCategoryChange = (subCategoryId) => {
    navigate(`/catalog/${category.id}/${subCategoryId}`); // Перенаправляем пользователя на URL с информацией о выбранной подкатегории
  };

  return (
    <div>
      <div className="sortCatalog">
        <NavLink to={`/catalog/${category.id}`}>
          <span>{category.categories}</span>
        </NavLink>
        <select className="subCategory" value={subCategoryId} onChange={(e) => handleSubCategoryChange(e.target.value)}>
          {category.subCategories.map((subCategory) => (
            <option key={subCategory.id} value={subCategory.id}>
              <NavLink to={`/catalog/${category.id}/${subCategory.id}`}>{subCategory.name}</NavLink>
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const SortCatalog = () => {
  const query = useQuery("categories", getDataCategories);
  console.log(query)
  return (
    <div>
    <h1 className="catalogName">Каталог</h1>
    <div className="catalogContainer2">
      {(query.data || []).map((category) => (
        <Category  category={category} />
      ))}
    </div>
    </div>
  );
};