function updateTime() {
  let currentTime = new Date();
  let days = [
    `sunday`,
    `monday`,
    `tuesday`,
    `wednesday`,
    `thursday`,
    `friday`,
    `saturday`,
  ];
  let dateTime = document.querySelector("#date");
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let date1 = currentTime.getDay() + 1;
  if (date1 > 6) {
    date1 = date1 - 7;
  }
  let date2 = currentTime.getDay() + 2;
  if (date2 > 6) {
    date2 = date2 - 7;
  }
  let date3 = currentTime.getDay() + 3;
  if (date3 > 6) {
    date3 = date3 - 7;
  }
  let date4 = currentTime.getDay() + 4;
  if (date4 > 6) {
    date4 = date4 - 7;
  }
  dateTime.innerHTML = `${days[currentTime.getDay()]} ${hours}:${minutes}`;
  let day1 = document.querySelector("#date1");
  day1.innerHTML = `${days[date1]}`;
  let day2 = document.querySelector("#date2");
  day2.innerHTML = `${days[date2]}`;
  let day3 = document.querySelector("#date3");
  day3.innerHTML = `${days[date3]}`;
  let day4 = document.querySelector("#date4");
  day4.innerHTML = `${days[date4]}`;
}
function refreshWeather(data) {
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = Math.round(data.temperature.current);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = data.temperature.humidity;
  let condition = document.querySelector("#condition");
  condition.innerHTML = data.condition.description;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = data.wind.speed;
  const image = document.getElementById("current-icon");
  image.setAttribute("src", data.condition.icon_url);
  getForecast(data.city);
}
function searchCity(cityInput) {
  let apiKey = "4288f539432426do920341baabbb0tad";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(function (response) {
    refreshWeather(response.data);
  });
}
function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let location = document.querySelector("#location");
  location.innerHTML = cityInput.toUpperCase();
  searchCity(cityInput);
  const container = document.getElementById("location");
  const containerWidth = container.offsetWidth;
  container.style.fontSize =
    containerWidth / container.textContent.length + "px";
}
function getForecast(cityInput) {
  let apiKey = "4288f539432426do920341baabbb0tad";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput}&key=${apiKey}`;
  axios(apiURL).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<li>
              <img src=${day.condition.icon_url} /><br />
              <span id="date1">${day}</span> <br />
              <span class="high">${Math.round(
                day.temperature.maximum
              )}°C</span> - <span class="low">${Math.round(
          day.temperature.minimum
        )}°C</span>
            </li>
          `;
    }
  });
  forecast.innerHTML = forecastHTML;
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);
searchCity("london");
updateTime();
setInterval(updateTime, 30000);
