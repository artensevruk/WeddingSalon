
import { useQuery } from "react-query";
import { getDataBasket , deleteBasket } from "../api";
import { useMutation, useQueryClient } from "react-query";


const ElementBasket = ({ productBasket }) => {
  const queryClient = useQueryClient();

  const deleteBasketId = () => deleteBasket(productBasket)

  const mutation = useMutation(deleteBasketId, {
    onSuccess: () => { 
      queryClient.refetchQueries("productBasket");
    },
  });

  return (
    <div className="basket">
      <h3>{productBasket.product.name}</h3>
      <img src={productBasket.product.image} />
      <p>{productBasket.product.price} руб</p>
      <button onClick={mutation.mutate} className="bay">
      <i class="fa-solid fa-xmark"></i>
      </button>
      <button className="bay3">
     Купить
      </button>
    </div>
  );
};

export const Basket = () => {
  const query = useQuery("productBasket", getDataBasket);
  return (
    <div className="basketContainer">
      <div className="title">
        <h1>Корзина</h1>
      </div>
      <div className="containerProducts">
      {(query.data || []).map((productBasket) => (
        <ElementBasket key={productBasket.id} productBasket={productBasket} />
      ))}
      </div>
      <div/>
    </div>
  );
};
