var searchFormEl=document.getElementById("city-search")
var searchBtnEl=document.getElementById("search-button")
var currentCityEl=document.getElementById("current-weather-city")
var currentTempEl=document.getElementById("current-weather-temp")
var currentWindEl=document.getElementById("current-weather-wind")
var currentHumidityEl=document.getElementById("current-weather-humidity")

function getWeather(city) {
    
    var apiKey=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7a86c802b697310f6f3bd72dc88c3de5&units=imperial`

fetch(apiKey)
.then(function(response){
    return response.json();
})
.then(function (data) {
    console.log(data)
    displayCurrent(data)
    displayForecast(data)
})

}

function displayForecast(data){

    //for(VARIABLE; CONDITION; AFTER)
    var day = 1
    for (var i=8; i <= 40; i += 8) {
        console.log("Day after >>>", data.list[i].main.temp)
        var currentTempEl = document.getElementById("day"+ day+"temp")
        currentTempEl.textContent = data.list[i].main.temp
        var currentWindEl= document.getElementById("day" + day +"wind") 
        currentWindEl.textContent = data.list[i].wind.speed
        var currentHumidEl = document.getElementById("day"+ day+"humid")
        currentHumidEl.textContent = data.list[i].main.humidity
        day++
    }

}

function displayCurrent(data){
    var weather = data.list[0]
    currentCityEl.textContent= weather.city.name
    currentTempEl.textContent="Current Temperature: "  +  weather.main.temp 
    currentWindEl.textContent="Wind Speed: " +  weather.wind.speed
    currentHumidityEl.textContent="Humidity: "  +  weather.main.humidity 

}

function searchResult(event) {
    event.preventDefault();

console.log (searchFormEl.value)
getWeather(searchFormEl.value)
}


searchBtnEl.addEventListener('click',searchResult)





 //           0       1       2
var arr = ["bob", "sally", "steve", "mary"]
//for(VARIABLE; CONDITION; AFTER)
for(var i = 0; i < arr.length; i++ ){
    console.log(i)
    console.log(arr[i])
}