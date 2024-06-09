

export const Select = ({onChange , items , name}) => {

return(
  <select className="select" onChange={(e) => onChange(e.target.value)}>
  {items.map((element) => (
    <option key={element.id} value={element.id}>
      {element[name]}
    </option>
  ))}
</select>
)

}