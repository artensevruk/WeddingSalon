import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProduct } from "../api";
import { changeProduct } from "../api";
import { getDataCategories} from "../api";
import { Select } from "./Select";
import { ProductAttributes } from "./ProductAttributes";


export const EditProduct = () => {
  const { productId } = useParams();

  // const {subCategoryId} = useParams();//новое

  const { data: product } = useQuery(["product", productId], () => getProduct(productId));
  
  const noop = () => {};

  const formDataToJson = (formData) => Object.fromEntries(formData);

 const handleSubmit = (e) => {
 
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = formDataToJson(formData)
  data.id = productId;
  changeProduct(data)
 
 }
 const query = useQuery("categories", getDataCategories);

  return (
    <div className="editingPlatform">
      <h1>ПАНЕЛЬ АДМИНА</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="editingPanel">
            <h2>Редактирование наименования </h2>
          <input placeholder="Наименование" name="name" defaultValue={product?.name} />
          </div>
          <div className="editingPanel">
          <h2>Редактирование картинки </h2>
          <input placeholder="Картинка" name="image" defaultValue={product?.image} />
          </div>
          <div className="editingPanel">
          <h2>Редактирование цены </h2>
          <input placeholder="Цена" name="price" defaultValue={product?.price} />
          </div>
          <div>
            <ProductAttributes productAttrs={product?.colors} displayKey="color" productId ={product?.id} />
            <ProductAttributes productAttrs={product?.sizes} displayKey="size" productId ={product?.id} />
          </div>
          <div className="editingPanel">
          <h2>Редактирование категории </h2>
         <Select onChange={noop} value={product?.categoryId}  items={query.data || []}  name="categoryId"  displayKey="categories" />
          </div>
         
          {/* <div className="editingPanel">
          <h2>Редактирование цвета </h2>
         
         <Select onChange={}  items={product.sizes} name={"size"} />
          </div> */}
         
          <button   className="editing">Изменить базу данных</button>
        </form>
      </div>
    </div>
  );
};
