// Display Current Date/Time
function formatDate(date) {
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

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  let currentDay = weekdays[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  return `${currentHour}:${currentMin} | ${currentDay} ${currentDate} ${currentMonth} ${currentYear}`;
}

// Search Feature

function search(city) {
  let apiKey = "9ecd0df390ed7ae45c465a580e328de1";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
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
}
// Display Current Weather
function displayWeather(response) {
  console.log(response.data);

  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );

  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

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

  // Update main icon and background image

  let mainIcon = document.querySelector("#main-icon");
  let background = document.querySelector("#background");

  // Cloud

  if (response.data.weather[0].icon === "02d" || "02n" || "03d" || "03n") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-cloud-sun", "main-icon-cloud");
  }

  if (response.data.weather[0].icon === "04d" || "04n") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-cloud", "main-icon-cloud");
  }

  // Sun

  if (response.data.weather[0].icon === "01d") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-sun", "main-icon-dry");
    background.setAttribute("class", "");
    background.classList.add("background-clear-day");
  }

  if (response.data.weather[0].icon === "01n") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-moon", "main-icon-cloud");
    background.setAttribute("class", "");
    background.classList.add("background-clear-night");
  }

  // Thunderstorm

  if (response.data.weather[0].icon === "11d") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-bolt", "main-icon-wet");
    background.setAttribute("class", "");
    background.classList.add("background-bolt");
  }

  // Drizzle

  if (response.data.weather[0].icon === "09d") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-cloud-rain", "main-icon-wet");
    background.setAttribute("class", "");
    background.classList.add("background-drizzle");
  }

  // Rain

  if (response.data.weather[0].icon === "10d") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-cloud-showers-heavy", "main-icon-wet");
    background.setAttribute("class", "");
    background.classList.add("background-rain");
  }

  // Snow

  if (response.data.weather[0].icon === "13n") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-snowflake", "main-icon-cloud");
    background.setAttribute("class", "");
    background.classList.add("background-snow");
  }

  // Fog

  if (response.data.weather[0].icon === "50d") {
    mainIcon.setAttribute("class", "");
    mainIcon.classList.add("fas", "fa-smog", "main-icon-cloud");
    background.setAttribute("class", "");
    background.classList.add("background-fog");
  }
}

// Display Current Date/Time
let currentTimeDate = new Date();

let changeDateTime = document.querySelector("#date-time");
changeDateTime.innerHTML = formatDate(currentTimeDate);

// Search Feature

let citySearch = document.querySelector("#enter-city-search");
citySearch.addEventListener("submit", HandleSearch);

search("London");

// Find Location

let locationButton = document.querySelector("#location-finder");
locationButton.addEventListener("click", getCurrentPosition);
