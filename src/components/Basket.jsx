import { useQuery } from "react-query";
import { getDataBasket, deleteBasket } from "../api";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { useEffect } from "react";
import { purchasedProduct } from "../api";
import { useParams } from "react-router-dom";

const ElementBasket = ({ productBasket, updateTotalPrice }) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);



  const formDataToJson = (formData) => Object.fromEntries(formData);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJson(formData);
    console.log(data)
    mutationBasketProduct.mutate(data)
  };



  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  

  const queryClient = useQueryClient();

  const deleteBasketId = () => deleteBasket(productBasket);
  const productPurchased = (data) => purchasedProduct(productBasket , data);

  const mutation = useMutation(deleteBasketId, {
    onSuccess: () => {
      queryClient.refetchQueries("productBasket");
      updateTotalPrice();
    },
  });

  const mutationBasketProduct = useMutation(productPurchased, {
    onSuccess: () => {
      closeForm()
      queryClient.refetchQueries("productBasket");
    },
  });

  return (
    <div className="basket">
      <h3>{productBasket.product.name}</h3>
      <img src={productBasket.product.image} />
      <p>{productBasket.product.price} руб</p>
      <p>{productBasket.size.size} </p>
      <p>{productBasket.color.color}</p>

      <div className={productBasket.purchased ? "purchased" : "not-purchased"}>
        <h3>{productBasket.purchased ? "Товар на рассмотрении у администратора" : "Не оформлен"}</h3>
      </div>
      {isFormOpen && (
        <div className="purchase-form">
          <h3>Введите информацию о покупке</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <input
              name="address"
                className="fillingForm"
                required
                type="text"
                placeholder="Адрес доставки"
              />
            </div>
            <div>
              {" "}
              <input
              name="phone"
                className="fillingForm"
                required
                type="text"
                placeholder="Номер телефона"
              />
            </div>
<p><i class="fa-solid fa-star"></i>При подтверждении покупку через некоторое время <br /> админ свяжется с вами для подтверждения заказа товара</p>
            <button className="fillingFormButton" onClick={closeForm}>
              Отмена
            </button>
            <button className="fillingFormButton">
             Подтвердить покупку
            </button>
          </form>
        </div>
      )}
       {!productBasket.purchased && <button onClick={mutation.mutate} className="bay">
        <i class="fa-solid fa-xmark"></i>
      </button>}
      {!productBasket.purchased &&  <button onClick={openForm} className="bay3">
        Оформить покупку
      </button>}
    </div>
  );
};

export const Basket = () => {
  const query = useQuery("productBasket", getDataBasket);
  const [totalPrice, setTotalPrice] = useState(0);
  const updateTotalPrice = () => {
    const total = (query.data || []).reduce(
      (acc, product) => parseInt(acc) + parseInt(product.product.price),
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [query.data]);

  return (
    <div className="basketContainer">
      <div className="title">
        <h1>Корзина</h1>
        <p className="totalPrise">
          Общая сумма: <span>{totalPrice} руб</span>
        </p>
      </div>
      <div className="containerProducts">
        {(query.data || []).map((productBasket) => (
          <ElementBasket key={productBasket.id} productBasket={productBasket} />
        ))}
      </div>
      <div />
    </div>
  );
};
