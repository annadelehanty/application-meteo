function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let location = document.querySelector("#location");
  cityInput = cityInput.value.toUpperCase();
  location.innerHTML = cityInput;
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);
