//Change Date and time
function realHour(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let reloj = document.querySelector("h2");
let currentTime = new Date();
reloj.innerHTML = realHour(currentTime);

//Show City and Weather
function showWeather(response) {
  let h5 = document.querySelector("h5");
  let h3 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h5.innerHTML = `${temperature}°`;
  h3.innerHTML = `${response.data.name}`;
}

//Search Position
let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector(".search-input");
  console.log(currentCity.value);
  let city = document.querySelector(".search-input").value;
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
//Current Position
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);
