import { NavLink } from "react-router-dom";
export const HeaderSite = () => {
  return (
    <div className="logo">
      <ul className="menu">
        <li>
          <div className="information">
            <i class="local fa-solid fa-location-dot"></i>
            <div className="inf">
              <p>Ул. Советская 32</p>
              <p>Ул. Ленина кв. 12</p>
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
              <p>Пн-пт с 10.00 - 21.00 </p>
            </div>
          </div>
        </li>
        <li>
          <i class="basket fa-solid fa-basket-shopping"></i>
        </li>
        <li>
        <NavLink to = "/registration" ><i className="fa-solid fa-user" /></NavLink>
        </li>
      </ul>
    </div>
  );
};
