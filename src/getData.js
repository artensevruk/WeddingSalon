export const getData = async () =>{
  const response  = await fetch('http://localhost:8081/clients')
  return response.json()
 }