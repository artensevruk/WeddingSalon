import {getData} from "../getData" 
import {useQuery} from 'react-query'


export const ElementCatalog = ({ product }) => {
  console.log("----" , product)
  return (
    <div className="model">
      <p>{product.name}</p>
      <p>{product.surname}</p>
    </div>
  );
};

export const Basement = () =>{
  const query  = useQuery("product" , getData )
  console.log(query)
  return(
    <div className="basement">
       
        {
         (query.data || []).map((product) => (
          <ElementCatalog product={product} />
        ))}
      
    </div>
    
  )
}