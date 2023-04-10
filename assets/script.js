var searchFormEl=document.getElementById("city-search")
var searchBtnEl=document.getElementById("search-button")


function weatherForecast(city) {
    
    var apiKey=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7a86c802b697310f6f3bd72dc88c3de5&units=imperial`

fetch(apiKey)
.then(function(response){
    return response.json();
})
.then(function (data) {
    console.log(data)
    console.log(data.list[0].main.temp)
        
})

}
function searchResult(event) {
    event.preventDefault();

console.log (searchFormEl.value)
weatherForecast(searchFormEl.value)
}


searchBtnEl.addEventListener('click',searchResult)