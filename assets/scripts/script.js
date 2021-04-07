// OPENWEATHER API
const apiKey = "4de26a78b67a4d05fdaf94a17d38a2e8";
const query = "api.openweathermap.org/data/2.5/weather?q=";
var units = "units=metric";
var cityName="Sydney, AU";


// INITIAL ELEMENTS
const mainContent = document.querySelector("main");
var searchForm = document.querySelector("#search");
const searchBar = document.querySelector("#search-bar");
searchBar.setAttribute("placeholder", cityName);
const resultsList = document.querySelector("#results-list");


// CREATING DYNAMIC ELEMENTS

// resultsList.appendChild(searchResultsEl);


//searchResultsEl.appendChild(cityButtons);

var weeklyForecastSection = document.createElement("section");
weeklyForecastSection.setAttribute("id","weekly-forecast");
mainContent.appendChild(weeklyForecastSection);

var forecastDaysEl = document.createElement("article");
forecastDaysEl.setAttribute("class", "forecast");

//weeklyForecastSection.appendChild(forecastDaysEl);

// SEARCH HISTORY

// function showSearchHistory() {
   
//     var searchHistory = [];

    
   
//     for (let i = 0; i < searchHistory.length; i++) {
        
//         var searchedCity = searchBar.value;

//         var searchResultsEl = document.createElement("li");
//         searchResultsEl.setAttribute("class", "results-city");
//         resultsList.appendChild(searchResultsEl);
        
//         var cityButtons = document.createElement("button");
//         searchResultsEl.appendChild(cityButtons);
//         cityButtons.setAttribute("class", "results-city");
//         cityButtons.setAttribute("id","city"+i+1);
//         cityButtons.textContent= searchedCity;
//         searchHistory.push(searchedCity[i]);
//         console.log(searchHistory);

        
//     }

// }

// EVENT LISTENER
searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    showSearchHistory();
   
});



