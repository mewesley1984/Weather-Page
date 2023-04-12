var searchFormEl=document.getElementById("city-search")
var searchBtnEl=document.getElementById("search-button")
var currentCityEl=document.getElementById("current-weather-city")
var currentTempEl=document.getElementById("current-weather-temp")
var currentWindEl=document.getElementById("current-weather-wind")
var currentHumidityEl=document.getElementById("current-weather-humidity")

function weatherForecast(city) {
    
    var apiKey=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7a86c802b697310f6f3bd72dc88c3de5&units=imperial`

fetch(apiKey)
.then(function(response){
    return response.json();
})
.then(function (data) {
    console.log(data)
   
    currentCityEl.textContent= data.city.name
    currentTempEl.textContent="Current Temperature:"  +  data.list[0].main.temp 
    currentWindEl.textContent="Wind Speed:" +  data.list[0].wind.speed
    currentHumidityEl.textContent="Humidity:"  +  data.list[0].main.humidity 
})

}
function searchResult(event) {
    event.preventDefault();

console.log (searchFormEl.value)
weatherForecast(searchFormEl.value)
}


searchBtnEl.addEventListener('click',searchResult)