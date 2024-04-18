export const getData = async () =>{
  const response  = await fetch('http://localhost:8081/product')//Поступает запрос от клиента
  return response.json()
 }


 export const getDataBasket = async () =>{
  const response  = await fetch('http://localhost:8081/cartProduct')
  return response.json()
 }

export  const addBasket = (product) => {
  fetch("http://localhost:8081/carts", {
    method: "POST", // Здесь так же могут быть GET, PUT, DELETE
    body: JSON.stringify(product), // Тело запроса в JSON-формате
    headers: {
      // Добавляем необходимые заголовки
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => console.log("Hello"));
};




export const deleteBasket = (productBasket) => {
  return fetch(`http://localhost:8081/cartProduct/${productBasket.id}`, {
    method: "DELETE", // Здесь так же могут быть GET, PUT, DELETE
    headers: {
      // Добавляем необходимые заголовки
      "Content-type": "application/json; charset=UTF-8",
    },
  })
};

export const entranceData = async (data) => {
  try {
    const response = await fetch('http://localhost:8081/entrance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const token = response.json()
    token.then((value) =>{ console.log(value) 
      localStorage.setItem("jwtToken", value.token);
    });
  } catch (error) {
    console.error(error);
  }
}

  export const regestrationData = (data) =>{
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
}

