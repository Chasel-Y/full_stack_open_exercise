const Weather = ({filteredCountries,choosedWeather})=>{
    if(choosedWeather && filteredCountries && filteredCountries.length===1){
    const iconSrc = `https://openweathermap.org/img/wn/${choosedWeather.weather[0].icon}@2x.png`
    const temperature = choosedWeather.main.temp-273.15
    return(
      <div>
        <h2>Weather in {filteredCountries[0].capital}</h2>
        <p>temperature {temperature.toFixed(2)} Celcius</p>
        <img src={iconSrc} alt="Weather icon"></img>
        <p>wind {choosedWeather.wind.speed} m/s</p>
      </div>
    )
    }
}

export default Weather