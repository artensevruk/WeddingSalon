export const getData = async () => {
  return fetchData("product" , "GET");
};

export const getDataBasket = async () => {
  return fetchData("cartProduct" , "GET");
};

export const addBasket = (product) => {
  return fetchData("carts" , "POST" , product);
};

export const deleteBasket = (productBasket) => {
  return fetchData(`cartProduct/${productBasket.id}` , "DELETE");
};

export const entranceData = async (data) => {
  const result =  await fetchData(`entrance` , "POST" , data)
  localStorage.setItem("jwtToken", result.token);
  console.log("Вы успешно зарегестрировались!") 
};

export const regestrationData = (data) => {
  return fetchData("registration" , "POST" , data);
};

function fetchData(url, method, data) {
  const apiUrl = `http://localhost:8081/${url}`;

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }
  const reqWithJwt = addJwtToRequest(options);
  return fetch(apiUrl, reqWithJwt)
    .then((response) => {
      if(response.status == 201){ //Created  - 201
        return null
      }
      if(response.status == 204){ //NO content - 204
        return null
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

function addJwtToRequest(req) {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return req;
}
