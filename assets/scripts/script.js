// OPENWEATHER API
const apiKey = "4de26a78b67a4d05fdaf94a17d38a2e8";
const weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?";
const forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const units = "&units=metric";

// INITIAL ELEMENTS
var cities = JSON.parse(localStorage.getItem("cities")) || [];

// const mainContent = document.querySelector("main");
const searchForm = document.querySelector("#search");
const searchBar = document.querySelector("#search-bar");
searchBar.setAttribute("placeholder", "Sydney, AU");
const resultsList = document.querySelector("#results-list");
const cityDashboard = document.querySelector("#city-forecast");
const weeklyForecast = document.querySelector("#weekly-forecast");

var city = searchBar.value.trim();

// SEARCH HANDLER
function searchHandler(event){
    event.preventDefault();
    var city = searchBar.value.trim();
    
    if (city) {
        getWeather(city);
        getForecast(city);
        cities.unshift(city);
        if (cities.length > 10) {
            cities.pop();
        }

        searchBar.value="";       
    }

    // console.log(cities);
    saveSearch();
    searchHistory();
   
}

// DEFAULT WEATHER ON STARTUP IN SYDNEY, AU

function defaultWeather() {
    var defaultQuery= weatherQueryURL+"Sydney, AU"+units+"&appid="+apiKey;

  fetch(defaultQuery)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

         cityDashboard.innerHTML="";

         // Creating Current City Forecast
         var cityName= document.createElement("h2");
         cityName.setAttribute("class", "city");
         cityName.textContent=data.name+"\xA0";

         var currentDate= document.createElement("span");
         currentDate.setAttribute("class", "date");
         cityName.appendChild(currentDate);
         currentDate.textContent=moment(data.dt*1000).format("DD/MM/YYYY")+"\xA0";

         var currentIcon= document.createElement("img");
         currentIcon.setAttribute("class", "weatherIcon");
         currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");
         currentIcon.setAttribute("alt", data.weather[0].main);
         currentDate.append(currentIcon);


         var temperature= document.createElement("p");
         temperature.setAttribute("class","temp");
         temperature.textContent="Temp:\xA0"+data.main.temp+"\xB0C";

         var wind= document.createElement("p");
         wind.setAttribute("class","wind");
         wind.textContent="Wind:\xA0"+data.wind.speed+"KM/H";

         var humidity= document.createElement("p");
         humidity.setAttribute("class", "humidity");
         humidity.textContent="Humidity:\xA0"+data.main.humidity+"%";

         cityDashboard.append(cityName, temperature, wind, humidity);

         var uvQuery= uvQueryURL + "lat=" + data.coord.lat + "&lon="
         + data.coord.lon + "&appid=" + apiKey;
         
         fetch(uvQuery)
          .then(function(response){
           return response.json();
           })
          .then(function(data){
            var uv= document.createElement("p");
            uv.setAttribute("class", "uv");
            uv.textContent="UV Index:\xA0";

            var uvColor = document.createElement("span");
            const uvIndex=data.value;
            cityDashboard.append(uv);
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

          });
         
    });

}

// GET WEATHER ON SEARCHED CITY
function getWeather(city) {
    var currentQuery= weatherQueryURL+city+units+"&appid="+apiKey;

  fetch(currentQuery)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data);
         cityDashboard.innerHTML="";

         // Creating Current City Forecast
         var cityName= document.createElement("h2");
         cityName.setAttribute("class", "city");
         cityName.textContent=data.name+"\xA0";

         var currentDate= document.createElement("span");
         currentDate.setAttribute("class", "date");
         cityName.appendChild(currentDate);
         currentDate.textContent=moment(data.dt*1000).format("DD/MM/YYYY")+"\xA0";

         var currentIcon= document.createElement("img");
         currentIcon.setAttribute("class", "weatherIcon");
         currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");
         currentIcon.setAttribute("alt", data.weather[0].main);
         currentDate.append(currentIcon);


         var temperature= document.createElement("p");
         temperature.setAttribute("class","temp");
         temperature.textContent="Temp:\xA0"+data.main.temp+"\xB0C";

         var wind= document.createElement("p");
         wind.setAttribute("class","wind");
         wind.textContent="Wind:\xA0"+data.wind.speed+"KM/H";

         var humidity= document.createElement("p");
         humidity.setAttribute("class", "humidity");
         humidity.textContent="Humidity:\xA0"+data.main.humidity+"%";

         cityDashboard.append(cityName, temperature, wind, humidity);

         var uvQuery= uvQueryURL + "lat=" + data.coord.lat + "&lon="
         + data.coord.lon + "&appid=" + apiKey;
         
         fetch(uvQuery)
          .then(function(response){
           return response.json();
           })
          .then(function(data){
            var uv= document.createElement("p");
            uv.setAttribute("class", "uv");
            uv.textContent="UV Index:\xA0";

            var uvColor = document.createElement("span");
            const uvIndex=data.value;
            cityDashboard.append(uv);
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

          });
         
    });

}

