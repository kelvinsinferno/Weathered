const apiKey = "058d9811a06090fb1760d402c75df68e";

let place = document.getElementById("location");
let searchBtn = document.getElementById("submit-btn");
let fiveDayForecastEl = document.getElementById("5day-forecast");
let todayUL = document.getElementById("today");
let city = document.getElementById("city");
let date = document.getElementById("date");
let locationList = JSON.parse(localStorage.getItem("locationData")) || [];

//save location search
function renderLocations() {
  for (let i = 0; i < locationList.length; i++) {
    var locationsDisplay = locationList[i];
    console.log(locationsDisplay);

//create a button
    var savedLocationBtn = document.createElement("button");
    savedLocationBtn.textContent = locationsDisplay;

    let pastSearchEl = document.getElementById("past-search");
    pastSearchEl.append(savedLocationBtn);

    savedLocationBtn.setAttribute("style", "display: inline-block; width: 85%; background-color: #5555a5;"
    );

    savedLocationBtn.setAttribute("value", locationsDisplay);
    savedLocationBtn.setAttribute("class", "location-btn");
    
    savedLocationBtn.addEventListener("click", function () {
      console.log(this);
      getLocationButton(this.value);
    });
  }
}

let getLocationButton = function (locationValue) {
      
    let locationInput = locationValue;
  
    let requestUrl =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      locationInput +
      "&appid=" +
      apiKey +
      "&units=imperial";
    fetch(requestUrl)
      .then(function (response) { 
        return response.json();
        })
      .then(function (data) {
        console.log(data);

        let todayDate = moment.unix(data.dt).format("MMMM Do, YYYY");
  
        let todayTemp = document.createElement("p");
        let todayWind = document.createElement("p");
        let todayHumidity = document.createElement("p");
        let todayUV = document.createElement("p");
  
        city.textContent = data.name;
        date.textContent = todayDate;
        todayTemp.textContent = "Current Temp: " + data.main.temp + " F";
        todayWind.textContent = "Wind: " + data.wind.speed + " mph";
        todayHumidity.textContent = "Humidity: " + data.main.humidity + " %";
  
        let weatherIcon = data.weather[0].icon;
        let weatherImage = document.createElement("img");
        weatherImage.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
        );

//clear out the div
        todayUL.innerHTML = "";

        date.append(weatherImage);
        todayUL.append(
          todayTemp,
          todayWind,
          todayHumidity,
          todayUV
        );       
    });   
    fiveDayForecast(locationValue);  
  };

//todays weather
let LocationWeather = function (event) {
  event.preventDefault();
  console.log(event);

  let locationInput = place.value;

//clears input
  place.value = "";
 
//reset the location 
  if (locationList.indexOf(locationInput) === -1) {
    locationList.push(locationInput);
    localStorage.setItem("locationData", JSON.stringify(locationList));
  }

  let requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    locationInput +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
        if (response.ok) {
        }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      
      let todayDate = moment.unix(data.dt).format("MMMM Do, YYYY");

      let todayTemp = document.createElement("p");
      let todayWind = document.createElement("p");
      let todayHumidity = document.createElement("p");
      let todayUV = document.createElement("p");

      todayTemp.textContent = "Current Temp: " + data.main.temp + " F";
      todayWind.textContent = "Wind: " + data.wind.speed + " mph";
      todayHumidity.textContent = "Humidity: " + data.main.humidity + " %";

      let weatherIcon = data.weather[0].icon;
      let weatherImage = document.createElement("img");
      weatherImage.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
      );

      city.textContent = data.name;
      date.textContent = todayDate;

      todayUL.innerHTML = "";

      todayUL.setAttribute("style", "border: 1px solid")

      date.append(weatherImage);
      todayUL.append(
        todayTemp,
        todayWind,
        todayHumidity,
        todayUV
      );
    });

  fiveDayForecast(locationInput);
};

let fiveDayForecast = function (locationInput) {

  var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=imperial`;
  fetch(currentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&appid=${apiKey}&units=imperial&cnt=5`;
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          let fiveDayForecastEl = document.getElementById("5day-card");

          let daily = data.daily;
          console.log(daily);

          fiveDayForecastEl.innerHTML = "";

//5 day forecast cards
          for (let i = 1; i < 6; i++) {
            let element = daily[i];

            let dailyCardEl = document.createElement("div");
            let dailyTitleDay = document.createElement("h3");
            let dailyCardBody = document.createElement("div");

            dailyCardEl.setAttribute("style", "border: white 0px solid;");

            let todayDate = moment.unix(element.dt).format("ddd");
            dailyTitleDay.textContent = todayDate;

            let weatherIcon = element.weather[0].icon;
            let weatherImage = document.createElement("img");
            console.log(weatherImage);
            weatherImage.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
            );

            let temp = document.createElement("p")
            let humid = document.createElement("p")
            let wind = document.createElement("p");
            let uvi = document.createElement("p");           

            temp.textContent = element.temp.day + "F";
            humid.textContent = element.humidity + "%";
            wind.textContent = element.wind_speed + "mph";
            uvi.textContent = element.uvi + "uv index";

            dailyCardBody.setAttribute("class", "future-p");
            dailyCardBody.setAttribute("style", "border: 1px black solid");
            dailyCardBody.append(temp, humid, wind, uvi);

            dailyTitleDay.append(weatherImage);
            dailyCardEl.append(dailyTitleDay, dailyCardBody);
            fiveDayForecastEl.append(dailyCardEl);
          }
        });
    });
};

//load local storage
renderLocations();

//search for city
searchBtn.addEventListener("click", LocationWeather);