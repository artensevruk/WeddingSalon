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
            <p>+3753389342</p>
          </div>
          </div>
        </li>
        <li>
        <div className="information">
        <i class="calendar fa-solid fa-calendar-days"></i>
            <div className="inf">
              <p>Ул. Советская 32</p>
              <p>Ул. Ленина кв. 12</p>
            </div>
          </div>
        </li>
        <li>
          <i class="basket fa-solid fa-basket-shopping"></i>
        </li>
      </ul>
    </div>
  );
};
