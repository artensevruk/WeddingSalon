export const getDataUser = async () =>{
  const response  = await fetch('http://localhost:8081/registration')
  return response.json()
 }