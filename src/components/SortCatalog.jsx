import { getDataCategories } from "../api";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";

 const  Category = ({category}) =>{
  return(
    <div>
    <div className="sortCatalog">
      <NavLink  to={`/home/${category.id}`}> <span >{category.categories}</span></NavLink> 
    </div>
    </div>
  )
};

export const SortCatalog = () => {
  const query = useQuery("categories", getDataCategories);
  return (
    <div className="catalogContainer2">
      {(query.data || []).map((category) => (
        <Category  category={category} />
      ))}
    </div>
  );
};