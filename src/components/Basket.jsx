import { useQuery } from "react-query";
import { getDataBasket, deleteBasket } from "../api";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { useEffect } from "react";
import { purchasedProduct } from "../api";
import { useParams } from "react-router-dom";

const ElementBasket = ({ productBasket, updateTotalPrice }) => {
  const params = useParams();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const generateReceipt = () => {
    const currentDate = new Date().toLocaleDateString();
    const customerName = document.querySelector('input[placeholder="Ваше имя"]').value;
    const deliveryAddress = document.querySelector('input[placeholder="Адрес доставки"]').value;
    const phoneNumber = document.querySelector('input[placeholder="Номер телефона"]').value;
  
    const receiptContent = `Чек:\nНазвание: ${productBasket.product.name}\nЦена: ${productBasket.product.price} руб\nДата: ${currentDate}\nИмя покупателя: ${customerName}\nАдрес доставки: ${deliveryAddress}\nНомер телефона: ${phoneNumber}`;
  
    // Создание и скачивание файла
    const element = document.createElement("a");
    const file = new Blob([receiptContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "receipt.txt";
    document.body.appendChild(element);
    element.click();
  
    setIsPurchased(true);
  };

  const queryClient = useQueryClient();

  const deleteBasketId = () => deleteBasket(productBasket);
const productPurchased = () => purchasedProduct(productBasket)

  const mutation = useMutation(deleteBasketId, {
    onSuccess: () => {
      queryClient.refetchQueries("productBasket");
      updateTotalPrice();
    },
  });

  const mutationBasketProduct = useMutation(productPurchased, {
    onSuccess: () => {
      queryClient.refetchQueries(["productBasket" , params]);
    },
  });

  return (
    <div className="basket">
      <h3>{productBasket.product.name}</h3>
      <img src={productBasket.product.image} />
      <p>{productBasket.product.price} руб</p>
      <p>{productBasket.size.size} </p>
      <p>{productBasket.color.color}</p>
      <div className={isPurchased ? "purchased" : "not-purchased"}>
        <h3>{isPurchased ? "Товар приобретён" : "Не куплен"}</h3>
      </div>
      {isFormOpen && (
        <div className="purchase-form">
          <h3>Введите информацию о покупке</h3>
        <div><input className="fillingForm" type="text" placeholder="Ваше имя" /></div>
        <div><input className="fillingForm" type="text" placeholder="Адрес доставки" /></div>
        <div> <input className="fillingForm"  type="text" placeholder="Номер телефона" /></div>
       
          <button className="fillingFormButton" onClick={closeForm}>Отмена</button>
          <button className="fillingFormButton" onClick={mutationBasketProduct.mutate}>Подтвердить покупку</button>
       
        </div>
      )}
      <button onClick={mutation.mutate} className="bay">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button onClick={openForm} className="bay3">
        Оформить покупку
      </button>
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
