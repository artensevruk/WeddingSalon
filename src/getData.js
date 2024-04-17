export const getData = async () =>{
  const response  = await fetch('http://localhost:8081/product')//Поступает запрос от клиента
  return response.json()
 }

