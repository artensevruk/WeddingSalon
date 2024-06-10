

export const Select = ({onChange , items , name , displayKey , value = items[0]}) => {
console.log(name)
console.log(value)
return(
  <select value={value}   className="select" name= {name} onChange={(e) => onChange(e.target.value)}>
  {items.map((element) => (
    <option key={element.id} value={element.id}>
      {element[displayKey]}
    </option>
  ))}
</select>
)

}