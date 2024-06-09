import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import { regestrationData } from "../api";


export const Registration = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      email: formData.get('email'),
      password: formData.get('password')
    };
    
    // Валидация пароля
    if (password.length < 10) {
      setPasswordError("Пароль должен содержать не менее 10 символов");
      return;
    } else if (password !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    } else {
      setPasswordError("");
    }

    regestrationData(data)
    
  };


  return (
      <div className="registration">
        <h1>РЕГИСТРАЦИЯ</h1>
      <form onSubmit={handleSubmit}>
        <div className="bloc">
        <input type="text" name="name" placeholder="ВВЕДИТЕ ИМЯ"></input>
        </div>
        <div className="bloc">
        <input type="text" name="surname" placeholder="ВВЕДИТЕ ФАМИЛИЮ"></input>
        </div>
        <div className="bloc">
        <input type="email"  name="email"  placeholder="ВВЕДИТЕ EMAIL" ></input>
        </div>
        <div className="bloc">
        <input type="password" name="password" placeholder="ВВЕДИТЕ ПАРОЛЬ" onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className="bloc">
        <input type="password" name="confirmPassword" placeholder="ПОДТВЕРДИТЕ ПАРОЛЬ" onChange={(e) => setConfirmPassword(e.target.value)}></input>
        </div>
        {passwordError && <p style={{color: "red"}}>{passwordError}</p>}
        <NavLink to="/entrance">
      <p className="entranceToRegestration">
            Вы уже зарегистрировались ?
          </p>
      </NavLink>
        <div className="bloc">
          <button type="submit">ОТПРАВИТЬ</button>
        </div>
      </form>
      </div>
    
  )
}