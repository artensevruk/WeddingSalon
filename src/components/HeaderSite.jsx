import { NavLink } from "react-router-dom";
import { user } from "../api";
import { useQuery } from "react-query";
import { isUserAuth } from "../utils";
import { useState } from "react";

export const HeaderSite = () => {
  const query = useQuery("user", user, { enabled: isUserAuth() });
  const { data: userData } = useQuery("user", user);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="logo">
      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/home">
            <i className="basket2 fa-solid fa-house"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog">
            <i className="basket2 fa-solid fa-bag-shopping"></i>
          </NavLink>
        </li>
        <li>
          {userData?.isAdmin && (
            <NavLink to="/adminPanel">
              <i className="basket2 fa-solid fa-clipboard"></i>
            </NavLink>
          )}
        </li>
        <li>
          {!userData?.isAdmin &&
            (query.data ? (
              <NavLink to="/basket">
                <i className="basket2 fa-solid fa-basket-shopping"></i>
              </NavLink>
            ) : null)}
        </li>

        <li>
          {query.data ? (
            query.data.name
          ) : (
            <NavLink to="/entrance">
              <i className="basket2 fa-solid fa-user" />
            </NavLink>
          )}
        </li>
        <li>
          {query.data ? (
            <button className="goOut" onClick={handleLogout}>
              Выход
            </button>
          ) : null}
        </li>
      </ul>
      {/* Бургер-меню для планшетов */}
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </div>
  );
};