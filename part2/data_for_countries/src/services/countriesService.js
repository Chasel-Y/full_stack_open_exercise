import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/'
const weatherUrl='https://api.openweathermap.org/data/2.5/weather?'
const capitalLocationUrl='http://api.openweathermap.org/geo/1.0/direct?'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCapitalLocation = (capitalName, countryCode) =>{
    const api_key = process.env.REACT_APP_API_KEY
    const request = axios.get(`${capitalLocationUrl}q=${capitalName},${countryCode}&limit=1&appid=${api_key}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) =>{
   const api_key = process.env.REACT_APP_API_KEY
   const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${api_key}`)
   return request.then(response => response.data)
}

export {getAll, getWeather, getCapitalLocation}