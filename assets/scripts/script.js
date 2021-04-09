// OPENWEATHER API
const apiKey = "4de26a78b67a4d05fdaf94a17d38a2e8";
const query = "api.openweathermap.org/data/2.5/weather?q=";
var units = "units=metric";
var cityName="Sydney, AU";


// INITIAL ELEMENTS
var cities = JSON.parse(localStorage.getItem("cities")) || [];

const mainContent = document.querySelector("main");
var searchForm = document.querySelector("#search");
const searchBar = document.querySelector("#search-bar");
searchBar.setAttribute("placeholder", "Sydney, AU");
const resultsList = document.querySelector("#results-list");

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
        // getWeather(city);
        // getweeklyForecast(city);
        cities.push(city);
        searchBar.value="";       
    }

    console.log(cities);
    saveSearch();
    searchHistory();
   
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
        
        cityButtons.textContent= savedCities[i];

        }
        console.log(savedCities);
}

    searchHistory();


// EVENT LISTENER
searchForm.addEventListener('submit', searchHandler);



