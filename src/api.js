export const getData = async (params = {}) => {
  console.log(params);
  const queryParams = {};
  if (params.subCategoryId) {
    queryParams.subCategoryId = params.subCategoryId;
  } else if (params.categoryId) {
    queryParams.categoryId = params.categoryId;
  }

  return fetchData("product?" + new URLSearchParams(queryParams), "GET");
};

export const getDataCategories = async () => {
  return fetchData("categories", "GET");
};

export const getDataBasket = async () => {
  return fetchData("cartProduct", "GET");
};

export const changeProduct = (data) =>{

  return fetchData(`product/${data.id}`, "POST", data);
}

export const getProduct = async (id) =>{
  return fetchData(`product/${id}` , "GET")
}


export const addBasket = (product, sizeId, colorId) => {
  const body = {
    productId: product.id,
    sizeId: sizeId,
    colorId: colorId,
    quantity: 1,
  };
  console.log(body.colorId)

  return fetchData("carts", "POST", body);
};
export const deleteBasket = (productBasket) => {
  return fetchData(`cartProduct/${productBasket.id}`, "DELETE");
};

export const user =async () => {
  const data = await fetchData("currentUser", "GET")
  
  return data
};

export const entranceData = async (data) => {
  const result = await fetchData(`entrance`, "POST", data);
  localStorage.setItem("jwtToken", result.token);
  alert("Вы успешно вошли!");
};

export const regestrationData = (data) => {
  return fetchData("registration", "POST", data);
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
    .then(async (response) => {
      let responseData;
      if (response.status == 201) {
        //Created  - 201
        return null;
      }
      if (response.status == 204) {
        //NO content - 204
        return null;
      }
      if (!response.ok) {
        const result = await response.json();
        if (result.error) {
          alert(result.error);
        } else {
          throw new Error("Network response was not ok");
        }
      }else {
        responseData = await response.json();
      }
      return responseData;
      
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
