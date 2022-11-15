var APIKey = "6d7c9acad2b9d5b7c790098d562f8fd2"
//or 272cb259234e49706c3aa35551daa022

//  direct geocoding Api
fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={APIKey}', {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });








// weather api api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={6d7c9acad2b9d5b7c790098d562f8fd2}
fetch(`api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIkey}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

