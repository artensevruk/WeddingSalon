import { useQuery } from "react-query";
import { getAdminPurchasedProducts } from "../api"; // Функция для получения купленных товаров из базы данных
import { useMutation , useQueryClient} from "react-query";
import { deleteBasket } from "../api";

export const AdminPanel = () => {
  const { data: purchasedProducts, isLoading } = useQuery(
    "adminPurchasedProducts",
    getAdminPurchasedProducts
  );

  const deleteBasketId = (product) => deleteBasket(product);
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteBasketId, {
    onSuccess: () => {
      queryClient.refetchQueries("adminPurchasedProducts");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="adminPanel">
      <h1>Заказы</h1>
      <h2>Купленные товары:</h2>
      <table className="adminTable">
        <thead>
          <tr className="tableAdmin">
            <th>Имя покупателя</th>
            <th>Товар</th>
            <th>Размер</th>
            <th>Цвет</th>
            <th>Цена</th>
            <th>Почта</th>
            <th>Адрес</th>
            <th>Телефон</th>
          </tr>
        </thead>
        <tbody>
          {purchasedProducts.map((product) => (
            <tr className="tableAdmin2" key={product.id}>
              <td>{product.user.name}</td>
              <td>{product.product.name}</td>
              <td>{product.size.size}</td>
              <td>{product.color.color}</td>
              <td>{product.product.price}</td>
              <td>{product.user.email}</td>
              <td>{product.address}</td>
              <td>{product.phone}</td>
              <td>
                <button onClick={() => mutation.mutate(product)} className="bay">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
