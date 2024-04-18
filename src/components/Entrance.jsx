import { NavLink } from "react-router-dom";
import { entranceData } from "../api";


export const Entrance = () => {

  const handleSubmit  = async (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    
    entranceData(data);
    
  };


  return (
    <div className="entrance">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <div className="bloc">
          <input type="email"  name="email"  placeholder="ВВЕДИТЕ EMAIL"></input>
        </div>
        <div className="bloc">
          <input type="password"  name="password" placeholder="ВВЕДИТЕ ПОРОЛЬ"></input>
        </div>
        <NavLink to="/registration">
          <p className="entranceToRegestration">
            Вы ещё не зарегистрировались ?
          </p>
        </NavLink>
        <div className="bloc">
          <button >ОТПРАВИТЬ</button>
        </div>
      </form>
    </div>
  );
};
