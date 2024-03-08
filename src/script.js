function refreshWeather(data) {
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = Math.round(data.temperature.current);
}
function adjustTextSize() {}
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
searchCity("LONDON");
