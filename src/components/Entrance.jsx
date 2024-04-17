import { NavLink } from "react-router-dom";

export const Entrance = () => {
  return (
    <div className="entrance">
      <h1>Вход</h1>
      <form>
        <div className="bloc">
          <input type="email" placeholder="ВВЕДИТЕ EMAIL"></input>
        </div>
        <div className="bloc">
          <input type="password" placeholder="ВВЕДИТЕ ПОРОЛЬ"></input>
        </div>
        <NavLink to="/registration">
          <p className="entranceToRegestration">
            Вы ещё не зарегистрировались ?
          </p>
        </NavLink>
        <div className="bloc">
          <button>ОТПРАВИТЬ</button>
        </div>
      </form>
    </div>
  );
};
