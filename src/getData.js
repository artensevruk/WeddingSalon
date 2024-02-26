export const getData = async () =>{
  const response  = await fetch('http://localhost:8081/product')
  return response.json()
 }