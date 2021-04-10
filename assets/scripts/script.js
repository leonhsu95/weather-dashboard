// OPENWEATHER API
const apiKey = "4de26a78b67a4d05fdaf94a17d38a2e8";
const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
// var cityName="Sydney, AU";
var units = "&units=metric";



// INITIAL ELEMENTS
var cities = JSON.parse(localStorage.getItem("cities")) || [];

const mainContent = document.querySelector("main");
const searchForm = document.querySelector("#search");
const searchBar = document.querySelector("#search-bar");
searchBar.setAttribute("placeholder", "Sydney, AU");
const resultsList = document.querySelector("#results-list");
const cityDashboard = document.querySelector("#city-forecast")

var city = searchBar.value.trim();

// CREATING DYNAMIC ELEMENTS

var weeklyForecastSection = document.createElement("section");
weeklyForecastSection.setAttribute("id","weekly-forecast");
mainContent.appendChild(weeklyForecastSection);

var forecastDaysEl = document.createElement("article");
forecastDaysEl.setAttribute("class", "forecast");
//weeklyForecastSection.appendChild(forecastDaysEl);


// SEARCH HANDLER
function searchHandler(event){
    event.preventDefault();
    var city = searchBar.value.trim();
    
    if (city) {
        getWeather(city);
        // getweeklyForecast(city);
        cities.unshift(city);
        if (cities.length > 10) {
            cities.pop();
        }

        searchBar.value="";       
    }

    console.log(cities);
    saveSearch();
    searchHistory();
   
}

// function buttonHandler(event){
//     event.preventDefault();
//     var city = this.value;
    
//     if (city) {
//         getWeather(city);
//         // getweeklyForecast(city);      
//     }
   
// }


function getWeather(city) {
    var query= queryURL+city+units+"&appid="+apiKey;

  fetch(query)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
         cityDashboard.innerHTML="";

         // Creating Current City Forecast
         var cityName= document.createElement("h2");
         cityName.setAttribute("class", "city");
         cityName.textContent=data.name+"\xA0";
         var currentDate= document.createElement("span");
         cityName.appendChild(currentDate);
         console.log(data.dt);
         currentDate.textContent=moment(data.dt*1000).format("DD/MM/YYYY");

         var temperature= document.createElement("p");
         temperature.setAttribute("class","temp");
         temperature.textContent="Temp:\xA0"+data.main.temp+"\xB0C";

         var wind= document.createElement("p");
         wind.setAttribute("class","wind");
         wind.textContent="Wind:\xA0"+data.wind.speed+"KM/H";

         var humidity= document.createElement("p");
         humidity.setAttribute("class", "humidity");
         humidity.textContent="Humidity:\xA0"+data.main.humidity;

         cityDashboard.append(cityName, temperature, wind, humidity);

         var uvQueryURL= "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon="
         + data.coord.lon + "&appid=" + apiKey;
         
         fetch(uvQueryURL)
          .then(function(response){
           return response.json();
           })
          .then(function(data){
            console.log(data);
            var uv= document.createElement("p");
            uv.setAttribute("class", "uv");
            uv.textContent="UV Index:\xA0";

            var uvColor = document.createElement("span");
            const uvIndex=data.value;
            cityDashboard.append(uv)
            uv.append(uvColor);
            uvColor.textContent=uvIndex;
            
            if (uvIndex<3) {
                uvColor.setAttribute("class", "uv-color green");
            }

            if (uvIndex >=3 && uvIndex <6) {
                uvColor.setAttribute("class", "uv-color orange");
            }

            if (uvIndex >=6) {
                uvColor.setAttribute("class", "uv-color red");
            }

          })
         
    })

}

// SAVE SEARCH HISTORY

function saveSearch(){
    localStorage.setItem("cities",JSON.stringify(cities));
}


// SEARCH HISTORY
function searchHistory() {
 
        resultsList.innerHTML="";

        for (let i = 0; i < cities.length; i++) {         
        
        var searchResultsEl = document.createElement("li");
        searchResultsEl.setAttribute("class", "results-city");
        resultsList.appendChild(searchResultsEl);
        
        var cityButtons = document.createElement("button");
        searchResultsEl.appendChild(cityButtons);
        cityButtons.setAttribute("class", "results-city");
        cityButtons.setAttribute("type", "submit");
        cityButtons.setAttribute("value", cities[i])
        
        cityButtons.textContent= cities[i];

        }
        console.log(cities);
}

    searchHistory();

// EVENT LISTENER
searchForm.addEventListener('submit', searchHandler);
// document.querySelector(".results-city").addEventListener('click', function(event){
//     event.preventDefault();
//     var city = this.value();
//     getWeather(city);
// });



