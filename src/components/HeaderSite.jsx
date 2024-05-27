import { NavLink } from "react-router-dom";
import { user } from "../api";
import { useState , useQuery } from "react-query";

export const HeaderSite = () => {
  const query = useQuery("user", user);
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
          <div className="information">
            <i class="local fa-solid fa-location-dot"></i>
            <div className="inf">
              <p>Ул. Советская 32</p>
            </div>
          </div>
        </li>
        <li>
        <div className="information">
          <i class="phone fa-solid fa-phone"></i>
          <div className="inf">
            <p>+3752945673</p>
          </div>
          </div>
        </li>
        <li>
        <div className="information">
        <i class="calendar fa-solid fa-calendar-days"></i>
            <div className="inf">
              <p>с 10.00 - 21.00 </p>
            </div>
          </div>
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