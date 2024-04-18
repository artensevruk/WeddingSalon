import { NavLink } from "react-router-dom";
import React from 'react';

export const Registration = () =>{


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    fetch('http://localhost:8081/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
      .then(result => console.log(result))
      .catch(error => console.error(error));
      console.log(data)
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
        <input type="password" name="password" placeholder="ВВЕДИТЕ ПОРОЛЬ"></input>
        </div>
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