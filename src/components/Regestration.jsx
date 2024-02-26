export const Registration = () =>{
  return (
   
      <div className="registration">
        <h1>РЕГИСТРАЦИЯ</h1>
      <form>
        <div className="bloc">
        <input type="text" placeholder="ВВЕДИТЕ ИМЯ"></input>
        </div>
        <div className="bloc">
        <input type="text" placeholder="ВВЕДИТЕ ФАМИЛИЮ"></input>
        </div>
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