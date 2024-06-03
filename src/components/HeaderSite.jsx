import { NavLink } from "react-router-dom";
import { user } from "../api";
import { useState , useQuery } from "react-query";
import { isUserAuth } from "../utils";


export const HeaderSite = () => {
  const query = useQuery("user", user , {enabled: isUserAuth() });
  const handleLogout = () => {
    // Удаление jwtToken из localStorage
    localStorage.removeItem("jwtToken");
    // Дополнительные действия, например, перенаправление на страницу входа
    // Обновление страницы
    window.location.reload();
  };
  return (
    <div className="logo">
      <ul className="menu">
        <li><NavLink to = "/home" ><i class="fa-solid fa-house"></i></NavLink></li>
        <li>
              <NavLink to="/catalog">
                {" "}
                <i class="fa-solid fa-cart-plus"></i>
              </NavLink>
            </li>
        <li>
        {
          query.data?  <NavLink to = "/basket" ><i class="basket fa-solid fa-basket-shopping"></i></NavLink> : null
        }
        </li>
        
        <li>
          {
            query.data? query.data.name : <NavLink to = "/entrance" ><i className="fa-solid fa-user" /></NavLink>
          }
        </li>
        <li>
          {
            query.data ? (
              <button className="goOut" onClick={handleLogout}>Выход</button>
            ) : null
          }
        </li>
      </ul>
    </div>
  );
};