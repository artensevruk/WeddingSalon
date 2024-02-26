export const Entrance = () =>{
  return(
    <div className="entrance">
    <h1>Вход</h1>
  <form>
    <div className="bloc">
    <input type="email" placeholder="ВВЕДИТЕ EMAIL" ></input>
    </div>
    <div className="bloc">
    <input type="password" placeholder="ВВЕДИТЕ ПОРОЛЬ"></input>
    </div>
    <div className="bloc">
      <button>ОТПРАВИТЬ</button>
    </div>
  </form>
  </div>
  )
}