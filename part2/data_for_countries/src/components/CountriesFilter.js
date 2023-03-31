const CountriesFilter = ({newFilter, onChange})=>{
    return(
      <div>find countries<input value={newFilter} onChange={onChange} /></div>
    )
  }

export default CountriesFilter