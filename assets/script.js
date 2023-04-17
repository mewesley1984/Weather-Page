var searchFormEl=document.getElementById("city-search")
var searchBtnEl=document.getElementById("search-button")
var currentCityEl=document.getElementById("current-weather-city")
var currentTempEl=document.getElementById("current-weather-temp")
var currentWindEl=document.getElementById("current-weather-wind")
var currentHumidityEl=document.getElementById("current-weather-humidity")
var forecastEl = document.getElementById("forecast")
var savedCitiesEl= document.getElementById("saved-cities")


displaySavedCities(JSON.parse(localStorage.getItem('saved-cities') || "[]")) 

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
        return data
    })
}

function getAndSaveWeather(city) {
    var apiKey=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7a86c802b697310f6f3bd72dc88c3de5&units=imperial`

    fetch(apiKey)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            displayCurrent(data)
            displayForecast(data)
            return data
        })
        .then(data => {
            var fromstorage = localStorage.getItem('saved-cities') || "[]"
            var savedCities = JSON.parse(fromstorage)
            savedCities.push(data.city.name)
            localStorage.setItem('saved-cities', JSON.stringify(savedCities))
            return savedCities
        })
        .then(cities => {
            displaySavedCities(cities)
        })
}

function displaySavedCities(cities) {

    //const myArr = ['milwaukee', 'green bay']

    var buttons = cities.map((item) =>
        `<p><button onclick="getWeather('${item}')">${item}</button></p>`
    )

// ['<button></button>', '<button></button>']

// '<button></button><button></button>'

   savedCitiesEl.innerHTML = buttons.join('')
}

function displayForecast(data){

    //for(VARIABLE; CONDITION; AFTER)
    forecastEl.innerHTML = '<h1>5-Day Forecast:</h1>'
    
    for (var i=7; i <= 40; i += 8) {
        var day = data.list[i]
        var formattedDate = new Date(day.dt_txt).toLocaleDateString()
        var weather = day.weather?.[0].description
        var dayForecastHtml = `
        <div>
            <h2 class="date">${formattedDate}</h2>
            <p>${weather}</p> 
            <label>Temp:</label> <h4 class="temp">${day.main.temp}℉</h4>
            <label>Wind:</label> <h4 class="wind">${day.wind.speed} MPH</h4>
            <label>Humidity:</label> <h4 class="humidity">${day.main.humidity}%</h4>
        </div>
        `
        forecastEl.innerHTML += dayForecastHtml
    }

}

function displayCurrent(data){
    if(!data) {return}

    var weather = data.list[0]
    var date = new Date().toLocaleDateString()
    currentCityEl.textContent= data.city.name + ": " + date
    currentTempEl.textContent="Current Temperature: "  +  weather.main.temp + "℉" 
    currentWindEl.textContent="Wind Speed: " +  weather.wind.speed + " MPH"
    currentHumidityEl.textContent="Humidity: "  +  weather.main.humidity + "%"

}

function searchResult(event) {
    event.preventDefault();
    console.log (searchFormEl.value)
    getAndSaveWeather(searchFormEl.value)
}


searchBtnEl.addEventListener('click',searchResult)





