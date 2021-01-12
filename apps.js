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
    response.data.wind.speed
  )}mph`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].description;

  let cityName = response.data.name;
  let country = response.data.sys.country;
  document.querySelector("#location").innerHTML = `${cityName}, ${country}`;
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
