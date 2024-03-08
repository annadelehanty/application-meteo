function formatDate(date) {
  let days = [
    `sunday`,
    `monday`,
    `tuesday`,
    `wednesday`,
    `thursday`,
    `friday`,
    `saturday`,
  ];
  let day = days[date.getDay()];
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
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
  let date = document.querySelector("#date");
  let dateData = new Date(data.time * 1000);
  date.innerHTML = formatDate(dateData);
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
let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);
searchCity("london");
setInterval(refreshWeather, 1000);
