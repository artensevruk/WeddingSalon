import { useQuery } from "react-query";
import { getAdminPurchasedProducts } from "../api"; // Функция для получения купленных товаров из базы данных

export const AdminPanel = () => {
  const { data: purchasedProducts, isLoading } = useQuery("adminPurchasedProducts", getAdminPurchasedProducts);
console.log(purchasedProducts)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="adminPanel">
      <h1>Панель администратора</h1>
      <h2>Купленные товары:</h2>
      <table className="adminTable">
        <thead>
          <tr>
            <th>Имя покупателя</th>
            <th>Товар</th>
            <th>Размер</th>
            <th>Цвет</th>
            <th>Цена</th>
            <th>Почта</th>
          </tr>
        </thead>
        <tbody>
          {purchasedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.user.name}</td>
              <td>{product.product.name}</td>
              <td>{product.size.size}</td>
              <td>{product.color.color}</td>
              <td>{product.product.price}</td>
              <td>{product.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
