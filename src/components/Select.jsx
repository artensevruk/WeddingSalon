

export const Select = ({items , name , displayKey , value}) => {
return(
  <select defaultValue={value}   className="select" name= {name} >
  {items.map((element) => (
    <option key={element.id} value={element.id}>
      {element[displayKey]}
    </option>
  ))}
</select>
)

}