var APIKey = "6d7c9acad2b9d5b7c790098d562f8fd2";
var search = [];
var input = document.querySelector('#input');

search.addEventListener('click', apiRequest);
atlanta.addEventListener('click', apiRequest);
austin.addEventListener('click', apiRequest);
chicago.addEventListener('click', apiRequest);
denver.addEventListener('click', apiRequest);
newYork.addEventListener('click', apiRequest);
orlando.addEventListener('click', apiRequest);
sanFrancisco.addEventListener('click', apiRequest);
seattle.addEventListener('click', apiRequest);

//or 272cb259234e49706c3aa35551daa022
//  direct geocoding Api
function location(location) {
  fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={APIKey}',
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderItems(cityString, data);
    })
    .catch(function (err) {
      console.error(err);
    })

}

// weather api api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={6d7c9acad2b9d5b7c790098d562f8fd2}
function weather(search) {
  fetch(`api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIkey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert('We have no data for this location')
      }
    }).catch(function (err) {
      console.error(err)
    });
}






function renderWeather(search) {
  if (search.indexOf(search) !== -1) {
    return;
  }
  search.push(search);
  localStorage.setItem('search', JSON.stringify(search));
  renderSearchWeather();
}

function getSearchWeather() {
  var search = JSON.parse(localStorage.getItem('search'));
  if (!search) {
    search = [];
  }
  renderSearchWeather();
}



