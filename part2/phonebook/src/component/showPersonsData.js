const Persons = ({persons, newFilter, deletePerson})=>{
    return(
      persons
        .filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person=>
          <ShowPerson key={person.id} data={person} deletePerson={deletePerson}/>
        )
    )
  }
  
  const ShowPerson = ({data, deletePerson}) =>{
    return(
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{data.name} {data.number}</p>
        <button style={{ margin: '0 0 0 10px' }} onClick={()=>deletePerson(data.id, data.name)}>delete</button>
      </div>
    )
  }

  export default Persons