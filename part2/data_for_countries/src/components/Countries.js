const Countries = ({filteredCountries, chooseCountry})=>{
    if(filteredCountries.length>10){
      return(
        <div style={{ display: "flex", alignItems: "center" }}>
        <p>Too many matched, specify another filter</p>
      </div>
      )
    } else if(filteredCountries && filteredCountries.length===1) {
      return(
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>capital: {filteredCountries[0].capital}</p>
          <p>area: {filteredCountries[0].area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(filteredCountries[0].languages).map(language=><li key={language} >{language}</li>)}
          </ul>
          <span style={{fontSize: 200, marginTop: 0}}>{filteredCountries[0].flag}</span>
        </div>
      )
    } else {
      return(
        filteredCountries
          .map(country=>
            <ShowCountry key={country.name.official} country={country} chooseCountry={chooseCountry}/>
          )
      )
    }
  }
  
  const ShowCountry = ({country, chooseCountry}) =>{
    return(
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{country.name.common}</p>
        <button style={{ margin: '0 0 0 10px' }} onClick={()=>chooseCountry(country)}>show</button>
      </div>
    )
  }

  export default Countries