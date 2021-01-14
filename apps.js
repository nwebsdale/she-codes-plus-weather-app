function formatDate(timestamp) {
  let date = new Date(timestamp);

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = weekdays[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  return `${currentDay} ${currentDate} ${currentMonth} ${currentYear}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp);

  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let currentDay = weekdays[date.getDay()];
  return `${currentDay} | ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  return `${currentHour}:${currentMin}`;
}

//Format Sunrise

function formatSunrise(timestamp) {
  let date = new Date(timestamp);

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  return `${currentHour}:${currentMin}`;
}

//Format Sunset

function formatSunset(timestamp) {
  let date = new Date(timestamp);

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  return `${currentHour}:${currentMin}`;
}

// Search Feature

function search(city) {
  let apiKey = "9ecd0df390ed7ae45c465a580e328de1";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function HandleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

// Find Location
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

function showPositionWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9ecd0df390ed7ae45c465a580e328de1";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

// Display forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#next-week");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 40; index += 8) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="border-right col days">
            <p>${formatDay(forecast.dt * 1000)}</p>
            <div class="row next-week-variables">
              <div class="col-6">
              <img src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png"/>
                
              </div>
              <div class="col-6 next-week-text">
                <p>
                  <strong>${Math.round(forecast.main.temp_max)}°C</strong>
                </p>
                <p>${Math.round(forecast.main.temp_min)}°C</p>
              </div>
            </div>
          </div>`;
  }
}

// Display Current Weather
function displayWeather(response) {
  celsiusTemperatureMax = response.data.main.temp_max;
  celsiusTemperatureMin = response.data.main.temp_min;

  document.querySelector("#high-temp").innerHTML = `${Math.round(
    celsiusTemperatureMax
  )}°C`;

  document.querySelector("#low-temp").innerHTML = `${Math.round(
    celsiusTemperatureMin
  )}°C`;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed / 0.62
  )}mph`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].description;

  let cityName = response.data.name;
  let country = response.data.sys.country;
  document.querySelector("#location").innerHTML = `${cityName}, ${country}`;

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document.querySelector("#time").innerHTML = formatHours(
    response.data.dt * 1000
  );

  document.querySelector("#sun-up").innerHTML = formatSunrise(
    response.data.sys.sunrise * 1000
  );

  document.querySelector("#sun-down").innerHTML = formatSunset(
    response.data.sys.sunset * 1000
  );

  // Update main icon and background image

  // Cloud

  if (response.data.weather[0].icon === "04n") {
    overcastClouds();
  }

  if (response.data.weather[0].icon === "04d") {
    overcastClouds();
  }

  if (response.data.weather[0].icon === "02d") {
    lightClouds();
  }

  if (response.data.weather[0].icon === "02n") {
    lightClouds();
  }

  if (response.data.weather[0].icon === "03d") {
    lightClouds();
  }

  if (response.data.weather[0].icon === "03n") {
    lightClouds();
  }

  //   Clear sky

  if (response.data.weather[0].icon === "01d") {
    clearSky();
  }

  if (response.data.weather[0].icon === "01n") {
    clearNight();
  }

  // Thunderstorm

  if (response.data.weather[0].icon === "11d") {
    storm();
  }

  if (response.data.weather[0].icon === "11n") {
    storm();
  }

  // Drizzle

  if (response.data.weather[0].icon === "09d") {
    drizzle();
  }

  if (response.data.weather[0].icon === "09n") {
    drizzle();
  }

  // Rain

  if (response.data.weather[0].icon === "10d") {
    rain();
  }

  if (response.data.weather[0].icon === "10n") {
    rain();
  }

  if (response.data.weather[0].icon === "13d") {
    snow();
  }

  if (response.data.weather[0].icon === "13n") {
    snow();
  }

  if (response.data.weather[0].icon === "50n") {
    fog();
  }

  if (response.data.weather[0].icon === "50d") {
    fog();
  }
}

function overcastClouds() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-cloud", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-thick-cloud");
}

function lightClouds() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-cloud-sun", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-light-cloud");
}

function clearSky() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-sun", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-clear-day");
}

function clearNight() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-moon", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-clear-night");
}

function storm() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-bolt", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-bolt");
}

function drizzle() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-cloud-rain", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-drizzle");
}

function rain() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-cloud-showers-heavy", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-rain");
}

function snow() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-snowflake", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-snow");
}

function fog() {
  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");
  mainIcon.setAttribute("class", "");
  mainIcon.classList.add("fas", "fa-smog", "main-icon");
  background.setAttribute("class", "");
  background.classList.add("background-fog");
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTempMax = (celsiusTemperatureMax * 9) / 5 + 32;
  let fahrenheitTempMin = (celsiusTemperatureMin * 9) / 5 + 32;
  document.querySelector("#high-temp").innerHTML = `${Math.round(
    fahrenheitTempMax
  )}°F`;

  document.querySelector("#low-temp").innerHTML = `${Math.round(
    fahrenheitTempMin
  )}°F`;

  fahrenheitBtn.classList.add("active");
  celsiusBtn.classList.remove("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#high-temp").innerHTML = `${Math.round(
    celsiusTemperatureMax
  )}°C`;
  document.querySelector("#low-temp").innerHTML = `${Math.round(
    celsiusTemperatureMin
  )}°C`;

  celsiusBtn.classList.add("active");
  fahrenheitBtn.classList.remove("active");
}

//Celsius Fahrenheit button

let celsiusTemperatureMax = null;
let celsiusTemperatureMix = null;

let fahrenheitBtn = document.querySelector("#fahrenheit-button");
fahrenheitBtn.addEventListener("click", showFahrenheitTemp);

let celsiusBtn = document.querySelector("#celsius-button");
celsiusBtn.addEventListener("click", showCelsiusTemp);

// Find Location

let locationButton = document.querySelector("#location-finder");
locationButton.addEventListener("click", getCurrentPosition);

// Search Feature

let citySearch = document.querySelector("#enter-city-search");
citySearch.addEventListener("submit", HandleSearch);

search("London");