// GET DEFAULT WEEKLY FORECAST
function defaultForecast() {

    var forecastQuery= forecastQueryURL+"Sydney, AU"+units+"&appid="+apiKey;

    fetch(forecastQuery)
     .then(function(response){
        return response.json()
        ;
     })
      .then(function(data){
        //   console.log(data);

          for (let i = 0; i < 5; i++) {

            var dayIndex= i*8;

            var day = document.createElement("article");
            
            var forecastDate = document.createElement("p");
            forecastDate.setAttribute("class", "date");
            var forecastDateEpoch=data.list[dayIndex].dt;
            forecastDate.textContent=moment(forecastDateEpoch*1000).format("DD/MM/YYYY")+"\xA0";


            var forecastIcon = document.createElement("img");
            forecastIcon.setAttribute("class", "icon");
            forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/"+data.list[dayIndex].weather[0].icon+".png");
            forecastIcon.setAttribute("alt", data.list[dayIndex].weather[0].main);


            var forecastTemp = document.createElement("p");
            forecastTemp.setAttribute("class", "temp");
            forecastTemp.textContent="Temp:\xA0"+data.list[dayIndex].main.temp+"\xB0C";

            var forecastWind = document.createElement("p");
            forecastWind.setAttribute("class", "wind");
            forecastWind.textContent="Wind:\xA0"+data.list[dayIndex].wind.speed+"KM/H";


            var forecastHumidity = document.createElement("p");
            forecastHumidity.setAttribute("class", "humidity");
            forecastHumidity.textContent="Humidity:\xA0"+data.list[dayIndex].main.humidity+"%";

            
            weeklyForecast.appendChild(day);   
            day.append(forecastDate, forecastIcon, forecastTemp, forecastWind, forecastHumidity);           
          }
          
      });
}

// GET CITY WEEKLY FORECAST
function getForecast(city) {

    var forecastQuery= forecastQueryURL+city+units+"&appid="+apiKey;

    fetch(forecastQuery)
     .then(function(response){
        return response.json()
        ;
     })
      .then(function(data){

        //   console.log(data);
          weeklyForecast.innerHTML="";

          for (let i = 0; i < 5; i++) {

            var dayIndex= i*8;

            var day = document.createElement("article");
            
            var forecastDate = document.createElement("p");
            forecastDate.setAttribute("class", "date");
            var forecastDateEpoch=data.list[dayIndex].dt;
            forecastDate.textContent=moment(forecastDateEpoch*1000).format("DD/MM/YYYY")+"\xA0";


            var forecastIcon = document.createElement("img");
            forecastIcon.setAttribute("class", "icon");
            forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/"+data.list[dayIndex].weather[0].icon+".png");
            forecastIcon.setAttribute("alt", data.list[dayIndex].weather[0].main);


            var forecastTemp = document.createElement("p");
            forecastTemp.setAttribute("class", "temp");
            forecastTemp.textContent="Temp:\xA0"+data.list[dayIndex].main.temp+"\xB0C";

            var forecastWind = document.createElement("p");
            forecastWind.setAttribute("class", "wind");
            forecastWind.textContent="Wind:\xA0"+data.list[dayIndex].wind.speed+"KM/H";


            var forecastHumidity = document.createElement("p");
            forecastHumidity.setAttribute("class", "humidity");
            forecastHumidity.textContent="Humidity:\xA0"+data.list[dayIndex].main.humidity+"%";

            
            weeklyForecast.appendChild(day);   
            day.append(forecastDate, forecastIcon, forecastTemp, forecastWind, forecastHumidity);           
          }
          
      });
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
        cityButtons.setAttribute("data-value", cities[i]);
        cityButtons.textContent= cities[i];
        }
      
}

searchHistory();
defaultWeather();
defaultForecast();

// EVENT LISTENER
searchForm.addEventListener('submit', searchHandler);
document.querySelector("#results-list").addEventListener('click', function(event){
    event.preventDefault();
    city= event.target.getAttribute('data-value');
    getWeather(city);
    getForecast(city);
});



