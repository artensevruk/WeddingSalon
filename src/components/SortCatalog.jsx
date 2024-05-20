import { getDataCategories } from "../api";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";

 const  Category = ({category}) =>{
  return(
    <div className="sortCatalog">
      <NavLink  to={`/home/${category.id}`}> <span >{category.categories}</span></NavLink> 
    </div>
  )
};

export const SortCatalog = () => {
  const query = useQuery("categories", getDataCategories);
  return (
    <div className="catalogContainer">
      {(query.data || []).map((category) => (
        <Category  category={category} />
      ))}
    </div>
  );
};