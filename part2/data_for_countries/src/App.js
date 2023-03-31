import { useState, useEffect } from 'react'
import * as countriesService from "./services/countriesService"
import CountriesFilter from "./components/CountriesFilter"
import Countries from "./components/Countries"
import Weather from "./components/Weather"

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filteredCountries, setFilteredCountries] =useState([])
  const [newFilter, setNewFilter] = useState('')
  const [choosedWeather, setChoosedWeather] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(countriesData => {
        setCountries(countriesData)
        setFilteredCountries(countriesData)
      })
  }, [])

  useEffect(() => {
    const countriesAfterFilter = countries.filter(country=>country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    setFilteredCountries([...countriesAfterFilter])
  }, [newFilter, countries])

  useEffect(() => {
    if(filteredCountries.length===1){
      countriesService
      .getCapitalLocation(filteredCountries[0].capital,filteredCountries[0].cca2)
      .then(capitalData=>{
        countriesService
        .getWeather(capitalData[0].lat,capitalData[0].lon)
        .then(weatherData => {
          setChoosedWeather(weatherData)
        })
      })
    }
  }, [filteredCountries])

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  const chooseCountry = (country) =>{
    setNewFilter(country.name.common)
  }

  return(
    <div>
    <CountriesFilter newFilter={newFilter} onChange={handleFilterChange}/>
    <Countries filteredCountries={filteredCountries} chooseCountry={chooseCountry}/>
    <Weather filteredCountries={filteredCountries} choosedWeather={choosedWeather}/>
    </div>
  )
}
export default App;