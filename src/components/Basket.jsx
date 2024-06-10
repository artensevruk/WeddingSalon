import { useQuery } from "react-query";
import { getDataBasket, deleteBasket } from "../api";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { useEffect } from "react";
const ElementBasket = ({ productBasket , updateTotalPrice }) => {
  const [isPurchased, setIsPurchased] = useState(false);

  const generateReceipt = (product) => {
    const receiptContent = `Чек: \nНазвание: ${product.product.name}\nЦена: ${product.product.price} руб\n`;

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

  const mutation = useMutation(deleteBasketId, {
    onSuccess: () => {
      queryClient.refetchQueries("productBasket");
      updateTotalPrice();
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
      <button onClick={mutation.mutate} className="bay">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button onClick={() => generateReceipt(productBasket)} className="bay3">
        Купить
      </button>
    </div>
  );
};

export const Basket = () => {
  const query = useQuery("productBasket", getDataBasket);
  const [totalPrice, setTotalPrice] = useState(0);
  const updateTotalPrice = () => {
    const total = (query.data || []).reduce((acc, product) =>  parseInt(acc) +  parseInt(product.product.price), 0);
    console.log("Hello" + typeof total )
    setTotalPrice(total);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [query.data]);

  return (
    <div className="basketContainer">
      <div className="title">
        <h1>Корзина</h1>
        <p className="totalPrise">Общая сумма: <span>{totalPrice} руб</span></p>
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
